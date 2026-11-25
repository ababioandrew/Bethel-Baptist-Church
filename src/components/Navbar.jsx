import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

import BethelLogo from "../icons/BethelBaptistLogo.png";

export default function Navbar() {
  const { pathname } = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminVerified, setAdminVerified] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    setDrawerOpen(false);
    setAdminOpen(false);
    setShowAdminLogin(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Ministries" },
    { to: "/contact", label: "Contact" },
  ];

  const adminLinks = [
    { to: "/Admin", label: "Admin Dashboard" },
    { to: "/MembersDashboard", label: "Members Dashboard" },
    { to: "/FullDetails", label: "Add Member" },
  ];

  const isActive = (path) =>
    path === "/"
      ? pathname === "/"
      : pathname === path || pathname.startsWith(`${path}/`);

  const isAdminActive = adminLinks.some((link) => isActive(link.to));

  const openAdminLogin = () => {
    if (adminVerified) {
      setAdminOpen((prev) => !prev);
      return;
    }

    setShowAdminLogin((prev) => !prev);
    setAdminError("");
    setAdminPassword("");
  };

  const verifyAdminPassword = (e) => {
    e.preventDefault();

    // Replace with server-side authentication in production.
    if (adminPassword === ".apn") {
      setAdminVerified(true);
      setAdminOpen(true);
      setShowAdminLogin(false);
      setAdminPassword("");
      setAdminError("");
      setShowPassword(false);
    } else {
      setAdminError("Incorrect admin password.");
      setAdminPassword("");
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setAdminOpen(false);
    setShowAdminLogin(false);
  };

  const renderAdminLogin = () => (
    <form
      className="admin-login-box"
      onSubmit={verifyAdminPassword}
    >
      <div className="admin-login-heading">
        <span className="admin-login-icon">🔐</span>
        <div>
          <strong>Admin Access</strong>
          <small>Restricted area</small>
        </div>
      </div>

      <label className="admin-input-label">
        Password
      </label>

      <div className="admin-password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          value={adminPassword}
          onChange={(e) => {
            setAdminPassword(e.target.value);
            setAdminError("");
          }}
          placeholder="Enter password"
          autoComplete="off"
          required
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {adminError && (
        <p className="admin-login-error">{adminError}</p>
      )}

      <button type="submit" className="admin-verify-button">
        Verify Access
      </button>
    </form>
  );

  const renderAdminDropdown = () => (
    <div className="admin-dropdown">
      {adminLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`admin-dropdown-link ${
            isActive(link.to) ? "active" : ""
          }`}
          onClick={() => setAdminOpen(false)}
        >
          <span>{link.label}</span>
          <span className="admin-dropdown-arrow">→</span>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-inner">

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className={`hamburger ${drawerOpen ? "is-open" : ""}`}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            <span />
            <span />
            <span />
          </button>

          {/* BRAND */}
          <Link
            to="/"
            className="navbar-logo"
            aria-label="Bethel Baptist Church Home"
          >
            <div className="logo-mark">
              <img
                src={BethelLogo}
                alt="Bethel Baptist Church logo"
                className="logo-icon"
              />
            </div>

            <div className="logo-text">
              <span className="logo-brand">
                Bethel Baptist Church
              </span>
              <span className="logo-sub">
                WORSHIP • GROW • SERVE
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="navbar-nav" aria-label="Main navigation">
            <ul className="navbar-links">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`nav-link ${
                      isActive(link.to) ? "active" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* ADMIN */}
              <li className="admin-nav-item">
                <button
                  type="button"
                  className={`nav-link admin-button ${
                    isAdminActive ? "active" : ""
                  }`}
                  onClick={openAdminLogin}
                  aria-expanded={adminOpen || showAdminLogin}
                >
                  Admin
                  <span className="admin-arrow">
                    {adminOpen || showAdminLogin ? "⌃" : "⌄"}
                  </span>
                </button>

                {showAdminLogin && !adminVerified && (
                  <div className="admin-menu-panel">
                    {renderAdminLogin()}
                  </div>
                )}

                {adminVerified && adminOpen && (
                  <div className="admin-menu-panel">
                    {renderAdminDropdown()}
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* DESKTOP CTA */}
          <Link to="/contact" className="navbar-cta">
            Plan a Visit
            <span>→</span>
          </Link>
        </div>
      </header>

      {/* MOBILE BACKDROP */}
      <div
        className={`drawer-backdrop ${drawerOpen ? "open" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* MOBILE DRAWER */}
      <aside
        className={`drawer ${drawerOpen ? "open" : ""}`}
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-header">
          <Link
            to="/"
            className="drawer-logo"
            onClick={closeDrawer}
          >
            <img src={BethelLogo} alt="" className="drawer-logo-img" />

            <div className="logo-text">
              <span className="logo-brand">
                Bethel Baptist Church
              </span>
              <span className="logo-sub">
                WORSHIP • GROW • SERVE
              </span>
            </div>
          </Link>

          <button
            type="button"
            className="drawer-close"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <div className="drawer-rule" />

        <nav className="drawer-nav" aria-label="Mobile navigation">
          <ul>
            {links.map((link, index) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`drawer-link ${
                    isActive(link.to) ? "active" : ""
                  }`}
                  onClick={closeDrawer}
                  style={{ "--nav-index": index }}
                >
                  <span>{link.label}</span>
                  <span className="drawer-link-arrow">→</span>
                </Link>
              </li>
            ))}

            {/* MOBILE ADMIN */}
            <li className="mobile-admin-section">
              <button
                type="button"
                className={`drawer-link mobile-admin-button ${
                  isAdminActive ? "active" : ""
                }`}
                onClick={() => {
                  if (adminVerified) {
                    setAdminOpen((prev) => !prev);
                  } else {
                    setShowAdminLogin((prev) => !prev);
                    setAdminError("");
                  }
                }}
              >
                <span>Admin</span>
                <span className="mobile-admin-arrow">
                  {adminOpen || showAdminLogin ? "⌃" : "⌄"}
                </span>
              </button>

              {showAdminLogin && !adminVerified && (
                <div className="mobile-admin-login">
                  {renderAdminLogin()}
                </div>
              )}

              {adminVerified && adminOpen && (
                <div className="mobile-admin-submenu">
                  {adminLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`mobile-admin-link ${
                        isActive(link.to) ? "active" : ""
                      }`}
                      onClick={closeDrawer}
                    >
                      <span>{link.label}</span>
                      <span>→</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* DRAWER FOOTER */}
        <div className="drawer-footer">
          <span className="drawer-footer-label">
            YOU ARE WELCOME
          </span>

          <p className="drawer-footer-text">
            Join us for worship, fellowship, spiritual growth,
            and a community committed to sharing the love of Christ.
          </p>

          <Link
            to="/contact"
            className="drawer-cta"
            onClick={closeDrawer}
          >
            Plan Your Visit <span>→</span>
          </Link>
        </div>
      </aside>
    </>
  );
}