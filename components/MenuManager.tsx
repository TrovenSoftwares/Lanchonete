
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface MenuManagerProps {
    menu: MenuItem[];
    setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const MenuManager: React.FC<MenuManagerProps> = ({ menu, setMenu }) => {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(menu[0] || null);

    const toggleAvailability = (id: string) => {
        setMenu(prev => prev.map(item => 
            item.id === id ? { ...item, available: !item.available } : item
        ));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            <div className="lg:col-span-7 space-y-4">
                {menu.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`bg-white dark:bg-[#1a120b] rounded-xl p-4 shadow-sm border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                            selectedItem?.id === item.id ? 'border-primary ring-1 ring-primary' : 'border-transparent dark:border-slate-800'
                        }`}
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className="size-16 rounded-lg bg-cover bg-center shrink-0 shadow-inner" style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold dark:text-white">{item.name}</h3>
                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{item.category}</span>
                                </div>
                                <p className="text-slate-500 text-sm line-clamp-1">{item.description}</p>
                                <p className="text-primary font-bold text-sm">R$ {item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className={`text-[10px] uppercase font-bold ${item.available ? 'text-slate-400' : 'text-red-500'}`}>
                                {item.available ? 'Disponível' : 'Esgotado'}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={item.available} 
                                    onChange={() => toggleAvailability(item.id)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#1a120b] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-fit sticky top-0">
                <h2 className="text-xl font-bold dark:text-white mb-6">Editar Item</h2>
                {selectedItem ? (
                    <div className="space-y-6">
                        <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-800 bg-cover bg-center" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-bold dark:text-slate-300 block mb-1">Nome do Item</label>
                                <input 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-2.5 text-sm dark:text-white"
                                    value={selectedItem.name}
                                    readOnly
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold dark:text-slate-300 block mb-1">Preço (R$)</label>
                                    <input 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-2.5 text-sm dark:text-white"
                                        value={selectedItem.price.toFixed(2)}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold dark:text-slate-300 block mb-1">Categoria</label>
                                    <input 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg p-2.5 text-sm dark:text-white"
                                        value={selectedItem.category}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex-1 py-3 border rounded-xl font-bold dark:text-white">Descartar</button>
                            <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold">Salvar</button>
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-400 text-center">Selecione um item para editar</p>
                )}
            </div>
        </div>
    );
};

export default MenuManager;
