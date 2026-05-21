import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useLang } from '../LanguageContext';
import logo from '../assets/logo.png';

const ROLE_LINKS = (t) => ({
  farmer: [
    { key: 'home',           path: '/home' },
    { key: 'khetrent',       path: '/khetrent' },
    { key: 'warehouse',      path: '/warehouse' },
    { key: 'directSell',     path: '/directsell' },
    { key: 'soilDetection',  path: '/soildetection' },
    { key: 'waterMgmt',      path: '/watermanagement' },
    { key: 'machinery',      path: '/Machinery' },
    { key: 'seeds',          path: '/seeds' },
    { key: 'payAfter',       path: '/payafterharvest' },
    { key: 'advisory',       path: '/personaladvisory' },
    { key: 'transportation', path: '/transportation' },
    { key: 'insurance',      path: '/insurance' },
  ],
  provider: [
    { key: 'home',           path: '/home' },
    { key: 'khetrent',       path: '/khetrent' },
    { key: 'warehouse',      path: '/warehouse' },
    { key: 'machinery',      path: '/Machinery' },
    { key: 'transportation', path: '/transportation' },
  ],
  buyer: [
    { key: 'home',           path: '/home' },
    { key: 'directSell',     path: '/directsell' },
    { key: 'warehouse',      path: '/warehouse' },
    { key: 'transportation', path: '/transportation' },
  ],
});

function Navbar() {
  const navigate   = useNavigate();
  const { lang, toggleLang, t } = useLang();

  const loggedInUser = localStorage.getItem('loggedInUser');
  const userRole     = localStorage.getItem('userRole') || 'farmer';

  const links = (ROLE_LINKS(t)[userRole] || ROLE_LINKS(t).farmer);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* LEFT — logo */}
      <div className="nav-left">
        <Link to="/home" className="nav-logo">
  <img src={logo} alt="App Logo" className="nav-logo-img" />
  <span className="logo-text">{t('appName')}</span>
</Link>
      </div>

      {/* CENTER — flat links */}
      <div className="nav-links">
        {links.map((item) => (
          <Link key={item.path} to={item.path} className="nav-link">
            {t(item.key)}
          </Link>
        ))}
        <Link to="/profile" className="nav-link">{t('profile')}</Link>
      </div>

      {/* RIGHT — lang toggle + user info + logout */}
      <div className="nav-right">
        <button className="lang-toggle" onClick={toggleLang} title="Switch Language">
          {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
        </button>

        {loggedInUser && (
          <span className="nav-username">{t('hi')}, {loggedInUser}</span>
        )}
        {userRole && (
          <span className={`nav-role-badge nav-role-${userRole}`}>{userRole}</span>
        )}
        <div className="nav-profile-circle" onClick={() => navigate('/profile')}>
          <span className="nav-profile-initial">
            {loggedInUser ? loggedInUser.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
        {loggedInUser && (
          <button className="nav-logout-btn" onClick={handleLogout}>
            {t('logout')}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;