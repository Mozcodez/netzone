import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/hooks/useAuth";
import { useVouchers } from "../store/hooks/useVouchers";
import styles from "./DashboardLayout.module.css";

const WifiIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const ChevronIcon = ({ collapsed }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.25s",
    }}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const DashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);
const TicketIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
  </svg>
);
const UsersIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const SettingsIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const LogoutIcon = () => (
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const NAV_ITEMS = [
  {
    to: "/dashboard",
    end: true,
    label: "Dashboard",
    Icon: DashIcon,
    section: "Overview",
  },
  {
    to: "/dashboard/vouchers",
    end: false,
    label: "Vouchers",
    Icon: TicketIcon,
    section: "Management",
  },
  {
    to: "/dashboard/sessions",
    end: false,
    label: "Live sessions",
    Icon: UsersIcon,
    section: "Management",
  },
  {
    to: "/dashboard/settings",
    end: false,
    label: "Settings",
    Icon: SettingsIcon,
    section: "System",
  },
];

export default function DashboardLayout() {
  const { logout } = useAuth();
  const { vouchers } = useVouchers();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 520px)").matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(max-width: 520px)");
    const handleChange = (event) => setCollapsed(event.matches);

    if (query.addEventListener) {
      query.addEventListener("change", handleChange);
    } else {
      query.addListener(handleChange);
    }

    return () => {
      if (query.removeEventListener) {
        query.removeEventListener("change", handleChange);
      } else {
        query.removeListener(handleChange);
      }
    };
  }, []);

  const activeSessions = vouchers.filter((v) => v.status === "active").length;
  const navItems = NAV_ITEMS.map((item, idx, arr) => {
    const prev = arr[idx - 1];
    const showSection =
      !collapsed && item.section !== (prev ? prev.section : null);
    return { ...item, showSection };
  });
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`${styles.layout} ${collapsed ? styles.layoutCollapsed : ""}`}
    >
      <aside
        className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ""}`}
      >
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <WifiIcon />
          </div>
          {!collapsed && (
            <div className={styles.brandText}>
              <div className={styles.brandName}>NetZone</div>
              <div className={styles.brandSub}>Hotspot Manager</div>
            </div>
          )}
        </div>

        {/* Toggle button */}
        <button
          className={styles.toggleBtn}
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronIcon collapsed={collapsed} />
        </button>

        {/* Nav */}
        <nav className={styles.nav}>
          {navItems.map(({ to, end, label, Icon, section, showSection }) => (
            <div key={to}>
              {showSection && (
                <div className={styles.navSection}>{section}</div>
              )}
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ""} ${collapsed ? styles.navItemCollapsed : ""}`
                }
                title={collapsed ? label : undefined}
              >
                <span className={styles.navIcon}>
                  <Icon />
                </span>
                {!collapsed && <span className={styles.navLabel}>{label}</span>}
                {!collapsed &&
                  label === "Live sessions" &&
                  activeSessions > 0 && (
                    <span className={styles.badge}>{activeSessions}</span>
                  )}
                {collapsed &&
                  label === "Live sessions" &&
                  activeSessions > 0 && <span className={styles.badgeDot} />}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <button
            className={`${styles.logoutBtn} ${collapsed ? styles.logoutCollapsed : ""}`}
            onClick={handleLogout}
            title={collapsed ? "Sign out" : undefined}
          >
            <LogoutIcon />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
