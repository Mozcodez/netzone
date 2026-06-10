import { useState } from 'react';
import { useVouchers } from '../store/hooks/useVouchers';
import PageHeader from '../components/PageHeader';
import GenerateModal from '../components/GenerateModal';
import styles from './Vouchers.module.css';

export default function Vouchers() {
  const { vouchers, remove, disconnect } = useVouchers();
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(null);

  const filtered = filter === 'all' ? vouchers : vouchers.filter(v => v.status === filter);

  const copy = (code) => {
    navigator.clipboard?.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Vouchers"
        subtitle={`${vouchers.length} total · ${vouchers.filter(v=>v.status==='unused').length} unused`}
        actions={
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Generate
          </button>
        }
      />

      <div className={styles.inner}>
        <div className={`card ${styles.filterBar}`}>
          {['all', 'unused', 'active', 'used', 'expired'].map(s => (
            <button
              key={s}
              className={`${styles.filterBtn} ${filter === s ? styles.filterActive : ''}`}
              onClick={() => setFilter(s)}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              <span className={styles.filterCount}>
                {s === 'all' ? vouchers.length : vouchers.filter(v => v.status === s).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className={`card ${styles.empty}`}>No vouchers found</div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(v => (
              <div key={v.id} className={`card ${styles.vCard}`}>
                <div className={styles.vTop}>
                  <code className={styles.vCode}>{v.code}</code>
                  <span className={`badge badge-${v.status}`}>
                    <span className="badge-dot" />{v.status}
                  </span>
                </div>
                <div className={styles.vMeta}>
                  {v.duration}h plan · TZS {v.price.toLocaleString()}
                </div>
                {v.expiresAt && (
                  <div className={styles.vExpiry}>
                    Expires {new Date(v.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
                <div className={styles.vActions}>
                  <button className="btn btn-sm" onClick={() => copy(v.code)}>
                    {copied === v.code ? '✓ Copied' : 'Copy'}
                  </button>
                  {v.status === 'unused' && (
                    <button className="btn btn-sm btn-danger" onClick={() => remove(v.id)}>
                      Delete
                    </button>
                  )}
                  {v.status === 'active' && (
                    <button className="btn btn-sm btn-danger" onClick={() => disconnect(v.id)}>
                      Disconnect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && <GenerateModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
