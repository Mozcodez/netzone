import { useState } from "react";
import { useVouchers } from "../store/hooks/useVouchers";
import { PLANS } from "../store/vouchers";
import PageHeader from "../components/PageHeader";
import GenerateModal from "../components/GenerateModal";
import styles from "./DashboardHome.module.css";

export default function DashboardHome() {
  const { vouchers } = useVouchers();
  const [showModal, setShowModal] = useState(false);

  const active = vouchers.filter((v) => v.status === "active").length;
  const unused = vouchers.filter((v) => v.status === "unused").length;
  const used = vouchers.filter((v) => v.status === "used").length;
  const revenue = vouchers
    .filter((v) => v.status !== "unused")
    .reduce((s, v) => s + v.price, 0);

  const recent = [...vouchers].slice(0, 6);

  return (
    <div className={styles.page}>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your hotspot business"
        actions={
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Generate vouchers
          </button>
        }
      />

      <div className={styles.inner}>
        <div className={styles.statsGrid}>
          {[
            {
              label: "Active sessions",
              value: active,
              sub: "Right now",
              accent: true,
            },
            { label: "Unused vouchers", value: unused, sub: "Ready to sell" },
            { label: "Used today", value: used, sub: "Since midnight" },
            {
              label: "Revenue today",
              value: `TZS ${revenue.toLocaleString()}`,
              sub: "All plans",
            },
          ].map((s) => (
            <div key={s.label} className={`card ${styles.statCard}`}>
              <div className={styles.statLabel}>{s.label}</div>
              <div
                className={`${styles.statValue} ${s.accent ? styles.green : ""}`}
              >
                {s.value}
              </div>
              <div className={styles.statSub}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className={styles.row}>
          <div className={`card ${styles.quickCard}`}>
            <div className={styles.cardTitle}>Plan breakdown</div>
            <div className={styles.breakdown}>
              {PLANS.map((p) => {
                const total = vouchers.filter(
                  (v) => v.duration === p.duration,
                ).length;
                const avail = vouchers.filter(
                  (v) => v.duration === p.duration && v.status === "unused",
                ).length;
                const pct = total > 0 ? Math.round((avail / total) * 100) : 0;
                return (
                  <div key={p.duration} className={styles.breakRow}>
                    <div className={styles.breakMeta}>
                      <span className={styles.breakLabel}>{p.label}</span>
                      <span className={styles.breakCount}>
                        {avail}/{total} unused
                      </span>
                    </div>
                    <div className={styles.bar}>
                      <div
                        className={styles.barFill}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`card ${styles.quickCard}`}>
            <div className={styles.cardTitle}>Quick generate</div>
            <QuickGenerate />
          </div>
        </div>

        <div className={`card ${styles.recentCard}`}>
          <div className={styles.cardTitle}>Recent vouchers</div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Expires</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((v) => (
                  <tr key={v.id}>
                    <td className={styles.mono}>{v.code}</td>
                    <td>{v.duration}h</td>
                    <td>TZS {v.price.toLocaleString()}</td>
                    <td>
                      <span className={`badge badge-${v.status}`}>
                        <span className="badge-dot" />
                        {v.status}
                      </span>
                    </td>
                    <td className={styles.muted}>
                      {v.expiresAt
                        ? new Date(v.expiresAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && <GenerateModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function QuickGenerate() {
  const { generate } = useVouchers();
  const [duration, setDuration] = useState(24);
  const [qty, setQty] = useState(5);
  const [price, setPrice] = useState(3000);
  const [done, setDone] = useState(false);

  const handle = () => {
    generate(Number(duration), Number(price), Number(qty));
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className={styles.quickForm}>
      <div className={styles.qRow}>
        <div className="form-group">
          <label className="form-label">Duration</label>
          <select
            className="form-select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value={1}>1 hour</option>
            <option value={3}>3 hours</option>
            <option value={6}>6 hours</option>
            <option value={24}>24 hours</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input
            className="form-input"
            type="number"
            min={1}
            max={100}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Price per voucher (TZS)</label>
        <input
          className="form-input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <button className={`btn btn-primary ${styles.genBtn}`} onClick={handle}>
        {done ? "✓ Generated!" : "+ Generate & save"}
      </button>
    </div>
  );
}
