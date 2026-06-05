import { createContext, useContext, useState, useCallback } from 'react';
import { initialVouchers, makeVoucher } from './vouchers';

const VoucherContext = createContext(null);

export function VoucherProvider({ children }) {
  const [vouchers, setVouchers] = useState(initialVouchers);

  const generate = useCallback((duration, price, qty) => {
    const newOnes = Array.from({ length: qty }, () => makeVoucher(duration, price));
    setVouchers(prev => [...newOnes, ...prev]);
    return newOnes;
  }, []);

  const redeem = useCallback((code) => {
    let found = null;
    setVouchers(prev => prev.map(v => {
      if (v.code === code && v.status === 'unused') {
        const now = new Date();
        const expires = new Date(now.getTime() + v.duration * 60 * 60 * 1000);
        const mac = 'CC:DD:EE:' + [1,2,3].map(()=>Math.floor(Math.random()*90+10)).join(':');
        found = { ...v, status: 'active', startedAt: now.toISOString(), expiresAt: expires.toISOString(), mac };
        return found;
      }
      return v;
    }));
    return found;
  }, []);

  const disconnect = useCallback((id) => {
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, status: 'expired' } : v));
  }, []);

  const remove = useCallback((id) => {
    setVouchers(prev => prev.filter(v => v.id !== id));
  }, []);

  return (
    <VoucherContext.Provider value={{ vouchers, generate, redeem, disconnect, remove }}>
      {children}
    </VoucherContext.Provider>
  );
}

export const useVouchers = () => useContext(VoucherContext);
