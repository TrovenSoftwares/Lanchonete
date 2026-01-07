
import React from 'react';
import { Order, Table, OrderStatus } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
    orders: Order[];
    tables: Table[];
}

const data = [
    { time: '10h', value: 1200 },
    { time: '12h', value: 3400 },
    { time: '14h', value: 2100 },
    { time: '16h', value: 1800 },
    { time: '18h', value: 4500 },
    { time: '20h', value: 5200 },
    { time: '22h', value: 3100 },
];

const Dashboard: React.FC<DashboardProps> = ({ orders, tables }) => {
    const occupiedTables = tables.filter(t => t.status === 'OCCUPIED').length;
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-[#1a120b] p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Vendas Hoje</p>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">+12%</span>
                    </div>
                    <p className="text-2xl font-bold dark:text-white">R$ 4.350,00</p>
                </div>
                <div className="bg-white dark:bg-[#1a120b] p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Pedidos Abertos</p>
                        <span className="size-6 flex items-center justify-center rounded-full bg-orange-100 text-primary">
                            <span className="material-symbols-outlined text-[16px]">receipt</span>
                        </span>
                    </div>
                    <p className="text-2xl font-bold dark:text-white">{orders.length}</p>
                </div>
                <div className="bg-white dark:bg-[#1a120b] p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Mesas Ocupadas</p>
                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{Math.round((occupiedTables/tables.length)*100)}%</span>
                    </div>
                    <p className="text-2xl font-bold dark:text-white">{occupiedTables} <span className="text-base font-normal text-slate-400">/ {tables.length}</span></p>
                </div>
                <div className="bg-white dark:bg-[#1a120b] p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-500">Ticket Médio</p>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">+5%</span>
                    </div>
                    <p className="text-2xl font-bold dark:text-white">R$ 85,00</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-[#1a120b] rounded-xl border border-slate-100 dark:border-slate-800 p-6">
                    <h3 className="text-base font-bold dark:text-white mb-4">Desempenho de Vendas</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f27f0d" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#f27f0d" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis hide />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#f27f0d" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-[#1a120b] rounded-xl border border-slate-100 dark:border-slate-800 p-6">
                    <h3 className="text-base font-bold dark:text-white mb-4">Status das Mesas</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {tables.map(table => (
                            <div 
                                key={table.id}
                                className={`aspect-square rounded-lg flex items-center justify-center font-bold text-sm border ${
                                    table.status === 'FREE' ? 'bg-green-100 dark:bg-green-900/20 border-green-200 text-green-700' :
                                    table.status === 'OCCUPIED' ? 'bg-primary/20 border-primary/30 text-primary' :
                                    'bg-red-100 border-red-200 text-red-700'
                                }`}
                            >
                                {table.id}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-green-500"></span> Livre</div>
                        <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary"></span> Ocupada</div>
                        <div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-red-500"></span> Reservada</div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1a120b] rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="text-base font-bold dark:text-white">Pedidos Recentes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/30 text-xs text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">ID</th>
                                <th className="px-6 py-4 font-semibold">Cliente</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium dark:text-white">#{order.id}</td>
                                    <td className="px-6 py-4 dark:text-slate-300">{order.customer}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                                            order.status === 'PREPARING' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                            order.status === 'READY' ? 'bg-green-100 text-green-700 border-green-200' :
                                            'bg-blue-100 text-blue-700 border-blue-200'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold dark:text-white">R$ {order.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
