import React from "react";
import HowItWorks from "../components/landing/Integrations";
import Personalization from "../components/landing/Personalization";
import Proactive from "../components/landing/Proactive";
import Impression from "../components/landing/Impression";
import PricingSection from "../components/landing/Pricing";
import Footer from "../components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { Link } from "wouter";

const styles = `
  :root {
    --green: #3BB741;
    --green-dark: #2E9A34;
    --green-pale: #EBF7EC;
    --green-text: #2A8C30;
    --ink: #0D0D0D;
    --body: #555555;
    --muted: #888888;
    --line: #E5E7EB;
    --surface: #F7F8F7;
    --card: #FFFFFF;
    --white: #FFFFFF;
    --badge-active: #D1FAE5;
    --badge-scheduled: #DBEAFE;
    --badge-draft: #FEF3C7;
    --font: 'Inter', system-ui, -apple-system, sans-serif;
    --wrap: 1200px;
    --section-y: 96px;
    --r-xl: 20px;
    --r-lg: 14px;
    --r-md: 10px;
    --r-sm: 6px;
    --r-full: 999px;
    --shadow-card: 0 2px 16px -4px rgba(0,0,0,0.10);
    --shadow-float: 0 8px 40px -8px rgba(0,0,0,0.16);
  }
  * { box-sizing: border-box; }
  .homepage-shell { font-family: var(--font); color: var(--ink); background: var(--white); }
  .homepage-shell a { text-decoration: none; color: inherit; }
  .wrap { max-width: var(--wrap); margin: 0 auto; padding: 0 40px; }
  .mini-mark { overflow: hidden; padding: 0; background: transparent; border: none; box-shadow: none; width: 22px; height: 22px; border-radius: 7px; display: grid; place-items: center; }
  .mini-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .btn-primary { display: inline-flex; align-items: center; justify-content: center; background: var(--green); color: white; padding: 11px 22px; border-radius: var(--r-full); font-size: 15px; font-weight: 600; border: none; cursor: pointer; transition: background 0.2s ease, transform 0.2s ease; }
  .btn-primary:hover { background: var(--green-dark); transform: translateY(-1px); }
  .hero { padding: 72px 0 80px; }
  .hero-grid { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: start; }
  .eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 7px 16px; border-radius: var(--r-full); background: var(--green-pale); color: var(--green-text); font-size: 13px; font-weight: 600; }
  .hero h1 { margin: 20px 0 0; font-size: clamp(34px, 5vw, 52px); line-height: 1.08; letter-spacing: -0.025em; color: var(--ink); font-weight: 800; max-width: 560px; }
  .hero h1 span { color: var(--green); }
  .hero p { margin: 20px 0 0; max-width: 440px; font-size: 17px; line-height: 1.65; color: var(--body); }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin-top: 32px; }
  .hero-link { display: inline-flex; align-items: center; gap: 8px; color: var(--ink); font-size: 15px; font-weight: 600; background: transparent; border: none; padding: 0; cursor: pointer; }
  .hero-link:hover { color: var(--green); }
  .play-btn { width: 22px; height: 22px; border-radius: 50%; background: var(--green); display: grid; place-items: center; color: white; flex-shrink: 0; }
  .trust-row { display: flex; flex-wrap: wrap; gap: 28px; margin-top: 32px; }
  .trust-item { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: var(--body); }
  .trust-item svg { color: var(--green); }
  .dashboard { background: white; border-radius: var(--r-xl); border: 1px solid var(--line); box-shadow: var(--shadow-float); overflow: hidden; }
  .dashboard-top { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--line); gap: 12px; flex-wrap: wrap; }
  .dashboard-brand { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 14px; color: var(--ink); }
  .mini-mark { width: 20px; height: 20px; border-radius: 6px; background: var(--green); display: grid; place-items: center; color: white; font-size: 10px; font-weight: 800; }
  .dashboard-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; color: var(--muted); font-size: 12px; }
  .pill { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border: 1px solid var(--line); border-radius: var(--r-full); color: var(--body); background: white; }
  .dashboard-body { display: flex; min-height: 480px; }
  .sidebar { width: 130px; flex-shrink: 0; border-right: 1px solid var(--line); padding: 14px 0; background: #fcfcfc; display: flex; flex-direction: column; }
  .sidebar-note { padding: 0 12px; margin-bottom: 10px; font-size: 10px; color: var(--muted); line-height: 1.4; }
  .nav-item { display: flex; align-items: center; gap: 8px; padding: 8px 12px; font-size: 12px; color: var(--body); cursor: pointer; margin: 2px 8px; border-radius: 6px; }
  .nav-item.active { background: var(--green-pale); color: var(--green); font-weight: 600; }
  .main-panel { flex: 1; padding: 14px; overflow: hidden; background: linear-gradient(180deg, white 0%, #f7f8f7 100%); }
  .stat-grid, .stat-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
  .stat-grid { margin-bottom: 14px; }
  .stat-row { margin-bottom: 14px; }
  .stat-card { padding: 10px; border-radius: var(--r-sm); border: 1px solid var(--line); background: white; min-height: 86px; display: flex; flex-direction: column; justify-content: space-between; }
  .stat-card .label { font-size: 10px; color: var(--muted); margin-bottom: 4px; }
  .stat-card .value { font-size: 20px; font-weight: 800; color: var(--ink); line-height: 1.1; }
  .sidebar-footer { margin-top: auto; padding: 10px 12px 2px; border-top: 1px solid var(--line); }
  .sidebar-footer-item { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted); padding: 6px 0; }
  .service-overview { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 6px; }
  .service-legend { display: grid; gap: 8px; width: 100%; }
  .legend-item { display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: var(--body); }
  .legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
  .legend-dot.green { background: var(--green); }
  .legend-dot.amber { background: #F59E0B; }
  .legend-dot.blue { background: #3B82F6; }
  .legend-dot.red { background: #EF4444; }
  .queue-row strong { color: var(--ink); font-weight: 700; }
  .delta { margin-top: 6px; display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: var(--green-text); font-weight: 600; }
  .delta.negative { color: #EF4444; }
  .bottom-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .panel-card { border: 1px solid var(--line); border-radius: var(--r-sm); background: white; padding: 10px; }
  .panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; font-size: 11px; font-weight: 700; color: var(--ink); }
  .panel-head a { color: var(--green); font-weight: 600; }
  .queue-row, .service-row { display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid var(--line); font-size: 11px; color: var(--body); }
  .queue-btn { margin-top: 8px; width: 100%; background: var(--green); color: white; border: none; padding: 6px; border-radius: var(--r-sm); font-size: 10px; font-weight: 700; }
  .industry-section { background: var(--surface); padding: 48px 0; }
  .industry-head { margin-bottom: 36px; text-align: center; font-size: 15px; font-weight: 600; color: var(--body); }
  .industry-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 40px; }
  .industry-item { display: flex; flex-direction: column; align-items: center; gap: 10px; min-width: 90px; text-align: center; }
  .industry-item .icon-box { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; color: var(--green); }
  .industry-item span { font-size: 13px; font-weight: 500; color: var(--body); }
  .industry-sub { margin-top: 28px; text-align: center; font-size: 14px; font-weight: 500; color: var(--muted); }
  .feature-section { background: white; padding: var(--section-y) 0; }
  .features-grid { display: grid; grid-template-columns: 280px 1fr; gap: 64px; align-items: start; }
  .feature-intro { position: sticky; top: 90px; }
  .feature-intro .eyebrow { color: var(--green); background: var(--green-pale); margin-bottom: 14px; }
  .feature-intro h2 { font-size: clamp(26px, 3.5vw, 36px); font-weight: 800; line-height: 1.15; color: var(--ink); margin: 0; }
  .feature-intro h2 span { color: var(--green); }
  .feature-intro p { margin: 16px 0 0; font-size: 16px; line-height: 1.65; color: var(--body); }
  .feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
  .feature-card { padding: 20px; border-radius: 18px; border: 1px solid var(--line); background: white; transition: box-shadow 0.2s ease, transform 0.2s ease; min-height: 220px; display: flex; flex-direction: column; justify-content: flex-start; }
  .feature-card:hover { box-shadow: var(--shadow-card); transform: translateY(-2px); }
  .feature-card .icon-box { width: 38px; height: 38px; background: var(--green-pale); border-radius: var(--r-md); display: grid; place-items: center; margin-bottom: 14px; color: var(--green); }
  .feature-card h3 { margin: 0 0 8px; font-size: 15px; font-weight: 700; color: var(--ink); }
  .feature-card p { margin: 0; font-size: 13px; line-height: 1.55; color: var(--body); }
  .campaign-section { background: var(--surface); padding: var(--section-y) 0; }
  .campaigns-grid { display: grid; grid-template-columns: 300px 1fr; gap: 64px; align-items: start; }
  .campaigns-intro .eyebrow { color: var(--green); background: var(--green-pale); margin-bottom: 14px; }
  .campaigns-intro h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 800; color: var(--ink); line-height: 1.15; margin: 0; }
  .campaigns-intro p { margin: 14px 0 0; font-size: 16px; line-height: 1.65; color: var(--body); }
  .campaigns-intro .btn-primary { margin-top: 28px; padding: 13px 24px; font-size: 15px; font-weight: 600; }
  .campaigns-strip-wrap { position: relative; overflow: hidden; }
  .campaigns-strip { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; -ms-overflow-style: none; }
  .campaigns-strip::-webkit-scrollbar { display: none; }
  .campaign-card { width: 220px; flex-shrink: 0; background: white; border-radius: var(--r-lg); border: 1px solid var(--line); overflow: hidden; box-shadow: var(--shadow-card); }
  .campaign-card .category { padding: 10px 14px 6px; }
  .campaign-card .headline { padding: 4px 14px 10px; font-size: 14px; font-weight: 700; color: var(--ink); line-height: 1.4; }
  .photo-block { height: 110px; display: grid; place-items: center; color: white; }
  .campaign-card .footer { padding: 10px 14px 12px; border-top: 1px solid var(--line); }
  .campaign-card .status { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: var(--r-sm); }
  .campaign-card .meta { margin-top: 5px; font-size: 11px; color: var(--muted); }
  .campaigns-arrow { position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--line); background: white; box-shadow: var(--shadow-card); display: grid; place-items: center; color: var(--ink); cursor: pointer; }
  .game-section { background: white; padding: var(--section-y) 0; }
  .games-grid { display: grid; grid-template-columns: 280px 1fr; gap: 64px; align-items: center; }
  .games-intro h2 { font-size: clamp(24px, 3vw, 32px); font-weight: 800; color: var(--ink); line-height: 1.15; margin: 0; }
  .games-intro p { margin: 14px 0 0; font-size: 16px; line-height: 1.65; color: var(--body); }
  .games-cards { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 14px; }
  .game-card { padding: 20px 14px; border-radius: var(--r-lg); border: 1px solid var(--line); background: white; text-align: center; transition: box-shadow 0.2s ease, transform 0.2s ease; }
  .game-card:hover { box-shadow: var(--shadow-card); transform: translateY(-2px); }
  .game-card .icon-box { width: 40px; height: 40px; display: grid; place-items: center; margin: 0 auto 10px; color: var(--green); }
  .game-card h3 { margin: 0 0 6px; font-size: 14px; font-weight: 700; color: var(--ink); }
  .game-card a { font-size: 13px; font-weight: 600; color: var(--green); }
  .cta-section { background: white; padding: 0 0 80px; }
  .cta-box { background: var(--green-pale); border: 1.5px solid rgba(59, 183, 65, 0.3); border-radius: var(--r-xl); padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
  .cta-left { display: flex; align-items: center; gap: 32px; flex: 1; }
  .gift-icon { width: 72px; height: 72px; background: var(--green-pale); border: 1.5px solid rgba(59,183,65,0.4); border-radius: var(--r-lg); display: grid; place-items: center; color: var(--green); flex-shrink: 0; }
  .cta-copy h2 { margin: 0; font-size: clamp(18px, 2.4vw, 26px); font-weight: 800; color: var(--ink); max-width: 560px; line-height: 1.2; }
  .cta-checks { display: flex; flex-wrap: wrap; gap: 28px; margin-top: 14px; }
  .cta-check { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: var(--body); }
  .cta-right { text-align: center; flex-shrink: 0; }
  .cta-small { margin-top: 10px; font-size: 13px; color: var(--muted); text-align: center; }
  footer { background: white; border-top: 1px solid var(--line); padding: 64px 0 36px; }
  .footer-row { display: grid; grid-template-columns: 240px repeat(5, minmax(0, 1fr)); gap: 40px; }
  .footer-brand p { margin: 10px 0 0; font-size: 14px; color: var(--body); line-height: 1.55; max-width: 180px; }
  .socials { display: flex; gap: 12px; margin-top: 22px; }
  .socials a { width: 32px; height: 32px; border: 1px solid var(--line); border-radius: 50%; display: grid; place-items: center; color: var(--body); transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
  .socials a:hover { background-color: var(--green); color: white; border-color: var(--green); }
  .footer-group h4 { margin: 0 0 18px; font-size: 13px; font-weight: 700; color: var(--ink); text-transform: uppercase; letter-spacing: 0.06em; }
  .footer-group a { display: block; font-size: 14px; color: var(--body); margin-bottom: 10px; }
  .footer-bottom { margin-top: 48px; border-top: 1px solid var(--line); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
  .footer-bottom .copy { font-size: 13px; color: var(--muted); }
  .lang-pill { border: 1px solid var(--line); border-radius: var(--r-full); padding: 6px 14px; font-size: 13px; color: var(--body); display: inline-flex; align-items: center; gap: 6px; }
  @media (max-width: 1024px) { .feature-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } .games-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); } .footer-row { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (max-width: 768px) { nav { padding: 0 24px; } .wrap { padding: 0 24px; } .nav-links, .login { display: none; } .features-grid, .campaigns-grid, .games-grid { grid-template-columns: 1fr; gap: 32px; } .dashboard-body { flex-direction: column; } .sidebar { display: none; } .stat-grid, .stat-row, .bottom-row { grid-template-columns: 1fr 1fr; } .feature-intro { position: static; } .feature-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .campaigns-arrow { display: none; } .cta-box { flex-direction: column; text-align: center; } .cta-left { flex-direction: column; text-align: center; } .cta-checks { justify-content: center; } .footer-row { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 480px) { .wrap { padding: 0 18px; } nav { padding: 0 18px; } .hero h1 { font-size: clamp(30px, 8vw, 36px); } .hero p { font-size: 15px; } .stat-grid, .stat-row, .bottom-row, .feature-grid, .games-cards, .footer-row { grid-template-columns: 1fr; } .industry-row { gap: 24px; } .campaign-card { width: 200px; } .cta-box { padding: 28px 24px; } }
`;

export default function Home() {
  return (
    <div className="homepage-shell">
      <style>{styles}</style>
      <Navbar />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
              
            </div>
            <h1>Better customer service, <span className="text-primary">Relayed with a tap.</span></h1>
            <p>Effective crowd control, digital ordering, appointments, campaigns and analytics. Relay helps your business serve faster, operate more efficiently and keep customers happy.</p>
            <div className="hero-actions">
              <Link href="/signin" className="btn-primary">Get Started Free</Link>
              <button className="hero-link" type="button">
                <span className="play-btn"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="9,7 17,12 9,17" /></svg></span>
                See how it works
              </button>
            </div>
            <div className="trust-row">
              <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l4 4 10-10" /></svg> Easy setup</div>
              <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l4 4 10-10" /></svg> Free installation</div>
              <div className="trust-item"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l4 4 10-10" /></svg> Compatible with all smartphones</div>
            </div>
          </div>

          <div className="dashboard">
            <div className="dashboard-top">
              <div className="dashboard-brand">
                <div className="mini-mark">
                  <img src="https://i.ibb.co/RTPk7xqp/elay.png" alt="Relay logo" />
                </div>
                Relay
                <span style={{ color: "var(--muted)", marginLeft: 6, fontWeight: 500 }}>Dashboard</span>
              </div>
              <div className="dashboard-meta">
                <span>Aug 24, 2026</span>
                <span className="pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 9h18" /></svg> Calendar</span>
                <span className="pill">All Branches <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg></span>
                <div className="mini-mark" style={{ width: 26, height: 26, borderRadius: "50%", fontSize: 12 }}>A</div>
              </div>
            </div>
            <div className="dashboard-body">
              <div className="sidebar">
                <div className="sidebar-note"></div>
                <div className="nav-item active"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 13h10" /><path d="M7 17h6" /></svg> Overview</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-7 14a7 7 0 0 1 14 0" /></svg> Customers</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 7h12" /><path d="M6 12h12" /><path d="M6 17h8" /></svg> Queues</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 7h14" /><path d="M5 12h14" /><path d="M5 17h14" /></svg> Orders</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M8 11h8" /><path d="M8 15h5" /></svg> Appointments</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16" /><path d="M12 4v16" /></svg> Campaigns</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 19V9" /><path d="M12 19V5" /><path d="M19 19v-7" /></svg> Analytics</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M5 19a7 7 0 0 1 14 0" /></svg> Staff</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16" /><path d="M4 16h16" /><path d="M8 4v16" /><path d="M16 4v16" /></svg> Branches</div>
                <div className="nav-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></svg> Settings</div>
                <div className="sidebar-footer">
                  <div className="sidebar-footer-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 8h10" /><path d="M7 12h10" /><path d="M7 16h6" /></svg> Support</div>
                </div>
              </div>
              <div className="main-panel">
                <div className="stat-grid">
                  <div className="stat-card"><div className="label">Total Customers</div><div className="value">432</div><div className="delta">↑ 16.8% vs yesterday</div></div>
                  <div className="stat-card"><div className="label">In Queue</div><div className="value">27</div><div className="delta">4 Live</div></div>
                  <div className="stat-card"><div className="label">Orders</div><div className="value">132</div><div className="delta">↑ 22.4% vs yesterday</div></div>
                  <div className="stat-card"><div className="label">Appointments</div><div className="value">18</div><div className="delta">↑ 12.1% vs yesterday</div></div>
                </div>
                <div className="stat-row">
                  <div className="stat-card"><div className="label">Revenue</div><div className="value">₦1,245,800</div><div className="delta">↑ 10.8%</div></div>
                  <div className="stat-card"><div className="label">Avg. Wait Time</div><div className="value">18 min</div><div className="delta negative">↓ 0.5%</div></div>
                  <div className="stat-card"><div className="label">Completed</div><div className="value">120</div><div className="delta">↑ 15.3%</div></div>
                  <div className="stat-card"><div className="label">Customer Satisfaction</div><div className="value">4.8/5</div><div className="delta">↑ 0.6%</div></div>
                </div>
                <div className="bottom-row">
                  <div className="panel-card">
                    <div className="panel-head">Live Queue <a href="#">View all</a></div>
                    <div className="queue-row"><span>#23</span><span>2 mins</span><span>2 people</span></div>
                    <div className="queue-row"><span>#24</span><span>5 mins</span><span>4 people</span></div>
                    <div className="queue-row"><span>#25</span><span>7 mins</span><span>2 people</span></div>
                    <div className="queue-row"><span>#26</span><span>10 mins</span><span>3 people</span></div>
                    <div className="queue-row"><span>#27</span><span>12 mins</span><span>2 people</span></div>
                    <button className="queue-btn" type="button">Get in queue</button>
                  </div>
                  <div className="panel-card panel-card--wide">
                    <div className="panel-head">Service Overview (Last 30 minutes) <a href="#">View report</a></div>
                    <div className="service-overview">
                      <svg width="80" height="80" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="34" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                        <circle cx="50" cy="50" r="34" fill="none" stroke="var(--green)" strokeWidth="12" strokeLinecap="round" strokeDasharray="70 213" transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="34" fill="none" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" strokeDasharray="40 243" transform="rotate(18 50 50)" />
                        <circle cx="50" cy="50" r="34" fill="none" stroke="#3B82F6" strokeWidth="12" strokeLinecap="round" strokeDasharray="20 253" transform="rotate(90 50 50)" />
                        <circle cx="50" cy="50" r="34" fill="none" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" strokeDasharray="10 263" transform="rotate(150 50 50)" />
                      </svg>
                      <div className="service-legend">
                        <div className="legend-item"><span><span className="legend-dot green" />Completed</span><strong>18</strong></div>
                        <div className="legend-item"><span><span className="legend-dot amber" />Pending</span><strong>9</strong></div>
                        <div className="legend-item"><span><span className="legend-dot blue" />In Review</span><strong>3</strong></div>
                        <div className="legend-item"><span><span className="legend-dot red" />Escalated</span><strong>2</strong></div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-card">
                    <div className="panel-head">Top Services / Items</div>
                    <div className="service-row"><span style={{ fontSize: 10, color: "var(--muted)" }}>1</span><span>Account Opening</span><span>142</span></div>
                    <div className="service-row"><span style={{ fontSize: 10, color: "var(--muted)" }}>2</span><span>Loan Enquiries</span><span>98</span></div>
                    <div className="service-row"><span style={{ fontSize: 10, color: "var(--muted)" }}>3</span><span>Card Requests</span><span>76</span></div>
                    <div className="service-row"><span style={{ fontSize: 10, color: "var(--muted)" }}>4</span><span>Deposit</span><span>68</span></div>
                    <div className="service-row"><span style={{ fontSize: 10, color: "var(--muted)" }}>5</span><span>Bill Payments</span><span>54</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="industry-section">
        <div className="wrap">
          <div className="industry-head">Trusted by businesses across industries</div>
          <div className="industry-row">
            <div className="industry-item"><div className="icon-box"><i className="hgi hgi-stroke hgi-rounded hgi-bank" /></div><span>Finance</span></div>
            <div className="industry-item"><div className="icon-box"><i className="hgi hgi-stroke hgi-rounded hgi-restaurant-02" /></div><span>Hospitality</span></div>
            <div className="industry-item"><div className="icon-box"><i className="hgi hgi-stroke hgi-rounded hgi-drink" /></div><span>Bars & Clubs</span></div>
            <div className="industry-item"><div className="icon-box"><i className="hgi hgi-stroke hgi-rounded hgi-hospital-02" /></div><span>Healthcare</span></div>
            <div className="industry-item"><div className="icon-box"><i className="hgi hgi-stroke hgi-rounded hgi-office" /></div><span>Government</span></div>
            <div className="industry-item"><div className="icon-box"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 5c1-2 4-2 5 0 1 2 0 4-2 5-2-1-3-3-3-5Z" /><path d="M8 10c0 3 1 5 4 5 3 0 4-2 4-5" /><path d="M8 15c0 2 2 3 4 3s4-1 4-3" /></svg></div><span>Spa & Salon</span></div>
          </div>
          <div className="industry-sub">...and many more</div>
        </div>
      </section>

      <section className="feature-section" id="features">
        <div className="wrap features-grid">
          <div className="feature-intro">
            <div className="eyebrow"></div>
            <h2><span>Everything</span>, one screen.</h2>
            <p>Whether you manage a single location or multiple branches, Relay gives you the tools to deliver exceptional experiences.</p>
          </div>
          <div className="feature-grid">
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 7h14" /><path d="M5 12h8" /><path d="M5 17h10" /></svg></div><h3>Smart Queues</h3><p>Reduce wait times and keep customers informed in real time.</p></div>
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 10h8" /><path d="M8 14h5" /></svg></div><h3>Digital Ordering</h3><p>From menu to payment, give customers a smooth ordering experience.</p></div>
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M4 9h16" /><path d="M8 14h5" /></svg></div><h3>Appointments</h3><p>Let customers book, reschedule and manage appointments easily.</p></div>
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 15l4-4 3 3 7-7" /><path d="M5 20h14" /></svg></div><h3>Campaigns</h3><p>Send promos and engage customers with targeted campaigns.</p></div>
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 18V9" /><path d="M10 18V5" /><path d="M16 18v-7" /><path d="M22 18v-3" /></svg></div><h3>Analytics &amp; Reports</h3><p>Track performance and make data-driven decisions.</p></div>
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="8" r="3" /><path d="M4 18a6 6 0 0 1 12 0" /><path d="M17 8h3" /><path d="M18.5 6.5l2.1 2.1" /><path d="M18.5 9.5l2.1-2.1" /></svg></div><h3>Customer Management</h3><p>Know your customers and build stronger relationships.</p></div>
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 20h8" /><path d="M12 18v2" /></svg></div><h3>Staff Dashboard</h3><p>Empower your team with real-time tools and insights.</p></div>
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="M8 16h5" /></svg></div><h3>Multi-branch Management</h3><p>Manage all your locations from a single dashboard.</p></div>
            <div className="feature-card"><div className="icon-box"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 9h12" /><path d="M8 5h8" /><path d="M7 13h10" /><path d="M9 17h6" /></svg></div><h3>Integrations</h3><p>Works with the tools you already use.</p></div>
          </div>
        </div>
      </section>

      <section className="campaign-section" id="campaigns">
        <div className="wrap campaigns-grid">
          <div className="campaigns-intro">
            <div className="eyebrow"></div>
            <h2>Out of sight, <span style={{ color: "var(--green)" }}>still in mind</span></h2>
            <p>Send messages that bring customers back. Create, schedule and send targeted campaigns the right way — directly to their notifications.</p>
            <a href="#cta" className="btn-primary">Explore campaigns</a>
          </div>
          <div className="campaigns-strip-wrap" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
            <div className="campaigns-strip" style={{ width: "100%", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: 760, background: "transparent", padding: 0, display: "flex", justifyContent: "center" }}>
                <img src="https://i.ibb.co/KjbZKz72/Chat-GPT-Image-Jul-5-2026-11-04-26-PM.png" alt="Campaign" style={{ width: "100%", maxWidth: 760, height: "auto", objectFit: "contain", display: "block", imageRendering: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <Personalization />
      <Proactive />
      <Impression />

      <PricingSection />

      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
