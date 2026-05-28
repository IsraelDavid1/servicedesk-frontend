import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllCalls, useMyCalls, useDeleteCall, useFinishCall } from '@hooks/useCalls';
import { useAuth } from '@hooks/useAuth';
import { UserRole, CallState } from '@types/enums';
import { CallCard } from '@components/calls/CallCard';
import { ROUTES } from '@utils/constants';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import Modal from '@components/ui/Modal';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

export default function CallsListPage() {
  const { hasRole } = useAuth();
  const navigate = useNavigate();
  const isTechOrAdmin = hasRole([UserRole.TECH, UserRole.ADMIN]);

  const { data: allCalls = [], isLoading: loadingAll } = useAllCalls();
  const { data: myCalls = [], isLoading: loadingMy } = useMyCalls();
  const deleteCall = useDeleteCall();
  const finishCall = useFinishCall();

  const calls = isTechOrAdmin ? allCalls : myCalls;
  const isLoading = isTechOrAdmin ? loadingAll : loadingMy;

  const [filter, setFilter] = useState<'ALL' | CallState>('ALL');
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [finishTarget, setFinishTarget] = useState<string | null>(null);
  const [solution, setSolution] = useState('');

  const filtered = calls.filter(c => {
    const matchStatus = filter === 'ALL' || c.callState === filter;
    const matchSearch = search === '' ||
      c.department.toLowerCase().includes(search.toLowerCase()) ||
      c.firstAnalysis.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
    fontWeight: 600, fontSize: '14px', transition: 'all 0.15s',
    backgroundColor: active ? '#2563eb' : 'transparent',
    color: active ? '#fff' : '#64748b',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
          {isTechOrAdmin ? 'Todos os chamados' : 'Meus chamados'}
        </h1>
        {isTechOrAdmin && (
          <Button variant="primary" size="sm" onClick={() => navigate(ROUTES.CALL_NEW)}>
            + Novo Chamado
          </Button>
        )}
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#1e293b', borderRadius: '10px', padding: '4px' }}>
          {(['ALL', CallState.INCOMPLETE, CallState.COMPLETE] as const).map(s => (
            <button key={s} style={tabStyle(filter === s)} onClick={() => setFilter(s)}>
              {s === 'ALL' ? 'Todos' : s === CallState.INCOMPLETE ? 'Em aberto' : 'Finalizados'}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: '200px', maxWidth: '360px' }}>
          <Input
            placeholder="Buscar por departamento ou análise..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            size="sm"
          />
        </div>
        <span style={{ color: '#64748b', fontSize: '13px', whiteSpace: 'nowrap' }}>
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Lista */}
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
          <LoadingSpinner />
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          <div style={{ fontSize: '44px', marginBottom: '12px' }}>🔍</div>
          <p>Nenhum chamado encontrado para os filtros aplicados.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {filtered.map(call => (
            <CallCard
              key={call.id}
              call={call}
              onDelete={isTechOrAdmin ? id => setDeleteTarget(id) : undefined}
              onFinish={isTechOrAdmin ? id => setFinishTarget(id) : undefined}
            />
          ))}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Excluir chamado"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
            <Button
              variant="danger" size="sm"
              loading={deleteCall.isPending}
              onClick={async () => {
                if (deleteTarget) {
                  await deleteCall.mutateAsync(deleteTarget);
                  setDeleteTarget(null);
                }
              }}
            >
              Excluir
            </Button>
          </>
        }
      >
        <p style={{ color: '#94a3b8', fontSize: '15px' }}>
          Tem certeza que deseja excluir este chamado? Esta ação não pode ser desfeita.
        </p>
      </Modal>

      {/* Modal de finalização */}
      <Modal
        isOpen={!!finishTarget}
        onClose={() => { setFinishTarget(null); setSolution(''); }}
        title="Finalizar chamado"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => { setFinishTarget(null); setSolution(''); }}>
              Cancelar
            </Button>
            <Button
              variant="primary" size="sm"
              loading={finishCall.isPending}
              disabled={solution.trim().length < 5}
              onClick={async () => {
                if (finishTarget) {
                  await finishCall.mutateAsync({
                    callId: finishTarget,
                    finishData: { solution, endDate: new Date() },
                  });
                  setFinishTarget(null);
                  setSolution('');
                }
              }}
            >
              Finalizar
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Descreva a solução aplicada:</p>
          <textarea
            value={solution}
            onChange={e => setSolution(e.target.value)}
            placeholder="Descreva o que foi feito para resolver o chamado..."
            rows={4}
            style={{
              width: '100%', background: '#0f172a', border: '1px solid #334155',
              borderRadius: '8px', color: '#f1f5f9', padding: '12px',
              fontFamily: 'inherit', fontSize: '14px', resize: 'vertical', outline: 'none',
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
