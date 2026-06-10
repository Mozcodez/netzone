import { useState } from 'react';
import { useVouchers } from '../store/hooks/useVouchers';
import styles from './GenerateModal.module.css';

export default function GenerateModal({ onClose }) {
  const { generate } = useVouchers();
  const [duration, setDuration] = useState(24);
  const [qty, setQty] = useState(10);
  const [price, setPrice] = useState(3000);

  const handle = () => {
    generate(Number(duration), Number(price), Number(qty));
    onClose();
  };

  return (
    <div className={styles.backdrop} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`card ${styles.modal}`}>
        <div className={styles.header}>
          <div className={styles.title}>Generate vouchers</div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <select className="form-select" value={duration} onChange={e => setDuration(e.target.value)}>
                <option value={1}>1 hour</option>
                <option value={3}>3 hours</option>
                <option value={6}>6 hours</option>
                <option value={24}>24 hours</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input className="form-input" type="number" min={1} max={100} value={qty} onChange={e => setQty(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Price per voucher (TZS)</label>
            <input className="form-input" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div className={styles.preview}>
            Generating <strong>{qty}</strong> vouchers at <strong>TZS {Number(price).toLocaleString()}</strong> each
            = <strong className={styles.total}>TZS {(qty * price).toLocaleString()}</strong> potential revenue
          </div>
        </div>

        <div className={styles.footer}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handle}>Generate {qty} vouchers</button>
        </div>
      </div>
    </div>
  );
}
