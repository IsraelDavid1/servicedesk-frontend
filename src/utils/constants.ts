import { Assets, AssetsType } from '@types/enums';

export const ASSETS_LABELS: Record<Assets, string> = {
  [Assets.HARDWARE]: 'Hardware',
  [Assets.SOFTWARE]: 'Software',
  [Assets.CLOUD]: 'Nuvem',
  [Assets.INTERNET]: 'Internet',
  [Assets.DATA]: 'Dados',
};

export const ASSETS_TYPE_LABELS: Record<AssetsType, string> = {
  [AssetsType.DESKTOP]: 'Desktop',
  [AssetsType.NOTEBOOK]: 'Notebook',
  [AssetsType.MONITOR]: 'Monitor',
  [AssetsType.PRINTER]: 'Impressora',
  [AssetsType.SCANNER]: 'Scanner',
  [AssetsType.SERVER]: 'Servidor',
  [AssetsType.NO_BREAK]: 'No-break',
  [AssetsType.PERIPHERALS]: 'Periféricos',
  [AssetsType.OPERATIONAL_SYSTEM]: 'Sistema Operacional',
  [AssetsType.NAVIGATOR]: 'Navegador',
  [AssetsType.ANTIVIRUS]: 'Antivírus',
  [AssetsType.FIREWALL]: 'Firewall',
  [AssetsType.DATABASE]: 'Banco de Dados',
  [AssetsType.VIRTUAL_MACHINE]: 'Máquina Virtual',
  [AssetsType.CONTAINER]: 'Container',
  [AssetsType.BACKUP]: 'Backup',
  [AssetsType.WIFI]: 'Wi-Fi',
  [AssetsType.ROUTER]: 'Roteador',
  [AssetsType.SWITCH]: 'Switch',
  [AssetsType.VPN]: 'VPN',
  [AssetsType.DHCP]: 'DHCP',
  [AssetsType.DNS]: 'DNS',
  [AssetsType.WIRES]: 'Cabeamento',
  [AssetsType.NO_ACCESS]: 'Sem Acesso',
  [AssetsType.MIGRATIONS]: 'Migrações',
  [AssetsType.CORRUPTED]: 'Corrompido',
  [AssetsType.LOST_DATA]: 'Dados Perdidos',
};

export const ASSETS_TYPE_BY_ASSET: Record<Assets, AssetsType[]> = {
  [Assets.HARDWARE]: [
    AssetsType.DESKTOP,
    AssetsType.NOTEBOOK,
    AssetsType.MONITOR,
    AssetsType.PRINTER,
    AssetsType.SCANNER,
    AssetsType.SERVER,
    AssetsType.NO_BREAK,
    AssetsType.PERIPHERALS,
  ],
  [Assets.SOFTWARE]: [
    AssetsType.OPERATIONAL_SYSTEM,
    AssetsType.NAVIGATOR,
    AssetsType.ANTIVIRUS,
    AssetsType.FIREWALL,
    AssetsType.DATABASE,
    AssetsType.VIRTUAL_MACHINE,
    AssetsType.CONTAINER,
    AssetsType.BACKUP,
  ],
  [Assets.INTERNET]: [
    AssetsType.WIFI,
    AssetsType.ROUTER,
    AssetsType.SWITCH,
    AssetsType.VPN,
    AssetsType.DHCP,
    AssetsType.DNS,
    AssetsType.WIRES,
  ],
  [Assets.CLOUD]: [
    AssetsType.VIRTUAL_MACHINE,
    AssetsType.CONTAINER,
    AssetsType.BACKUP,
    AssetsType.DATABASE,
  ],
  [Assets.DATA]: [
    AssetsType.NO_ACCESS,
    AssetsType.MIGRATIONS,
    AssetsType.CORRUPTED,
    AssetsType.LOST_DATA,
    AssetsType.BACKUP,
  ],
};

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  CALLS: '/calls',
  CALL_DETAILS: (id: string) => `/calls/${id}`,
  CALL_NEW: '/calls/new',
  PROFILE: '/profile',
  ERROR: '/error',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'sd_user',
} as const;
