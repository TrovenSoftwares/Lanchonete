
import React from 'react';
import { View } from '../types';

interface HeaderProps {
    currentView: View;
    darkMode: boolean;
    toggleDarkMode: () => void;
    onCustomerView: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, darkMode, toggleDarkMode, onCustomerView }) => {
    const viewTitles: Record<View, string> = {
        DASHBOARD: 'Visão Geral',
        TABLES: 'Gestão de Mesas',
        ORDERS: 'Pedidos',
        MENU: 'Gestão de Cardápio',
        DELIVERY: 'Entregas',
        CUSTOMER_VIEW: 'Portal do Cliente'
    };

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#1a120b] border-b border-slate-200 dark:border-slate-800 flex-shrink-0 z-10">
            <div className="flex items-center gap-4 flex-1">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white hidden md:block">{viewTitles[currentView]}</h2>
                <div className="relative max-w-md w-full ml-4 hidden sm:block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input 
                        className="w-full bg-background-light dark:bg-slate-800/50 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200 placeholder-slate-400" 
                        placeholder="Buscar pedido, mesa ou cliente..." 
                        type="text"
                    />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={toggleDarkMode}
                    className="size-10 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                    <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a120b]"></span>
                </button>
                <button 
                    onClick={onCustomerView}
                    className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm shadow-primary/30"
                >
                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                    <span>Portal Cliente</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
