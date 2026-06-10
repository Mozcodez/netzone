export const PLANS = [
  { duration: 1, label: "1 Hour", price: 1000 },
  { duration: 3, label: "3 Hours", price: 1500 },
  { duration: 6, label: "6 Hours", price: 2000 },
  { duration: 24, label: "24 Hours", price: 3000 },
];

export function genCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const r = (n) =>
    Array.from(
      { length: n },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  return `NZ${r(2)}-${r(4)}`;
}

export function makeVoucher(duration, price) {
  return {
    code: genCode(),
    duration,
    price,
    status: "unused",
    created_at: new Date().toISOString(),
    started_at: null,
    expires_at: null,
    mac: null,
  };
}
