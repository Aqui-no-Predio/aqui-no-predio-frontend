import { Service } from "../../app/models/service.model";

export const SERVICES: Service[] = [
    {
        id: 1,
        serviceName: 'Passeio com Cães',
        description: 'Disponível para passear com cães no período da noite.',
        person: 'Carlos Mendes',
        apartment: '105A'
    },
    {
        id: 2,
        serviceName: 'Regar Plantas',
        description: 'Cuidado com plantas durante viagens.',
        person: 'Fernanda Costa',
        apartment: '210B'
    },
    {
        id: 3,
        serviceName: 'Serviço de Limpeza',
        person: 'Lucas Andrade',
        apartment: '303C'
    }
];