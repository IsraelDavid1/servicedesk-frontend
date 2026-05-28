import { CallState, CALL_STATE_LABELS } from '@types/enums';

interface CallStatusBadgeProps {
  status: CallState;
  size?: 'sm' | 'md';
}

const statusStyles: Record<CallState, React.CSSProperties> = {
  [CallState.INCOMPLETE]: {
    backgroundColor: 'rgba(234, 179, 8, 0.15)',
    color: '#eab308',
    border: '1px solid rgba(234, 179, 8, 0.3)',
  },
  [CallState.COMPLETE]: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    color: '#22c55e',
    border: '1px solid rgba(34, 197, 94, 0.3)',
  },
};

const statusIcons: Record<CallState, string> = {
  [CallState.INCOMPLETE]: '⏳',
  [CallState.COMPLETE]: '✅',
};

export function CallStatusBadge({ status, size = 'md' }: CallStatusBadgeProps) {
  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    borderRadius: '999px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    padding: size === 'sm' ? '2px 8px' : '4px 12px',
    fontSize: size === 'sm' ? '11px' : '13px',
    ...statusStyles[status],
  };

  return (
    <span style={style}>
      {statusIcons[status]} {CALL_STATE_LABELS[status]}
    </span>
  );
}
