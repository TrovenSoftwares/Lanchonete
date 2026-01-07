
import React from 'react';
import { View } from '../types';

interface SidebarProps {
    currentView: View;
    setView: (view: View) => void;
    ordersCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, ordersCount }) => {
    const navItems = [
        { id: 'DASHBOARD' as View, label: 'Visão Geral', icon: 'dashboard' },
        { id: 'TABLES' as View, label: 'Gestão de Mesas', icon: 'table_restaurant' },
        { id: 'ORDERS' as View, label: 'Pedidos', icon: 'receipt_long', badge: ordersCount },
        { id: 'DELIVERY' as View, label: 'Entregas', icon: 'two_wheeler' },
        { id: 'MENU' as View, label: 'Cardápio Digital', icon: 'menu_book' },
    ];

    return (
        <aside class="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-[#1a120b] border-r border-slate-200 dark:border-slate-800">
            <div class="p-6 flex items-center gap-3">
                <div class="size-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                    <span class="material-symbols-outlined icon-fill text-2xl">restaurant_menu</span>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-lg font-bold leading-tight dark:text-white">Gourmet Admin</h1>
                    <p class="text-xs text-slate-500 dark:text-slate-400">Unidade Centro</p>
                </div>
            </div>
            
            <nav class="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group w-full text-left ${
                            currentView === item.id 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                        }`}
                    >
                        <span className={`material-symbols-outlined ${currentView === item.id ? 'icon-fill' : 'group-hover:text-primary'}`}>
                            {item.icon}
                        </span>
                        <span className={`font-medium ${currentView === item.id ? '' : 'group-hover:text-slate-900 dark:group-hover:text-slate-100'}`}>
                            {item.label}
                        </span>
                        {item.badge && (
                            <span class="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            <div class="p-4 border-t border-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center" style={{ backgroundImage: 'url("https://picsum.photos/seed/manager/100/100")' }}></div>
                    <div class="flex flex-col overflow-hidden">
                        <p class="text-sm font-medium truncate text-slate-900 dark:text-white">Gerente Marcos</p>
                        <p class="text-xs text-slate-500 truncate">marcos@gourmet.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
