import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export const formatDateForApi = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

/**
 * Formata uma string ISO vinda da API para exibição amigável em PT-BR.
 * 
 * Exemplo: "2024-01-15T10:30:00" → "15/01/2024 às 10:30"
 */
export const formatDateDisplay = (isoString: string | null): string => {
  if (!isoString) return '—';
  try {
    const date = parseISO(isoString);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};

/**
 * Formata apenas a data (sem hora).
 * 
 * Exemplo: "2024-01-15T10:30:00" → "15/01/2024"
 */
export const formatDateOnly = (isoString: string | null): string => {
  if (!isoString) return '—';
  try {
    return format(parseISO(isoString), 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};

/**
 * Calcula a duração entre duas datas e retorna em texto.
 * 
 * Exemplo: início 10:00, fim 11:30 → "1h 30min"
 */
export const formatDuration = (
  beginDate: string,
  endDate: string | null
): string => {
  if (!endDate) return 'Em aberto';
  
  try {
    const start = parseISO(beginDate);
    const end = parseISO(endDate);
    const diffMs = end.getTime() - start.getTime();
    
    if (diffMs < 0) return 'Inválido';
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  } catch {
    return '—';
  }
};

/**
 * Trunca um texto longo com reticências.
 * 
 * Exemplo: truncate("Texto muito longo aqui", 10) → "Texto muit..."
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
