import { useAuth } from '@hooks/useAuth';
import { useMyCalls, useAllCalls } from '@hooks/useCalls';
import { UserRole, CallState } from '@models/enums';
import { CallCard } from '@components/calls/CallCard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@utils/constants';
import LoadingSpinner from '@components/ui/LoadingSpinner';

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '10px',
      padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </span>
      <span style={{ fontSize: '36px', fontWeight: 700, color }}>{value}</span>
    </div>
  );
}

export default function DashboardPage() {
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  const isTechOrAdmin = hasRole([UserRole.TECH, UserRole.ADMIN]);

  const { data: allCalls = [], isLoading: loadingAll } = useAllCalls();
  const { data: myCalls = [], isLoading: loadingMy } = useMyCalls();

  const calls = isTechOrAdmin ? allCalls : myCalls;
  const isLoading = isTechOrAdmin ? loadingAll : loadingMy;

  const open = calls.filter(c => c.callState === CallState.INCOMPLETE).length;
  const closed = calls.filter(c => c.callState === CallState.COMPLETE).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
            Olá, {user?.login} 👋
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
          <button
            onClick={() => navigate(ROUTES.CALL_NEW)}
            style={{
              padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff',
              border: 'none', borderRadius: '8px', fontWeight: 600,
              fontSize: '14px', cursor: 'pointer',
            }}
          >
            + Novo Chamado
          </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
        <StatCard label="Total" value={calls.length} color="#f1f5f9" />
        <StatCard label="Em aberto" value={open} color="#eab308" />
        <StatCard label="Finalizados" value={closed} color="#22c55e" />
      </div>

      {/* Chamados recentes */}
      <div>
        <h2 style={{ fontSize: '17px', fontWeight: 600, color: '#f1f5f9', marginBottom: '16px' }}>
          {isTechOrAdmin ? 'Chamados recentes' : 'Meus chamados'}
        </h2>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <LoadingSpinner />
          </div>
        ) : calls.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
            <p>Nenhum chamado encontrado.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {calls.slice(0, 6).map(call => (
              <CallCard key={call.id} call={call} showActions={false} />
            ))}
          </div>
        )}

        {calls.length > 6 && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={() => navigate(ROUTES.CALLS)}
              style={{
                padding: '10px 24px', background: 'none', border: '1px solid #334155',
                color: '#94a3b8', borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
              }}
            >
              Ver todos os chamados ({calls.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
