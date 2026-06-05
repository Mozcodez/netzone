import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVouchers } from "../store/VoucherContext";
import styles from "./Portal.module.css";

function pad(n) {
  return String(n).padStart(2, "0");
}

function timeLeftFrom(expiresAt) {
  return Math.max(0, Math.floor((new Date(expiresAt) - new Date()) / 1000));
}

// Shared timer display used by both connect flow and check flow
function SessionTimer({ voucher, onReset }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    timeLeftFrom(voucher.expiresAt),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const t = timeLeftFrom(voucher.expiresAt);
      setTimeLeft(t);
      if (t === 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [voucher.expiresAt]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  const totalSecs = voucher.duration * 3600;
  const pct = Math.max(0, Math.round((timeLeft / totalSecs) * 100));
  const expired = timeLeft === 0;

  // Warning colours when under 10 minutes
  const warning = timeLeft > 0 && timeLeft < 600;

  return (
    <div className={`card ${styles.sessionCard}`}>
      <div
        className={`${styles.connectedIcon} ${expired ? styles.expiredIcon : ""}`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill="white" stroke="none" />
        </svg>
      </div>

      {expired ? (
        <>
          <div className={styles.connectedLabel}>Session ended</div>
          <div className={styles.connectedSub}>
            Your voucher time has expired
          </div>
        </>
      ) : (
        <>
          <div className={styles.connectedLabel}>
            {warning ? "⚠️ Almost out of time!" : "You're connected!"}
          </div>
          <div className={styles.connectedSub}>
            NetZone WiFi · {voucher.duration}h plan
          </div>
        </>
      )}

      <div
        className={`${styles.timerDisplay} ${expired ? styles.timerExpired : ""} ${warning ? styles.timerWarning : ""}`}
      >
        {pad(h)}:{pad(m)}:{pad(s)}
      </div>
      <div className={styles.timerLabel}>
        {expired ? "Time expired" : "Time remaining"}
      </div>

      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${warning ? styles.progressWarning : ""}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className={styles.progressPct}>{pct}%</span>
      </div>

      <div className={styles.sessionMeta}>
        <span>
          Code: <code className={styles.sessionCode}>{voucher.code}</code>
        </span>
        <span>
          {expired
            ? "Expired"
            : `Expires ${new Date(voucher.expiresAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
        </span>
      </div>

      {expired && (
        <div className={styles.expiredMsg}>
          Purchase a new voucher to reconnect.
        </div>
      )}

      <button className={`btn btn-ghost ${styles.resetBtn}`} onClick={onReset}>
        ← Check a different code
      </button>
    </div>
  );
}

// Tab: Connect with a new voucher
function ConnectTab() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [session, setSession] = useState(null);
  const { redeem } = useVouchers();

  const handleInput = (e) => {
    let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (v.length > 4) v = v.slice(0, 4) + "-" + v.slice(4, 8);
    setCode(v);
    setError("");
  };

  const handleConnect = () => {
    if (code.replace(/-/g, "").length < 6) {
      setError("Please enter a valid voucher code.");
      return;
    }
    const result = redeem(code);
    if (!result) {
      setError("Invalid code or already used. Please check and try again.");
      return;
    }
    setSession(result);
  };

  if (session)
    return (
      <SessionTimer
        voucher={session}
        onReset={() => {
          setSession(null);
          setCode("");
        }}
      />
    );

  return (
    <div className={`card ${styles.loginCard}`}>
      <div className={styles.cardIcon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill="white" stroke="none" />
        </svg>
      </div>
      <h1 className={styles.cardTitle}>Connect to WiFi</h1>
      <p className={styles.cardSub}>
        Enter your unused voucher code to get online
      </p>

      <input
        className={styles.codeInput}
        type="text"
        placeholder="e.g. NZ4K-8F2J"
        maxLength={9}
        value={code}
        onChange={handleInput}
        autoFocus
      />
      {error && <p className={styles.error}>{error}</p>}
      <button
        className={`btn btn-primary ${styles.connectBtn}`}
        onClick={handleConnect}
      >
        Connect to internet
      </button>
      <div className={styles.plans}>
        {[
          { t: "1 hr", p: 1000 },
          { t: "3 hrs", p: 1500 },
          { t: "6 hrs", p: 2000 },
          { t: "24 hrs", p: 3000 },
        ].map((x) => (
          <div key={x.t} className={styles.planPill}>
            {x.t} · TZS {x.p.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}

// Tab: Check remaining time on an active voucher
function CheckTimeTab() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [found, setFound] = useState(null);
  const { vouchers } = useVouchers();

  const handleInput = (e) => {
    let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (v.length > 4) v = v.slice(0, 4) + "-" + v.slice(4, 8);
    setCode(v);
    setError("");
  };

  const handleCheck = () => {
    if (code.replace(/-/g, "").length < 6) {
      setError("Please enter your voucher code.");
      return;
    }
    const match = vouchers.find((v) => v.code === code);
    if (!match) {
      setError("Voucher code not found.");
      return;
    }
    if (match.status === "unused") {
      setError("This voucher has not been activated yet.");
      return;
    }
    setFound(match);
  };

  if (found)
    return (
      <SessionTimer
        voucher={found}
        onReset={() => {
          setFound(null);
          setCode("");
        }}
      />
    );

  return (
    <div className={`card ${styles.loginCard}`}>
      <div className={`${styles.cardIcon} ${styles.cardIconCheck}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <h1 className={styles.cardTitle}>Check my time</h1>
      <p className={styles.cardSub}>
        Enter your active voucher code to see how much time you have left
      </p>

      <input
        className={styles.codeInput}
        type="text"
        placeholder="e.g. NZ4K-8F2J"
        maxLength={9}
        value={code}
        onChange={handleInput}
        autoFocus
      />
      {error && <p className={styles.error}>{error}</p>}
      <button
        className={`btn btn-primary ${styles.connectBtn}`}
        onClick={handleCheck}
      >
        Check remaining time
      </button>
      <p className={styles.checkHint}>
        This is the same code you used to connect. You can check it from any
        device.
      </p>
    </div>
  );
}

export default function Portal() {
  const [tab, setTab] = useState("connect");
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <circle cx="12" cy="20" r="1" fill="white" stroke="none" />
            </svg>
          </div>
          <span>NetZone</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate("/")}>
          ← Home
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "connect" ? styles.tabActive : ""}`}
            onClick={() => setTab("connect")}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
            </svg>
            Connect
          </button>
          <button
            className={`${styles.tab} ${tab === "check" ? styles.tabActive : ""}`}
            onClick={() => setTab("check")}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Check my time
          </button>
        </div>

        {tab === "connect" ? <ConnectTab /> : <CheckTimeTab />}
      </main>
    </div>
  );
}
