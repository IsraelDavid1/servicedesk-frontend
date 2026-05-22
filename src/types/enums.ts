export enum UserRole {
  USER = 'USER',
  TECH = 'TECH',
  ADMIN = 'ADMIN'
}

export enum Assets {
  HARDWARE = 'HARDWARE',
  SOFTWARE = 'SOFTWARE',
  CLOUD = 'CLOUD',
  INTERNET = 'INTERNET',
  DATA = 'DATA'
}

export enum AssetsType {
  DESKTOP = 'DESKTOP',
  NOTEBOOK = 'NOTEBOOK',
  MONITOR = 'MONITOR',
  PRINTER = 'PRINTER',
  SCANNER = 'SCANNER',
  SERVER = 'SERVER',
  NO_BREAK = 'NO_BREAK',
  PERIPHERALS = 'PERIPHERALS',
  OPERATIONAL_SYSTEM = 'OPERATIONAL_SYSTEM',
  NAVIGATOR = 'NAVIGATOR',
  ANTIVIRUS = 'ANTIVIRUS',
  FIREWALL = 'FIREWALL',
  DATABASE = 'DATABASE',
  VIRTUAL_MACHINE = 'VIRTUAL_MACHINE',
  CONTAINER = 'CONTAINER',
  BACKUP = 'BACKUP',
  WIFI = 'WIFI',
  ROUTER = 'ROUTER',
  SWITCH = 'SWITCH',
  VPN = 'VPN',
  DHCP = 'DHCP',
  DNS = 'DNS',
  WIRES = 'WIRES',
  NO_ACCESS = 'NO_ACCESS',
  MIGRATIONS = 'MIGRATIONS',
  CORRUPTED = 'CORRUPTED',
  LOST_DATA = 'LOST_DATA'
}

export enum CallState {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETE = 'COMPLETE'
}

// Helpers para os enums
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.USER]: 'Usuário',
  [UserRole.TECH]: 'Técnico',
  [UserRole.ADMIN]: 'Administrador'
};

export const CALL_STATE_LABELS: Record<CallState, string> = {
  [CallState.INCOMPLETE]: 'Em aberto',
  [CallState.COMPLETE]: 'Finalizado'
};

export const CALL_STATE_COLORS: Record<CallState, string> = {
  [CallState.INCOMPLETE]: 'var(--color-warning)',
  [CallState.COMPLETE]: 'var(--color-success)'
};
