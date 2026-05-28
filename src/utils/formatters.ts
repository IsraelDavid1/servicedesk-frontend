import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateForApi = (date: Date): string => {
  return date.toISOString().slice(0, 19);
};

export const formatDateDisplay = (isoString: string | null): string => {
  if (!isoString) return '—';
  try {
    const date = parseISO(isoString);
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};

export const formatDateOnly = (isoString: string | null): string => {
  if (!isoString) return '—';
  try {
    return format(parseISO(isoString), 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return 'Data inválida';
  }
};


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

export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
