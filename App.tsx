
import React, { useState } from 'react';
import { View, MenuItem, Table, Order } from './types';
import { INITIAL_MENU_ITEMS, INITIAL_TABLES, INITIAL_ORDERS } from './constants';
import Dashboard from './components/Dashboard';
import TableManager from './components/TableManager';
import MenuManager from './components/MenuManager';
import DeliveryManager from './components/DeliveryManager';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CustomerView from './components/CustomerView';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('DASHBOARD');
    const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
    const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [darkMode, setDarkMode] = useState(false);

    if (currentView === 'CUSTOMER_VIEW') {
        return <CustomerView onExit={() => setCurrentView('DASHBOARD')} menu={menu} />;
    }

    const renderView = () => {
        switch (currentView) {
            case 'DASHBOARD':
                return <Dashboard orders={orders} tables={tables} />;
            case 'TABLES':
                return <TableManager tables={tables} setTables={setTables} />;
            case 'MENU':
                return <MenuManager menu={menu} setMenu={setMenu} />;
            case 'DELIVERY':
                return <DeliveryManager orders={orders} />;
            case 'ORDERS':
                return <div className="p-8 text-center text-slate-500">Módulo de Pedidos Detalhado em Breve</div>;
            default:
                return <Dashboard orders={orders} tables={tables} />;
        }
    };

    return (
        <div className={`flex h-screen w-full ${darkMode ? 'dark' : ''}`}>
            <Sidebar currentView={currentView} setView={setCurrentView} ordersCount={orders.length} />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Header 
                    currentView={currentView} 
                    darkMode={darkMode} 
                    toggleDarkMode={() => setDarkMode(!darkMode)}
                    onCustomerView={() => setCurrentView('CUSTOMER_VIEW')}
                />
                <main className="flex-1 overflow-y-auto p-6">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
