/**
 * Sanitiza input para prevenir XSS
 * Mantém type safety com generics
 */
export const sanitizeInput = <T extends string | null | undefined>(input: T): T => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim() as T;
};

/**
 * Type guard para verificar UUID
 */
export const isValidUUID = (uuid: unknown): uuid is string => {
  if (typeof uuid !== 'string') return false;
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

/**
 * Type guard para verificar email
 */
export const isValidEmail = (email: unknown): email is string => {
  if (typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Ofusca dados sensíveis para logging
 * Mantém type safety com overload
 */
export function maskSensitiveData(value: string, visibleChars?: number): string;
export function maskSensitiveData<T>(value: T, visibleChars?: number): T;
export function maskSensitiveData(value: unknown, visibleChars = 4): unknown {
  if (typeof value !== 'string') return value;
  if (value.length <= visibleChars) return '*'.repeat(value.length);
  
  const visible = value.slice(0, visibleChars);
  const masked = '*'.repeat(value.length - visibleChars);
  return visible + masked;
}

/**
 * Safe JSON parse com fallback
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};
