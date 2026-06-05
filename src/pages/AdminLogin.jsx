import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/dashboard');
    } else {
      setError('Incorrect password. Try admin123 for demo.');
      setPassword('');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h1 className={styles.title}>Admin access</h1>
        <p className={styles.sub}>NetZone Hotspot Manager</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              autoFocus
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
            Sign in to dashboard
          </button>
        </form>

        <button className={`btn btn-ghost ${styles.backBtn}`} onClick={() => navigate('/')}>
          ← Back to home
        </button>
      </div>
    </div>
  );
}
