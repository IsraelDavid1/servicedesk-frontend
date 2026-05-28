import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Espaçamento interno — padrão 'md' */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Variante visual */
  variant?: 'default' | 'outlined' | 'elevated';
  /** Título opcional exibido no topo do card */
  title?: string;
  /** Ações no canto superior direito (ex: botão) */
  actions?: ReactNode;
}

const paddingMap = {
  none: '0',
  sm: '12px',
  md: '20px',
  lg: '32px',
};

export default function Card({
  children,
  padding = 'md',
  variant = 'default',
  title,
  actions,
  style,
  ...props
}: CardProps) {
  const baseStyle: React.CSSProperties = {
    borderRadius: '10px',
    backgroundColor: 'var(--card-bg, #1e293b)',
    padding: paddingMap[padding],
    border: variant === 'outlined' ? '1px solid var(--border-color, #334155)' : 'none',
    boxShadow:
      variant === 'elevated'
        ? '0 4px 24px rgba(0,0,0,0.3)'
        : variant === 'default'
        ? '0 1px 4px rgba(0,0,0,0.2)'
        : 'none',
    ...style,
  };

  return (
    <div style={baseStyle} {...props}>
      {(title || actions) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: title ? '16px' : 0,
          }}
        >
          {title && (
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary, #f1f5f9)' }}>
              {title}
            </h3>
          )}
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
