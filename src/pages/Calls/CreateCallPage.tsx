import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCall } from '@hooks/useCalls';
import { useAuth } from '@hooks/useAuth';
import { Assets, AssetsType, UserRole } from '@models/enums';
import { ASSETS_LABELS, ASSETS_TYPE_LABELS, ASSETS_TYPE_BY_ASSET, ROUTES } from '@utils/constants';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';

const selectStyle: React.CSSProperties = {
  width: '100%', background: '#0f172a', border: '1px solid #334155',
  borderRadius: '8px', color: '#f1f5f9', padding: '10px 14px',
  fontFamily: 'inherit', fontSize: '15px', outline: 'none', cursor: 'pointer',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '6px',
};

export default function CreateCallPage() {
  const navigate = useNavigate();
  const createCall = useCreateCall();
  const { user, hasRole } = useAuth();

  const isTechOrAdmin = hasRole([UserRole.TECH, UserRole.ADMIN]);

  const [form, setForm] = useState({
    // Se for USER comum, pré-preenche com o próprio login dele.
    // Isso porque o campo é obrigatório no backend mas o USER não
    // conhece logins de técnicos. O admin pode reatribuir depois.
    techLogin: isTechOrAdmin ? '' : (user?.login ?? ''),
    asset: '' as Assets | '',
    assetsType: '' as AssetsType | '',
    department: user?.department ?? '',
    firstAnalysis: '',
    beginDate: new Date().toISOString().slice(0, 10),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableTypes = form.asset ? ASSETS_TYPE_BY_ASSET[form.asset as Assets] : [];

  const validate = () => {
    const e: Record<string, string> = {};
    if (isTechOrAdmin && !form.techLogin.trim()) e['techLogin'] = 'Informe o login do técnico';
    if (!form.asset) e['asset'] = 'Selecione um ativo';
    if (!form.assetsType) e['assetsType'] = 'Selecione o tipo';
    if (!form.department.trim()) e['department'] = 'Informe o departamento';
    if (form.firstAnalysis.trim().length < 10) e['firstAnalysis'] = 'Análise deve ter pelo menos 10 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createCall.mutateAsync({
      techLogin: form.techLogin,
      asset: form.asset as Assets,
      assetsType: form.assetsType as AssetsType,
      department: form.department,
      firstAnalysis: form.firstAnalysis,
      beginDate: new Date(form.beginDate),
    });
    navigate(ROUTES.CALLS);
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: '#1e293b', border: '1px solid #334155',
    borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px',
  };

  return (
    <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <button
          onClick={() => navigate(ROUTES.CALLS)}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', marginBottom: '8px', padding: 0 }}
        >
          ← Voltar
        </button>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
          Abrir Chamado
        </h1>
        {!isTechOrAdmin && (
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}>
            Preencha os dados do problema. Um técnico será atribuído ao seu chamado.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>
        <div style={sectionStyle}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#94a3b8' }}>
            Dados do chamado
          </h2>

          {/* Campo de técnico — só exibe para TECH/ADMIN */}
          {isTechOrAdmin && (
            <Input
              label="Login do técnico responsável"
              name="techLogin"
              value={form.techLogin}
              onChange={e => setForm(p => ({ ...p, techLogin: e.target.value }))}
              error={errors['techLogin']}
              placeholder="ex: joao.silva"
              required
            />
          )}

          {/* Departamento — pré-preenchido com o departamento do usuário */}
          <Input
            label="Departamento"
            name="department"
            value={form.department}
            onChange={e => setForm(p => ({ ...p, department: e.target.value }))}
            error={errors['department']}
            placeholder="ex: TI, Financeiro, RH"
            required
          />

          <Input
            label="Data de abertura"
            name="beginDate"
            type="date"
            value={form.beginDate}
            onChange={e => setForm(p => ({ ...p, beginDate: e.target.value }))}
            required
          />

          {/* Ativo */}
          <div>
            <label style={labelStyle}>Ativo *</label>
            <select
              style={selectStyle}
              value={form.asset}
              onChange={e => setForm(p => ({ ...p, asset: e.target.value as Assets, assetsType: '' }))}
            >
              <option value="">Selecione o tipo de ativo...</option>
              {Object.values(Assets).map(a => (
                <option key={a} value={a}>{ASSETS_LABELS[a]}</option>
              ))}
            </select>
            {errors['asset'] && (
              <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors['asset']}</span>
            )}
          </div>

          {/* Tipo de ativo — depende do ativo selecionado */}
          <div>
            <label style={labelStyle}>Tipo de ativo *</label>
            <select
              style={{ ...selectStyle, opacity: !form.asset ? 0.5 : 1 }}
              value={form.assetsType}
              disabled={!form.asset}
              onChange={e => setForm(p => ({ ...p, assetsType: e.target.value as AssetsType }))}
            >
              <option value="">
                {form.asset ? 'Selecione o tipo...' : 'Selecione um ativo primeiro'}
              </option>
              {availableTypes.map(t => (
                <option key={t} value={t}>{ASSETS_TYPE_LABELS[t]}</option>
              ))}
            </select>
            {errors['assetsType'] && (
              <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors['assetsType']}</span>
            )}
          </div>

          {/* Análise */}
          <div>
            <label style={labelStyle}>Descrição do problema *</label>
            <textarea
              value={form.firstAnalysis}
              onChange={e => setForm(p => ({ ...p, firstAnalysis: e.target.value }))}
              placeholder="Descreva detalhadamente o problema que está ocorrendo..."
              rows={5}
              style={{ ...selectStyle, resize: 'vertical', lineHeight: 1.5 }}
            />
            {errors['firstAnalysis'] && (
              <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors['firstAnalysis']}</span>
            )}
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              {form.firstAnalysis.length} caracteres (mínimo 10)
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="md" type="button" onClick={() => navigate(ROUTES.CALLS)}>
            Cancelar
          </Button>
          <Button variant="primary" size="md" type="submit" loading={createCall.isPending}>
            Abrir chamado
          </Button>
        </div>
      </form>
    </div>
  );
}
