import { useAuth } from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@utils/constants';
import { UserRole, USER_ROLE_LABELS } from '@types/enums';

const roleBadgeStyle: Record<UserRole, React.CSSProperties> = {
  [UserRole.ADMIN]: { backgroundColor: 'rgba(168,85,247,0.15)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)' },
  [UserRole.TECH]: { backgroundColor: 'rgba(37,99,235,0.15)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.3)' },
  [UserRole.USER]: { backgroundColor: 'rgba(100,116,139,0.15)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.3)' },
};

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      style={{
        height: '60px',
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate(ROUTES.DASHBOARD)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <span style={{ fontSize: '20px' }}>🖥️</span>
        <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.3px' }}>
          Service Desk
        </span>
      </button>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {[
          { label: 'Dashboard', route: ROUTES.DASHBOARD },
          { label: 'Chamados', route: ROUTES.CALLS },
        ].map(({ label, route }) => (
          <button
            key={route}
            onClick={() => navigate(route)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#f1f5f9';
              (e.currentTarget as HTMLButtonElement).style.background = '#1e293b';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
              (e.currentTarget as HTMLButtonElement).style.background = 'none';
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* User info + logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user && (
          <>
            <button
              onClick={() => navigate(ROUTES.PROFILE)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
            >
              <span style={{ color: '#f1f5f9', fontSize: '14px', fontWeight: 600 }}>{user.login}</span>
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '999px',
                padding: '1px 8px',
                ...roleBadgeStyle[user.role],
              }}>
                {USER_ROLE_LABELS[user.role]}
              </span>
            </button>
            <button
              onClick={() => logout()}
              style={{
                background: 'none',
                border: '1px solid #334155',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
