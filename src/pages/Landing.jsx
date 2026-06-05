import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="white" stroke="none"/>
            </svg>
          </div>
          <span className={styles.logoName}>NetZone</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin')}>
          Admin login
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroTag}>Fast · Reliable · Affordable</div>
          <h1 className={styles.heroTitle}>
            WiFi for everyone<br />in your community
          </h1>
          <p className={styles.heroSub}>
            Buy a voucher, connect instantly. No contracts, no hassle.
            Pay for exactly the time you need.
          </p>
          <button className={`btn btn-primary btn-lg ${styles.heroBtn}`} onClick={() => navigate('/portal')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Connect now
          </button>
        </div>

        <div className={styles.plans}>
          {[
            { duration: '1 Hour',   price: '1,000', icon: '⚡', desc: 'Quick browsing' },
            { duration: '3 Hours',  price: '1,500', icon: '☕', desc: 'Work session' },
            { duration: '6 Hours',  price: '2,000', icon: '📱', desc: 'Half day' },
            { duration: '24 Hours', price: '3,000', icon: '🌙', desc: 'Full day' },
          ].map(p => (
            <div key={p.duration} className={styles.planCard}>
              <div className={styles.planIcon}>{p.icon}</div>
              <div className={styles.planDuration}>{p.duration}</div>
              <div className={styles.planPrice}>TZS {p.price}</div>
              <div className={styles.planDesc}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div className={styles.howto}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={styles.steps}>
            {[
              { n: '1', title: 'Buy a voucher', desc: 'Purchase from our local agent or shop' },
              { n: '2', title: 'Connect to NetZone WiFi', desc: 'Select NetZone from your WiFi list' },
              { n: '3', title: 'Enter your code', desc: 'Type in your voucher code and get online' },
            ].map(s => (
              <div key={s.n} className={styles.step}>
                <div className={styles.stepNum}>{s.n}</div>
                <div>
                  <div className={styles.stepTitle}>{s.title}</div>
                  <div className={styles.stepDesc}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>© 2025 NetZone · Dar es Salaam</span>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/portal')}>Customer portal</button>
      </footer>
    </div>
  );
}
