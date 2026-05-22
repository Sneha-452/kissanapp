import React, { useEffect, useState } from 'react';
import './Home.css';
import { GiWheat, GiFarmTractor, GiWateringCan, GiTestTubes } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { MdAgriculture, MdWarehouse, MdSupportAgent } from "react-icons/md";
import { FaSeedling, FaTractor, FaTruck, FaShieldAlt, FaCashRegister, FaPlusCircle } from "react-icons/fa";
import { useLang } from '../LanguageContext';

/* ── Role-based quick-access config ── */
const FARMER_TILES = (t) => [
  { icon: <FaSeedling   size={28} color="#166534" />, label: t('seeds'),          path: '/seeds' },
  { icon: <FaTractor    size={28} color="#166534" />, label: t('machineryLabel'), path: '/Machinery' },
  { icon: <GiWateringCan size={28} color="#166534" />, label: t('waterLabel'),   path: '/watermanagement' },
  { icon: <GiTestTubes  size={28} color="#166534" />, label: t('soilTest'),      path: '/book-soil-test' },
  { icon: <MdAgriculture size={28} color="#166534" />, label: t('khetrentLabel'),path: '/khetrent' },
  { icon: <MdWarehouse  size={28} color="#166534" />, label: t('warehouseLabel'),path: '/warehouse' },
  { icon: <FaShieldAlt  size={28} color="#166534" />, label: t('insuranceLabel'),path: '/insurance' },
  { icon: <FaTruck      size={28} color="#166534" />, label: t('transportLabel'),path: '/transportation' },
  { icon: <MdSupportAgent size={28} color="#166534" />, label: t('advisoryLabel'),path: '/personaladvisory' },
  // { icon: <FaCashRegister size={28} color="#166534" />, label: t('payAfterLabel'),path: '/payafterharvest' },
];

const PROVIDER_TILES = (t) => [
  { icon: <FaPlusCircle size={28} color="#1a3a5c" />, label: t('addLand'),       path: '/khetrent/add' },
  { icon: <MdAgriculture size={28} color="#1a3a5c" />, label: t('khetrentLabel'),path: '/khetrent' },
  { icon: <MdWarehouse  size={28} color="#1a3a5c" />, label: t('addWarehouse'),  path: '/add-warehouse' },
  { icon: <FaTractor    size={28} color="#1a3a5c" />, label: t('addMachinery'),  path: '/add-machinery' },
  { icon: <FaTruck      size={28} color="#1a3a5c" />, label: t('addTransport'),  path: '/add-transportation' },
  { icon: <MdWarehouse  size={28} color="#1a3a5c" />, label: t('warehouseLabel'),path: '/warehouse' },
];

const BUYER_TILES = (t) => [
  { icon: <GiWheat      size={28} color="#5c2d1a" />, label: t('buyCrops'),      path: '/directsell' },
  { icon: <MdWarehouse  size={28} color="#5c2d1a" />, label: t('warehouseLabel'),path: '/warehouse' },
  { icon: <FaTruck      size={28} color="#5c2d1a" />, label: t('transportLabel'),path: '/transportation' },
];

const ROLE_TILES = { farmer: FARMER_TILES, provider: PROVIDER_TILES, buyer: BUYER_TILES };

const ROLE_GRADIENT = {
  farmer:   'linear-gradient(145deg, #a8edbb 0%, #c8f5d5 25%, #e0faf0 55%, #b7f0ce 100%)',
  provider: 'linear-gradient(145deg, #a8edbb 0%, #c8f5d5 25%, #e0faf0 55%, #b7f0ce 100%)',
  buyer:    'linear-gradient(145deg, #a8edbb 0%, #c8f5d5 25%, #e0faf0 55%, #b7f0ce 100%)',
};

function Home() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [weatherError, setWeatherError] = useState('');
  const [news, setNews] = useState([]);
  const [newsError, setNewsError] = useState('');
  const navigate  = useNavigate();
  const { t }     = useLang();

  const userRole     = localStorage.getItem('userRole') || 'farmer';
  const loggedInUser = localStorage.getItem('loggedInUser') || '';

  const welcomeKey  = `${userRole}Welcome`;
  const subtitleKey = `${userRole}Subtitle`;
  const tipKey      = `${userRole}Tip`;
  const tiles       = (ROLE_TILES[userRole] || ROLE_TILES.farmer)(t);

  /* ── News ── */
  useEffect(() => {
    (async () => {
      try {
        const res    = await fetch('http://localhost:5000/news/farmer');
        const result = await res.json();
        if (result.success) setNews(result.data);
        else setNewsError(result.message || 'News load failed');
      } catch { setNewsError('News load failed'); }
    })();
  }, []);

  /* ── Weather ── */
  useEffect(() => {
    if (!navigator.geolocation) { setWeatherError('Location not supported'); return; }

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&current_weather=true&hourly=precipitation_probability,weathercode` +
            `&daily=temperature_2m_max,precipitation_probability_max,weathercode&timezone=auto`;

          const weatherData = await (await fetch(weatherUrl)).json();
          const temp        = weatherData.current_weather.temperature;
          const code        = weatherData.current_weather.weathercode;
          const currentTime = weatherData.current_weather.time;
          const times       = weatherData.hourly.time;
          const probs       = weatherData.hourly.precipitation_probability;

          const codeToText = (c) => {
            if (c === 0) return 'Clear';
            if ([1,2,3].includes(c)) return 'Partly cloudy';
            if ([45,48].includes(c)) return 'Foggy';
            if ([51,53,55].includes(c)) return 'Drizzle';
            if ([61,63,65].includes(c)) return 'Rainy';
            if ([71,73,75].includes(c)) return 'Snowy';
            if ([80,81,82].includes(c)) return 'Showers';
            if ([95,96,99].includes(c)) return 'Thunderstorm';
            return 'Unknown';
          };

          const idx = times.indexOf(currentTime);
          const next3 = idx !== -1 ? probs.slice(idx + 1, idx + 4) : [];
          const rainChanceNext3h = next3.length ? Math.max(...next3) : null;

          const dailyTemps = weatherData.daily.temperature_2m_max;
          const dailyRain  = weatherData.daily.precipitation_probability_max;
          const dailyCodes = weatherData.daily.weathercode;

          let placeName = 'Your area';
          try {
            const placeData = await (await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
              { headers: { Accept: 'application/json' } }
            )).json();
            const a = placeData.address || {};
            placeName = a.village || a.town || a.city || a.hamlet || a.county || placeData.display_name || 'Your area';
          } catch {}

          setWeatherInfo({
            placeName, temperature: temp, weatherText: codeToText(code), rainChanceNext3h,
            tomorrow: dailyTemps?.[1] ? { temp: dailyTemps[1], rain: dailyRain[1], text: codeToText(dailyCodes[1]) } : null,
            dayAfter: dailyTemps?.[2] ? { temp: dailyTemps[2], rain: dailyRain[2], text: codeToText(dailyCodes[2]) } : null,
          });
        } catch { setWeatherError('Weather load failed'); }
      },
      () => setWeatherError('Location access denied')
    );
  }, []);

  return (
    <div className="home-page" style={{ background: ROLE_GRADIENT[userRole] }}>
      <div className="home-content">

      {/* ── Role welcome banner ── */}
      <div className="role-banner">
        <h2 className="role-welcome">{t(welcomeKey)}</h2>
        <p className="role-subtitle">{t(subtitleKey)}</p>
      </div>

      {/* ── Quick-access tiles ── */}
      <div className="section-card">
        <h3 className="section-title">⚡ {t('quickAccess')}</h3>
        <div className="circle-container">
          {tiles.map((tile) => (
            <div key={tile.path} className="circle-item" onClick={() => navigate(tile.path)}>
              <div className="circle-icon">{tile.icon}</div>
              <p>{tile.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tip of the day ── */}
      <div className="tip-card">
        <span className="tip-icon">💡</span>
        <div>
          <strong>{t('tipTitle')}</strong>
          <p>{t(tipKey)}</p>
        </div>
      </div>

      {/* ── Weather ── */}
      <div className="weather-box">
        {weatherError && <p>{weatherError}</p>}
        {!weatherError && !weatherInfo && <p>{t('loadingWeather')}</p>}
        {weatherInfo && (
          <>
            <p><strong>📍 {t('location')}:</strong> {weatherInfo.placeName}</p>
            <p><strong>🌡️ {t('temperature')}:</strong> {weatherInfo.temperature}°C</p>
            <p><strong>⛅ {t('weather')}:</strong> {weatherInfo.weatherText}</p>
            {weatherInfo.rainChanceNext3h !== null && (
              <p><strong>🌧️ {t('rainChances')}:</strong> {weatherInfo.rainChanceNext3h}% ({t('next3h')})</p>
            )}
            {weatherInfo.tomorrow && (
              <p><strong>📅 {t('tomorrow')}:</strong> {weatherInfo.tomorrow.temp}°C | {weatherInfo.tomorrow.text} | {t('rain')}: {weatherInfo.tomorrow.rain}%</p>
            )}
            {weatherInfo.dayAfter && (
              <p><strong>📅 {t('dayAfter')}:</strong> {weatherInfo.dayAfter.temp}°C | {weatherInfo.dayAfter.text} | {t('rain')}: {weatherInfo.dayAfter.rain}%</p>
            )}
          </>
        )}
      </div>

      {/* ── News ── */}
      <div className="news-section">
        <h3>📰 {t('freshNews')}</h3>
        {newsError && <p style={{ fontSize: '13px', color: 'red' }}>{newsError}</p>}
        {!newsError && news.length === 0 && <p style={{ fontSize: '13px' }}>{t('loadingNews')}</p>}
        <div className="news-grid">
          {news.map((n, idx) => (
            <div key={idx} className="news-card">
              <h4>{n.title}</h4>
              {n.pubDate && <p className="news-date">{new Date(n.pubDate).toLocaleDateString()}</p>}
              {n.description && <p className="news-desc">{n.description}</p>}
              <a href={n.link} target="_blank" rel="noreferrer" className="news-link">{t('moreLink')}</a>
            </div>
          ))}
        </div>
      </div>

      </div>
    </div>
  );
}

export default Home;
