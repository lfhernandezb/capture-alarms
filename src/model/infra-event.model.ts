interface severity {
    id: number;
    name: string;
}

export const zabbixSeverities: severity[] = [
    { id: 0, name: 'Baja' },
    { id: 1, name: 'Baja' },
     { id: 2, name: 'Media' },
    { id: 3, name: 'Media' },
    { id: 4, name: 'Alta' },
    { id: 5, name: 'Crítica' },
  ]

export const wazuSeverities: severity[] = [
    { id: 0, name: 'Baja' },
    { id: 1, name: 'Baja' },
    { id: 2, name: 'Baja' },
    { id: 3, name: 'Baja' },
    { id: 4, name: 'Baja' },
    { id: 5, name: 'Baja' },
    { id: 6, name: 'Baja' },
    { id: 7, name: 'Media' },
    { id: 8, name: 'Media' },
    { id: 9, name: 'Media' },
    { id: 10, name: 'Media' },
    { id: 11, name: 'Media' },
    { id: 12, name: 'Alta' },
    { id: 13, name: 'Alta' },
    { id: 14, name: 'Alta' },
    { id: 15, name: 'Crítica' },
    { id: 16, name: 'Crítica' },
  ]

export interface Equipment {
    id: string;
    name: string;
    type: string;
    ip: string;
    hostname: string;
    os: string;
    os_version: string;
}

export interface InfraEvent {
    id: string;
    origin: string;
    eventid: string;
    equipment: Equipment;
    description: string;
    status: string;
    acknowledged: boolean;
    severity: string;
    timestamp: Date;
    detail: string;
}