
import React from 'react';
import { Order } from '../types';

interface DeliveryManagerProps {
    orders: Order[];
}

const DeliveryManager: React.FC<DeliveryManagerProps> = ({ orders }) => {
    const deliveryOrders = orders.filter(o => o.origin === 'DELIVERY');

    return (
        <div className="flex h-full gap-6">
            <div className="w-[400px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a120b] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b dark:border-slate-800">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Entregas Ativas ({deliveryOrders.length})</h2>
                </div>
                <div className="flex-1 overflow-y-auto divide-y dark:divide-slate-800">
                    {deliveryOrders.map(order => (
                        <div key={order.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold dark:text-white">#{order.id}</span>
                                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">A CAMINHO</span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-400">person</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm dark:text-white">{order.customer}</h3>
                                    <p className="text-xs text-slate-500">Rua das Flores, 123</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {deliveryOrders.length === 0 && (
                        <div className="p-8 text-center text-slate-400">Sem entregas ativas no momento.</div>
                    )}
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-[#1a120b] rounded-2xl border dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center text-slate-400">
                <span className="material-symbols-outlined text-6xl mb-4">map</span>
                <p>Mapa de Entregas em Tempo Real em Breve</p>
            </div>
        </div>
    );
};

export default DeliveryManager;
