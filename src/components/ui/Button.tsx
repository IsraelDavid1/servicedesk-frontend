import { 
  ButtonHTMLAttributes, 
  forwardRef, 
  ReactNode 
} from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      fullWidth = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'button';
    const variantClasses = `button--${variant}`;
    const sizeClasses = `button--${size}`;
    const stateClasses = [
      disabled && 'button--disabled',
      loading && 'button--loading',
      fullWidth && 'button--full'
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="button__spinner" aria-hidden="true" />
        ) : icon ? (
          <span className="button__icon" aria-hidden="true">{icon}</span>
        ) : null}
        <span className="button__label">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
