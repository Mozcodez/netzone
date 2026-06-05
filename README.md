# NetZone – WiFi Hotspot Manager

A full React/Vite voucher management system for WiFi hotspot businesses.

## Routes

| Path | Who sees it | Description |
|------|-------------|-------------|
| `/` | Public | Landing page with links to portal & admin |
| `/portal` | Customers | Enter voucher code, see live countdown |
| `/admin` | Admin | Login page (password: `admin123`) |
| `/dashboard` | Admin only | Overview stats & quick generate |
| `/dashboard/vouchers` | Admin only | All vouchers, filter, delete, disconnect |
| `/dashboard/sessions` | Admin only | Live sessions with real-time countdown |
| `/dashboard/settings` | Admin only | Business info & MikroTik router config |

## Getting started

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Default admin password
`admin123` — change this in `src/store/AuthContext.jsx` before deploying,
or wire it up to your Supabase auth.

## Next steps
1. **Supabase backend** — replace the in-memory context with real DB calls
2. **MikroTik API** — call the RouterOS REST API from a Node.js backend to
   actually enforce session cutoffs on the router
3. **Print vouchers** — add a print/PDF export for voucher batches
4. **Real auth** — swap the password check for Supabase Auth

## Stack
- React 19 + Vite
- React Router v7
- CSS Modules (no external UI lib)
- DM Sans + DM Mono fonts (Google Fonts)
