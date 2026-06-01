import {
  forwardRef,
  InputHTMLAttributes,
  useState,
  useCallback
} from 'react';
import { useId } from 'react';

export type InputType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'search' 
  | 'date'
  | 'datetime-local';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string | undefined;
  hint?: string;
  type?: InputType;
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      type = 'text',
      size = 'md',
      iconLeft,
      iconRight,
      onClear,
      className = '',
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== '';

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
      },
      [onChange]
    );

    const handleClear = useCallback(() => {
      onClear?.();
    }, [onClear]);

    const generateId = useId();
    const inputId = props.id || generateId;

    return (
      <div className={`input-wrapper input-wrapper--${size} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {props.required && <span className="input-label__required">*</span>}
          </label>
        )}
        
        <div className={`input-container ${isFocused ? 'input-container--focused' : ''} ${error ? 'input-container--error' : ''}`}>
          {iconLeft && <span className="input-icon input-icon--left">{iconLeft}</span>}
          
          <input
            ref={ref}
            id={inputId}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="input-field"
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          
          {hasValue && onClear && (
            <button 
              type="button" 
              onClick={handleClear}
              className="input-clear"
              aria-label="Limpar campo"
            >
              ×
            </button>
          )}
          
          {iconRight && !onClear && (
            <span className="input-icon input-icon--right">{iconRight}</span>
          )}
        </div>
        
        {error && (
          <span id={`${inputId}-error`} className="input-error" role="alert">
            {error}
          </span>
        )}
        
        {hint && !error && (
          <span id={`${inputId}-hint`} className="input-hint">
            {hint}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
