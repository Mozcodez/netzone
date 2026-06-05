import PageHeader from '../components/PageHeader';
import styles from './Settings.module.css';

export default function Settings() {
  return (
    <div className={styles.page}>
      <PageHeader title="Settings" subtitle="Configure your hotspot and router" />
      <div className={styles.inner}>
        <div className={styles.row}>
          <div className={`card ${styles.section}`}>
            <div className={styles.sectionTitle}>Business info</div>
            <div className={styles.fields}>
              <div className="form-group"><label className="form-label">Business name</label><input className="form-input" defaultValue="NetZone" /></div>
              <div className="form-group"><label className="form-label">Location</label><input className="form-input" defaultValue="Dar es Salaam, Tanzania" /></div>
              <div className="form-group"><label className="form-label">Contact number</label><input className="form-input" defaultValue="+255 7XX XXX XXX" /></div>
              <div className="form-group"><label className="form-label">Admin password</label><input className="form-input" type="password" defaultValue="admin123" /></div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Save changes</button>
            </div>
          </div>

          <div className={`card ${styles.section}`}>
            <div className={styles.sectionTitle}>MikroTik router</div>
            <div className={styles.fields}>
              <div className="form-group"><label className="form-label">Router IP address</label><input className="form-input" defaultValue="192.168.1.1" /></div>
              <div className="form-group"><label className="form-label">API port</label><input className="form-input" defaultValue="8728" /></div>
              <div className="form-group"><label className="form-label">API username</label><input className="form-input" defaultValue="admin" /></div>
              <div className="form-group"><label className="form-label">API password</label><input className="form-input" type="password" defaultValue="••••••••" /></div>
              <div className={styles.connStatus}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Connected to router
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" style={{ flex: 1, justifyContent: 'center' }}>Test connection</button>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Save</button>
              </div>
            </div>
          </div>
        </div>

        <div className={`card ${styles.section}`}>
          <div className={styles.sectionTitle}>Default plans</div>
          <div className={styles.plansGrid}>
            {[
              { label: '1 Hour', price: 1000 },
              { label: '3 Hours', price: 1500 },
              { label: '6 Hours', price: 2000 },
              { label: '24 Hours', price: 3000 },
            ].map(p => (
              <div key={p.label} className={styles.planRow}>
                <span className={styles.planLabel}>{p.label}</span>
                <input className={`form-input ${styles.planInput}`} type="number" defaultValue={p.price} />
                <span className={styles.planUnit}>TZS</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ marginTop: 16 }}>Save prices</button>
        </div>
      </div>
    </div>
  );
}
