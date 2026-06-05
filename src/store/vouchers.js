export const PLANS = [
  { duration: 1,  label: '1 Hour',   price: 1000 },
  { duration: 3,  label: '3 Hours',  price: 1500 },
  { duration: 6,  label: '6 Hours',  price: 2000 },
  { duration: 24, label: '24 Hours', price: 3000 },
];

export function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const r = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `NZ${r(2)}-${r(4)}`;
}

export function makeVoucher(duration, price) {
  return {
    id: crypto.randomUUID(),
    code: genCode(),
    duration,
    price,
    status: 'unused',
    createdAt: new Date().toISOString(),
    startedAt: null,
    expiresAt: null,
    mac: null,
  };
}

export const initialVouchers = [
  { id:'1', code:'NZ4K-8F2J', duration:1,  price:1000, status:'active',  createdAt:'2025-06-01T08:00:00Z', startedAt:'2025-06-01T10:22:00Z', expiresAt:new Date(Date.now()+25*60*1000).toISOString(), mac:'AA:BB:CC:11:22:33' },
  { id:'2', code:'NZ9P-3X7M', duration:3,  price:1500, status:'active',  createdAt:'2025-06-01T08:00:00Z', startedAt:'2025-06-01T09:00:00Z', expiresAt:new Date(Date.now()+80*60*1000).toISOString(), mac:'DD:EE:FF:44:55:66' },
  { id:'3', code:'NZ2L-5Q1R', duration:6,  price:2000, status:'active',  createdAt:'2025-06-01T08:00:00Z', startedAt:'2025-06-01T08:30:00Z', expiresAt:new Date(Date.now()+200*60*1000).toISOString(), mac:'11:22:33:AA:BB:CC' },
  { id:'4', code:'NZ7Y-4W6T', duration:24, price:3000, status:'unused',  createdAt:'2025-06-01T08:00:00Z', startedAt:null, expiresAt:null, mac:null },
  { id:'5', code:'NZ1B-2N9K', duration:1,  price:1000, status:'unused',  createdAt:'2025-06-01T08:00:00Z', startedAt:null, expiresAt:null, mac:null },
  { id:'6', code:'NZ8E-6G2W', duration:6,  price:2000, status:'unused',  createdAt:'2025-06-01T08:00:00Z', startedAt:null, expiresAt:null, mac:null },
  { id:'7', code:'NZ0F-9I5X', duration:3,  price:1500, status:'unused',  createdAt:'2025-06-01T08:00:00Z', startedAt:null, expiresAt:null, mac:null },
  { id:'8', code:'NZ6D-8H3Z', duration:3,  price:1500, status:'used',    createdAt:'2025-06-01T06:00:00Z', startedAt:'2025-06-01T07:00:00Z', expiresAt:'2025-06-01T10:00:00Z', mac:'55:66:77:88:99:00' },
  { id:'9', code:'NZ3S-7V0P', duration:1,  price:1000, status:'expired', createdAt:'2025-06-01T05:00:00Z', startedAt:'2025-06-01T06:10:00Z', expiresAt:'2025-06-01T07:10:00Z', mac:'99:88:77:66:55:44' },
];
