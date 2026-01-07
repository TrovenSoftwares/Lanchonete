
export enum OrderStatus {
    PREPARING = 'PREPARING',
    READY = 'READY',
    IN_ROUTE = 'IN_ROUTE',
    WAITING = 'WAITING',
    DELIVERED = 'DELIVERED'
}

export enum TableStatus {
    FREE = 'FREE',
    OCCUPIED = 'OCCUPIED',
    RESERVED = 'RESERVED',
    BILL = 'BILL'
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
}

export interface Table {
    id: number;
    status: TableStatus;
    capacity: number;
    currentCustomer?: string;
    timeElapsed?: string;
}

export interface Order {
    id: string;
    customer: string;
    origin: 'TABLE' | 'DELIVERY' | 'PICKUP';
    tableId?: number;
    status: OrderStatus;
    items: { menuItemId: string; quantity: number }[];
    total: number;
    timestamp: string;
}

export type View = 'DASHBOARD' | 'TABLES' | 'ORDERS' | 'MENU' | 'DELIVERY' | 'CUSTOMER_VIEW';
