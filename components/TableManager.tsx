
import React, { useState } from 'react';
import { Table, TableStatus } from '../types';

interface TableManagerProps {
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

const TableManager: React.FC<TableManagerProps> = ({ tables, setTables }) => {
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);

    const updateTableStatus = (id: number, status: TableStatus) => {
        setTables(prev => prev.map(t => t.id === id ? { ...t, status } : t));
        if (selectedTable?.id === id) {
            setSelectedTable(prev => prev ? { ...prev, status } : null);
        }
    };

    return (
        <div className="flex h-full gap-6">
            <div className="flex-1 bg-[#f0edea] dark:bg-slate-900 rounded-2xl p-8 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {tables.map(table => (
                        <button 
                            key={table.id}
                            onClick={() => setSelectedTable(table)}
                            className={`relative aspect-square rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                                selectedTable?.id === table.id ? 'ring-4 ring-primary ring-opacity-50' : ''
                            } ${
                                table.status === TableStatus.FREE ? 'bg-white dark:bg-slate-800 border-green-500' :
                                table.status === TableStatus.OCCUPIED ? 'bg-primary/10 border-primary' :
                                table.status === TableStatus.RESERVED ? 'bg-red-50 border-red-500' :
                                'bg-yellow-50 border-yellow-400'
                            }`}
                        >
                            <span className="text-3xl font-bold dark:text-white">{table.id}</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                {table.status}
                            </span>
                            {table.currentCustomer && (
                                <div className="absolute -bottom-3 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                                    {table.currentCustomer}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-[360px] bg-white dark:bg-[#1a120b] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
                {selectedTable ? (
                    <>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-extrabold dark:text-white">Mesa {selectedTable.id}</h2>
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/20">
                                    {selectedTable.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500">Capacidade: {selectedTable.capacity} pessoas</p>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs font-bold text-slate-400 uppercase">Ações Rápidas</p>
                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => updateTableStatus(selectedTable.id, TableStatus.OCCUPIED)}
                                    className="p-3 text-xs font-bold border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"
                                >
                                    Marcar Ocupada
                                </button>
                                <button 
                                    onClick={() => updateTableStatus(selectedTable.id, TableStatus.FREE)}
                                    className="p-3 text-xs font-bold border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"
                                >
                                    Marcar Livre
                                </button>
                                <button 
                                    onClick={() => updateTableStatus(selectedTable.id, TableStatus.RESERVED)}
                                    className="p-3 text-xs font-bold border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"
                                >
                                    Reservar
                                </button>
                                <button 
                                    onClick={() => updateTableStatus(selectedTable.id, TableStatus.BILL)}
                                    className="p-3 text-xs font-bold border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"
                                >
                                    Conta
                                </button>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">Gerar Pedido</button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400">
                        <span className="material-symbols-outlined text-6xl mb-4">touch_app</span>
                        <p>Selecione uma mesa para ver os detalhes</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableManager;
