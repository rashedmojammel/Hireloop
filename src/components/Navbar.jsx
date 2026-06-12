"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/plans" },
  ];

  return (
    <>
      <style>{`
        .hl-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(8, 8, 16, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .hl-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
        }

        /* LOGO */
        .hl-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .hl-logo-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          flex-shrink: 0;
          box-shadow: 0 0 16px rgba(124,58,237,0.35);
        }

        .hl-logo-text {
          font-size: 15px;
          font-weight: 700;
          color: #f0f0f8;
          letter-spacing: -0.02em;
        }

        /* CENTER NAV LINKS */
        .hl-nav-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 4px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
        }

        .hl-nav-links li a {
          display: block;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(200, 200, 220, 0.75);
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.15s, background 0.15s;
          letter-spacing: 0.01em;
        }

        .hl-nav-links li a:hover {
          color: #f0f0f8;
          background: rgba(255,255,255,0.07);
        }

        /* RIGHT AUTH AREA */
        .hl-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hl-greeting {
          font-size: 13px;
          color: rgba(180,180,200,0.7);
          font-weight: 500;
        }

        .hl-signout-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(180,180,200,0.8);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }

        .hl-signout-btn:hover {
          border-color: rgba(255,255,255,0.2);
          color: #f0f0f8;
          background: rgba(255,255,255,0.05);
        }

        .hl-signin-link {
          font-size: 13px;
          font-weight: 500;
          color: #a78bfa;
          text-decoration: none;
          transition: color 0.15s;
          letter-spacing: 0.01em;
        }

        .hl-signin-link:hover {
          color: #c4b5fd;
        }

        .hl-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 0 18px;
          background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
          color: #fff !important;
          font-size: 13px;
          font-weight: 600;
          border-radius: 9px;
          text-decoration: none;
          transition: opacity 0.15s, transform 0.15s;
          box-shadow: 0 2px 12px rgba(124,58,237,0.3);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .hl-cta-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* DIVIDER */
        .hl-divider {
          width: 1px;
          height: 20px;
          background: rgba(255,255,255,0.1);
        }

        /* HAMBURGER */
        .hl-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          background: transparent;
          cursor: pointer;
          color: rgba(200,200,220,0.8);
          transition: background 0.15s;
        }

        .hl-hamburger:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        /* MOBILE MENU */
        .hl-mobile-menu {
          border-top: 1px solid rgba(255,255,255,0.06);
          background: #08080f;
          padding: 16px 20px 20px;
        }

        .hl-mobile-links {
          list-style: none;
          margin: 0 0 12px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .hl-mobile-links li a {
          display: block;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(200,200,220,0.75);
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.15s, color 0.15s;
        }

        .hl-mobile-links li a:hover {
          background: rgba(255,255,255,0.05);
          color: #f0f0f8;
        }

        .hl-mobile-auth {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .hl-mobile-signin {
          display: block;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #a78bfa;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.15s;
        }

        .hl-mobile-signin:hover {
          background: rgba(167,139,250,0.08);
        }

        .hl-mobile-cta {
          display: block;
          text-align: center;
          padding: 11px 16px;
          background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          transition: opacity 0.15s;
          box-shadow: 0 2px 12px rgba(124,58,237,0.25);
        }

        .hl-mobile-cta:hover {
          opacity: 0.88;
        }

        @media (max-width: 767px) {
          .hl-nav-links { display: none; }
          .hl-nav-right .hl-desktop-only { display: none; }
          .hl-hamburger { display: flex; }
        }

        @media (min-width: 768px) {
          .hl-hamburger { display: none; }
          .hl-mobile-menu { display: none; }
        }
      `}</style>

      <nav className="hl-nav">
        <div className="hl-nav-inner">

          {/* Logo */}
          <Link href="/" className="hl-logo">
            <div className="hl-logo-mark">P</div>
            <span className="hl-logo-text">Hire Loop</span>
          </Link>

          {/* Center nav links — desktop */}
          <ul className="hl-nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          {/* Right auth area */}
          <div className="hl-nav-right">
            <div className="hl-desktop-only" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {user ? (
                <>
                  <span className="hl-greeting">Hi, {user.name}!</span>
                  <div className="hl-divider" />
                  <button className="hl-signout-btn" onClick={handleSignOut}>
                    Sign out
                  </button>
                </>
              ) : (
                <Link href="/auth/signin" className="hl-signin-link">
                  Sign in
                </Link>
              )}
              <div className="hl-divider" />
              <Link href="/register" className="hl-cta-btn">
                Get started
              </Link>
            </div>

            {/* Hamburger — mobile */}
            <button
              className="hl-hamburger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="hl-mobile-menu">
            <ul className="hl-mobile-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hl-mobile-auth">
              {user ? (
                <>
                  <span style={{ padding: "10px 12px", fontSize: 14, color: "rgba(180,180,200,0.7)" }}>
                    Hi, {user.name}!
                  </span>
                  <button
                    className="hl-signout-btn"
                    style={{ textAlign: "left", padding: "10px 12px", borderRadius: 8 }}
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link href="/auth/signin" className="hl-mobile-signin" onClick={() => setIsMenuOpen(false)}>
                  Sign in
                </Link>
              )}
              <Link href="/register" className="hl-mobile-cta" onClick={() => setIsMenuOpen(false)}>
                Get started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}