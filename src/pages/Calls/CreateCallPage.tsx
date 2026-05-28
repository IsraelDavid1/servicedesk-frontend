import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCall } from '@hooks/useCalls';
import { Assets, AssetsType } from '@types/enums';
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

  const [form, setForm] = useState({
    techLogin: '',
    asset: '' as Assets | '',
    assetType: '' as AssetsType | '',
    department: '',
    firstAnalysis: '',
    beginDate: new Date().toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableTypes = form.asset ? ASSETS_TYPE_BY_ASSET[form.asset as Assets] : [];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.techLogin.trim()) e.techLogin = 'Informe o login do técnico';
    if (!form.asset) e.asset = 'Selecione um ativo';
    if (!form.assetType) e.assetType = 'Selecione o tipo';
    if (!form.department.trim()) e.department = 'Informe o departamento';
    if (form.firstAnalysis.trim().length < 10) e.firstAnalysis = 'Análise deve ter pelo menos 10 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createCall.mutateAsync({
      techLogin: form.techLogin,
      asset: form.asset as Assets,
      assetType: form.assetType as AssetsType,
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
        <button onClick={() => navigate(ROUTES.CALLS)}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', marginBottom: '8px', padding: 0 }}>
          ← Voltar
        </button>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Novo Chamado</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} noValidate>
        <div style={sectionStyle}>
          <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: '#94a3b8' }}>Dados do chamado</h2>

          <Input label="Login do técnico responsável" name="techLogin" value={form.techLogin}
            onChange={e => setForm(p => ({ ...p, techLogin: e.target.value }))}
            error={errors.techLogin} placeholder="ex: joao.silva" required />

          <Input label="Departamento" name="department" value={form.department}
            onChange={e => setForm(p => ({ ...p, department: e.target.value }))}
            error={errors.department} placeholder="ex: TI, Financeiro" required />

          <Input label="Data de abertura" name="beginDate" type="date" value={form.beginDate}
            onChange={e => setForm(p => ({ ...p, beginDate: e.target.value }))} required />

          <div>
            <label style={labelStyle}>Ativo *</label>
            <select style={selectStyle} value={form.asset}
              onChange={e => setForm(p => ({ ...p, asset: e.target.value as Assets, assetType: '' }))}>
              <option value="">Selecione...</option>
              {Object.values(Assets).map(a => <option key={a} value={a}>{ASSETS_LABELS[a]}</option>)}
            </select>
            {errors.asset && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.asset}</span>}
          </div>

          <div>
            <label style={labelStyle}>Tipo de ativo *</label>
            <select style={selectStyle} value={form.assetType} disabled={!form.asset}
              onChange={e => setForm(p => ({ ...p, assetType: e.target.value as AssetsType }))}>
              <option value="">Selecione...</option>
              {availableTypes.map(t => <option key={t} value={t}>{ASSETS_TYPE_LABELS[t]}</option>)}
            </select>
            {errors.assetType && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.assetType}</span>}
          </div>

          <div>
            <label style={labelStyle}>Análise inicial *</label>
            <textarea value={form.firstAnalysis}
              onChange={e => setForm(p => ({ ...p, firstAnalysis: e.target.value }))}
              placeholder="Descreva o problema identificado..." rows={4}
              style={{ ...selectStyle, resize: 'vertical' }} />
            {errors.firstAnalysis && <span style={{ color: '#ef4444', fontSize: '13px' }}>{errors.firstAnalysis}</span>}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="md" type="button" onClick={() => navigate(ROUTES.CALLS)}>
            Cancelar
          </Button>
          <Button variant="primary" size="md" type="submit" loading={createCall.isPending}>
            Criar chamado
          </Button>
        </div>
      </form>
    </div>
  );
}
