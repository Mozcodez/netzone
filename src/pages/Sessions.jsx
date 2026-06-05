import { useEffect, useState } from 'react';
import { useVouchers } from '../store/VoucherContext';
import PageHeader from '../components/PageHeader';
import styles from './Sessions.module.css';

function timeLeft(expiresAt) {
  const diff = new Date(expiresAt) - new Date();
  if (diff <= 0) return { h: 0, m: 0, s: 0, total: 0 };
  const total = Math.floor(diff / 1000);
  return { h: Math.floor(total / 3600), m: Math.floor((total % 3600) / 60), s: total % 60, total };
}

function pad(n) { return String(n).padStart(2, '0'); }

export default function Sessions() {
  const { vouchers, disconnect } = useVouchers();
  const [tick, setTick] = useState(0);
  const active = vouchers.filter(v => v.status === 'active');

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.page}>
      <PageHeader
        title="Live sessions"
        subtitle={`${active.length} user${active.length !== 1 ? 's' : ''} connected right now`}
        actions={
          <span className={styles.liveChip}>
            <span className={styles.liveDot} />
            Live
          </span>
        }
      />

      <div className={styles.inner}>
        {active.length === 0 ? (
          <div className={`card ${styles.empty}`}>
            <div className={styles.emptyIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            No active sessions
          </div>
        ) : (
          <div className={`card ${styles.tableCard}`}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Voucher code</th>
                    <th>MAC address</th>
                    <th>Plan</th>
                    <th>Time remaining</th>
                    <th>Progress</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {active.map(v => {
                    const tl = timeLeft(v.expiresAt);
                    const totalSecs = v.duration * 3600;
                    const elapsed = totalSecs - tl.total;
                    const pct = Math.min(100, Math.round((elapsed / totalSecs) * 100));
                    return (
                      <tr key={v.id}>
                        <td className={styles.mono}>{v.code}</td>
                        <td className={`${styles.mono} ${styles.muted}`}>{v.mac}</td>
                        <td>{v.duration}h</td>
                        <td className={styles.timer}>
                          {pad(tl.h)}:{pad(tl.m)}:{pad(tl.s)}
                        </td>
                        <td className={styles.progressCell}>
                          <div className={styles.bar}>
                            <div className={styles.barFill} style={{ width: `${pct}%` }} />
                          </div>
                          <span className={styles.pct}>{pct}%</span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              if (confirm('Disconnect this user?')) disconnect(v.id);
                            }}
                          >
                            Disconnect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
