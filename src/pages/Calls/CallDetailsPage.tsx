import { useParams, useNavigate } from 'react-router-dom';
import { useCallById, useDeleteCall, useFinishCall } from '@hooks/useCalls';
import { useAuth } from '@hooks/useAuth';
import { UserRole, CALL_STATE_LABELS } from '@models/enums';
import { ASSETS_LABELS, ASSETS_TYPE_LABELS, ROUTES } from '@utils/constants';
import { formatDateDisplay, formatDuration } from '@utils/formatters';
import { CallStatusBadge } from '@components/calls/CallStatusBadge';
import { Button } from '@components/ui/Button';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import Modal from '@components/ui/Modal';
import { useState } from 'react';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '15px', color: '#cbd5e1' }}>{value}</div>
    </div>
  );
}

export default function CallDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const isTechOrAdmin = hasRole([UserRole.TECH, UserRole.ADMIN]);

  const { data: call, isLoading, error } = useCallById(id);
  const deleteCall = useDeleteCall();
  const finishCall = useFinishCall();

  const [showDelete, setShowDelete] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [solution, setSolution] = useState('');

  if (isLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
      <LoadingSpinner size="large" />
    </div>
  );

  if (error || !call) return (
    <div style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
      <p>Chamado não encontrado.</p>
      <button onClick={() => navigate(ROUTES.CALLS)} style={{ marginTop: '16px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer' }}>
        ← Voltar para chamados
      </button>
    </div>
  );

  const sectionStyle: React.CSSProperties = {
    backgroundColor: '#1e293b', border: '1px solid #334155',
    borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      {/* Back + Header */}
      <div>
        <button
          onClick={() => navigate(ROUTES.CALLS)}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', marginBottom: '12px', padding: 0 }}
        >
          ← Voltar
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
              Chamado #{call.id.slice(0, 8).toUpperCase()}
            </h1>
            <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '13px' }}>{call.department}</p>
          </div>
          <CallStatusBadge status={call.callState} />
        </div>
      </div>

      {/* Info grid */}
      <div style={sectionStyle}>
        <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#94a3b8' }}>Informações</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          <Field label="Ativo" value={ASSETS_LABELS[call.asset]} />
          <Field label="Tipo de ativo" value={ASSETS_TYPE_LABELS[call.assetsType]} />
          <Field label="Departamento" value={call.department} />
          <Field label="Status" value={CALL_STATE_LABELS[call.callState]} />
          <Field label="Data de abertura" value={formatDateDisplay(call.beginDate)} />
          <Field label="Data de encerramento" value={call.endDate ? formatDateDisplay(call.endDate) : '—'} />
          <Field label="Duração" value={formatDuration(call.beginDate, call.endDate)} />
        </div>
      </div>

      {/* Analysis */}
      <div style={sectionStyle}>
        <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#94a3b8' }}>Análise inicial</h2>
        <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{call.firstAnalysis}</p>
      </div>

      {/* Solution */}
      {call.solution && (
        <div style={{ ...sectionStyle, borderColor: 'rgba(34,197,94,0.3)', backgroundColor: 'rgba(34,197,94,0.05)' }}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#22c55e' }}>✅ Solução aplicada</h2>
          <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{call.solution}</p>
        </div>
      )}

      {/* Actions */}
      {isTechOrAdmin && (
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          {call.callState === 'INCOMPLETE' && (
            <Button variant="primary" size="sm" onClick={() => setShowFinish(true)}>
              Finalizar chamado
            </Button>
          )}
          <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
            Excluir chamado
          </Button>
        </div>
      )}

      {/* Modal excluir */}
      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Excluir chamado"
        footer={<>
          <Button variant="secondary" size="sm" onClick={() => setShowDelete(false)}>Cancelar</Button>
          <Button variant="danger" size="sm" loading={deleteCall.isPending}
            onClick={async () => { await deleteCall.mutateAsync(call.id); navigate(ROUTES.CALLS); }}>
            Excluir
          </Button>
        </>}
      >
        <p style={{ color: '#94a3b8' }}>Tem certeza? Esta ação não pode ser desfeita.</p>
      </Modal>

      {/* Modal finalizar */}
      <Modal isOpen={showFinish} onClose={() => { setShowFinish(false); setSolution(''); }} title="Finalizar chamado"
        footer={<>
          <Button variant="secondary" size="sm" onClick={() => { setShowFinish(false); setSolution(''); }}>Cancelar</Button>
          <Button variant="primary" size="sm" disabled={solution.trim().length < 5} loading={finishCall.isPending}
            onClick={async () => {
              await finishCall.mutateAsync({ callId: call.id, finishData: { solution, endDate: new Date() } });
              setShowFinish(false);
              setSolution('');
            }}>
            Confirmar
          </Button>
        </>}
      >
        <textarea value={solution} onChange={e => setSolution(e.target.value)}
          placeholder="Descreva a solução aplicada..." rows={4}
          style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', padding: '12px', fontFamily: 'inherit', fontSize: '14px', resize: 'vertical', outline: 'none' }}
        />
      </Modal>
    </div>
  );
}
