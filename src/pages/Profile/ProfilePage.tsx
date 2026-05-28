import { useAuth } from '@hooks/useAuth';
import { USER_ROLE_LABELS } from '@types/enums';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#1e293b', border: '1px solid #334155',
    borderRadius: '10px', padding: '24px',
  };
  const labelStyle: React.CSSProperties = { fontSize: '12px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' };
  const valueStyle: React.CSSProperties = { fontSize: '16px', color: '#f1f5f9', marginTop: '4px' };

  return (
    <div style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Meu perfil</h1>

      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', backgroundColor: '#2563eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {user.login.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>{user.login}</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{USER_ROLE_LABELS[user.role]}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Login', value: user.login },
            { label: 'Departamento', value: user.department },
            { label: 'Função', value: USER_ROLE_LABELS[user.role] },
            { label: 'ID', value: user.id },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={labelStyle}>{label}</div>
              <div style={valueStyle}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => logout()}
        style={{
          padding: '12px', borderRadius: '8px', border: '1px solid #ef4444',
          backgroundColor: 'transparent', color: '#ef4444', cursor: 'pointer',
          fontSize: '15px', fontWeight: 600, width: '100%',
        }}>
        Sair da conta
      </button>
    </div>
  );
}
