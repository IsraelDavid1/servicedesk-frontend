interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'large';
  color?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'var(--color-primary, #2563eb)',
}: LoadingSpinnerProps) {
  const sizes = { sm: 18, md: 32, large: 56 };
  const px = sizes[size];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Carregando"
      role="status"
      style={{ animation: 'spin 0.8s linear infinite', display: 'block' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="80 40"
      />
    </svg>
  );
}
