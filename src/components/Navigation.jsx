import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_SECTIONS = [
  { type: 'link', to: '/', label: 'Dashboard', icon: String.fromCharCode(0xD83D, 0xDCCA) },
  { type: 'link', to: '/my-predictions', label: 'My Predictions', icon: String.fromCharCode(0xD83D, 0xDCCB) },
  { type: 'link', to: '/leaderboard', label: 'Leaderboard', icon: String.fromCharCode(0xD83C, 0xDFC6) },
  { type: 'link', to: '/leagues', label: 'Leagues', icon: String.fromCharCode(0xD83E, 0xDD1D) },
  { type: 'header', label: 'FIFA World Cup 2026' },
  { type: 'link', to: '/matches', label: 'Matches', icon: String.fromCharCode(0x26BD) },
  { type: 'link', to: '/teams', label: 'Teams', icon: String.fromCharCode(0xD83C, 0xDFF4) },
  { type: 'link', to: '/groups', label: 'Groups', icon: String.fromCharCode(0xD83C, 0xDFE6) },
  { type: 'header', label: 'Settings' },
  { type: 'link', to: '/rules', label: 'Rules', icon: String.fromCharCode(0xD83D, 0xDCD6) },
  { type: 'link', to: '/profile', label: 'My Profile', icon: String.fromCharCode(0xD83D, 0xDC64) },
];

export default function Navigation({ onLogout, user }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
      <nav className={`sidebar${sidebarCollapsed ? ' sidebar--collapsed' : ''}`}>
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">{String.fromCharCode(0xD83C, 0xDFC6)}</span>
        <span className="sidebar-brand-text">FWC26</span>
        <button type="button" className="sidebar-toggle" onClick={() => setSidebarCollapsed((c) => !c)}>
          {String.fromCharCode(0x2630)}
        </button>
      </div>
      <div className="sidebar-links">
        {NAV_SECTIONS.map((item, idx) => {
          if (item.type === 'header') {
            return <div key={'h' + idx} className="sidebar-section-header">{item.label}</div>;
          }
          const activeClass = ({ isActive }) => 'sidebar-link' + (isActive ? ' is-active' : '');
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={activeClass}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span className="sidebar-link-label">{item.label}</span>
            </NavLink>
          );
        })}
        <div className="sidebar-spacer" />
        <button type="button" className="sidebar-logout" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
