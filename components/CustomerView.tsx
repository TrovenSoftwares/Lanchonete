
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface CustomerViewProps {
    menu: MenuItem[];
    onExit: () => void;
}

const CustomerView: React.FC<CustomerViewProps> = ({ menu, onExit }) => {
    const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

    const addToCart = (id: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
            return [...prev, { id, qty: 1 }];
        });
    };

    const cartTotal = cart.reduce((acc, cartItem) => {
        const menuItem = menu.find(m => m.id === cartItem.id);
        return acc + (menuItem?.price || 0) * cartItem.qty;
    }, 0);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={onExit} className="material-symbols-outlined text-slate-400">arrow_back</button>
                    <h1 className="text-xl font-bold text-primary">Sabor & Arte</h1>
                </div>
                <div className="relative">
                    <span className="material-symbols-outlined text-3xl">shopping_basket</span>
                    {cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] size-5 rounded-full flex items-center justify-center font-bold">
                            {cart.reduce((a, b) => a + b.qty, 0)}
                        </span>
                    )}
                </div>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-8">
                <section className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-2">Sabor Inesquecível</h2>
                        <p className="opacity-90 max-w-md">Do nosso fogão direto para sua casa. Experimente o melhor da gastronomia local.</p>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url("https://picsum.photos/seed/hero/400/400")' }}></div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menu.map(item => (
                        <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 group">
                            <div className="aspect-square bg-cover bg-center relative" style={{ backgroundImage: `url(${item.image})` }}>
                                {!item.available && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">ESGOTADO</div>
                                )}
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold">{item.name}</h3>
                                    <span className="text-primary font-bold">R$ {item.price.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                                <button 
                                    disabled={!item.available}
                                    onClick={() => addToCart(item.id)}
                                    className="mt-2 w-full py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors rounded-lg font-bold text-sm disabled:opacity-50"
                                >
                                    Adicionar ao Carrinho
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {cart.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50">
                    <button className="w-full bg-primary text-white p-4 rounded-2xl shadow-xl flex justify-between items-center font-bold transform transition-transform active:scale-95">
                        <span>Ver Carrinho ({cart.reduce((a, b) => a + b.qty, 0)})</span>
                        <span>R$ {cartTotal.toFixed(2)}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomerView;
