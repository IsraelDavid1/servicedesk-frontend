import { CallResponseDTO } from '@types/call';
import { ASSETS_LABELS, ASSETS_TYPE_LABELS } from '@utils/constants';
import { formatDateOnly, formatDuration } from '@utils/formatters';
import { CallStatusBadge } from './CallStatusBadge';
import { ROUTES } from '@utils/constants';
import { useNavigate } from 'react-router-dom';

interface CallCardProps {
  call: CallResponseDTO;
  onDelete?: (id: string) => void;
  onFinish?: (id: string) => void;
  showActions?: boolean;
}

export function CallCard({ call, onDelete, onFinish, showActions = true }: CallCardProps) {
  const navigate = useNavigate();

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '10px',
    padding: '16px 20px',
    cursor: 'pointer',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '8px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: 600,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#cbd5e1',
    marginTop: '2px',
  };

  const chipStyle: React.CSSProperties = {
    display: 'inline-block',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    padding: '2px 10px',
    fontSize: '13px',
    color: '#94a3b8',
  };

  return (
    <div
      style={cardStyle}
      onClick={() => navigate(ROUTES.CALL_DETAILS(call.id))}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#2563eb';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 1px #2563eb20';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#334155';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Header row */}
      <div style={rowStyle}>
        <div>
          <div style={labelStyle}>Chamado</div>
          <div style={{ ...valueStyle, fontFamily: 'monospace', fontSize: '12px', color: '#94a3b8' }}>
            #{call.id.slice(0, 8).toUpperCase()}
          </div>
        </div>
        <CallStatusBadge status={call.callState} />
      </div>

      {/* Asset info */}
      <div style={rowStyle}>
        <div>
          <div style={labelStyle}>Ativo</div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
            <span style={chipStyle}>{ASSETS_LABELS[call.asset]}</span>
            <span style={chipStyle}>{ASSETS_TYPE_LABELS[call.assetsType]}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={labelStyle}>Departamento</div>
          <div style={valueStyle}>{call.department}</div>
        </div>
      </div>

      {/* Analysis */}
      <div>
        <div style={labelStyle}>Análise inicial</div>
        <div
          style={{ ...valueStyle, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}
        >
          {call.firstAnalysis}
        </div>
      </div>

      {/* Dates row */}
      <div style={{ ...rowStyle, borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
        <div>
          <div style={labelStyle}>Abertura</div>
          <div style={valueStyle}>{formatDateOnly(call.beginDate)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={labelStyle}>Duração</div>
          <div style={valueStyle}>{formatDuration(call.beginDate, call.endDate)}</div>
        </div>
      </div>

      {/* Actions */}
      {showActions && (onFinish ?? onDelete) && (
        <div
          style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}
          onClick={e => e.stopPropagation()}
        >
          {onFinish && call.callState === 'INCOMPLETE' && (
            <button
              onClick={() => onFinish(call.id)}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#2563eb',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Finalizar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(call.id)}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                borderRadius: '6px',
                border: '1px solid #ef4444',
                backgroundColor: 'transparent',
                color: '#ef4444',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  );
}
