
import { MenuItem, Table, TableStatus, OrderStatus, Order } from './types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
    {
        id: '1',
        name: 'X-Bacon Artesanal',
        description: 'Pão brioche, hambúrguer 180g, cheddar, bacon crocante, maionese da casa.',
        price: 32.90,
        category: 'Lanches',
        image: 'https://picsum.photos/seed/burger1/400/300',
        available: true
    },
    {
        id: '2',
        name: 'Refrigerante Artesanal',
        description: 'Laranja com acerola, 500ml.',
        price: 12.00,
        category: 'Bebidas',
        image: 'https://picsum.photos/seed/drink1/400/300',
        available: true
    },
    {
        id: '3',
        name: 'Torta de Chocolate',
        description: 'Fatia generosa com calda de frutas vermelhas.',
        price: 18.00,
        category: 'Sobremesas',
        image: 'https://picsum.photos/seed/cake1/400/300',
        available: false
    }
];

export const INITIAL_TABLES: Table[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    status: i % 3 === 0 ? TableStatus.OCCUPIED : (i % 5 === 0 ? TableStatus.RESERVED : TableStatus.FREE),
    capacity: 4,
    currentCustomer: i % 3 === 0 ? 'Cliente ' + (i + 1) : undefined
}));

export const INITIAL_ORDERS: Order[] = [
    {
        id: '4582',
        customer: 'Mesa 04',
        origin: 'TABLE',
        tableId: 4,
        status: OrderStatus.PREPARING,
        items: [{ menuItemId: '1', quantity: 2 }],
        total: 145.00,
        timestamp: '12 min'
    },
    {
        id: '4581',
        customer: 'Carlos A.',
        origin: 'DELIVERY',
        status: OrderStatus.IN_ROUTE,
        items: [{ menuItemId: '2', quantity: 1 }],
        total: 62.50,
        timestamp: '35 min'
    }
];
