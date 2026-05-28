import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', fontWeight: 700, color: '#334155' }}>404</div>
      <p style={{ color: '#94a3b8', fontSize: '16px' }}>Página não encontrada.</p>
      <button onClick={() => navigate('/')}
        style={{ padding: '10px 24px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
        Voltar ao início
      </button>
    </div>
  );
}
