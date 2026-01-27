import React, { useEffect, useState } from 'react';
import './Home.css';
import { GiWheat, GiFarmTractor, GiWateringCan, GiTestTubes, GiFarmer } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import { MdAgriculture, MdWarehouse, MdOutlineWaterDrop, MdSupportAgent } from "react-icons/md";
import { FaSeedling, FaTractor, FaTruck, FaShieldAlt, FaCashRegister } from "react-icons/fa";

function Home() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState('');
  const [news, setNews] = useState([]);
  const [newsError, setNewsError] = useState('');
const navigate = useNavigate();

 
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('http://localhost:5000/news/farmer');
        const result = await res.json();
        if (result.success) {
          setNews(result.data);
        } else {
          setNewsError(result.message || 'News fetch karne me problem aa gayi');
        }
      } catch (err) {
        console.error(err);
        setNewsError('News fetch karne me problem aa gayi');
      }
    };

    fetchNews();
  }, []);


  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Browser location support nahi karta');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;

        try {
          const weatherUrl =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}&longitude=${longitude}` +
            `&current_weather=true` +
            `&hourly=precipitation_probability,weathercode` +
            `&daily=temperature_2m_max,precipitation_probability_max,weathercode` +
            `&timezone=auto`;

          const weatherRes = await fetch(weatherUrl);
          const weatherData = await weatherRes.json();

          const temp = weatherData.current_weather.temperature; // °C
          const weatherCode = weatherData.current_weather.weathercode;
          const currentTime = weatherData.current_weather.time;
          const times = weatherData.hourly.time;
          const probs = weatherData.hourly.precipitation_probability;

          const codeToText = (code) => {
            if (code === 0) return 'Clear';
            if ([1, 2, 3].includes(code)) return 'Partly cloudy';
            if ([45, 48].includes(code)) return 'Foggy';
            if ([51, 53, 55].includes(code)) return 'Drizzle';
            if ([61, 63, 65].includes(code)) return 'Rainy';
            if ([71, 73, 75].includes(code)) return 'Snowy';
            if ([80, 81, 82].includes(code)) return 'Showers';
            if ([95, 96, 99].includes(code)) return 'Thunderstorm';
            return 'Unknown';
          };

          const weatherText = codeToText(weatherCode);

          
          const idx = times.indexOf(currentTime);
          let rainChanceNext3h = null;
          if (idx !== -1) {
            const next3 = probs.slice(idx + 1, idx + 4);
            if (next3.length) {
              rainChanceNext3h = Math.max(...next3);
            }
          }

       
          const dailyTemps = weatherData.daily.temperature_2m_max;
          const dailyRain = weatherData.daily.precipitation_probability_max;
          const dailyCodes = weatherData.daily.weathercode;

          let tomorrow = null;
          let dayAfter = null;

          if (dailyTemps && dailyTemps.length > 1) {
            tomorrow = {
              temp: dailyTemps[1],
              rain: dailyRain[1],
              text: codeToText(dailyCodes[1]),
            };
          }

          if (dailyTemps && dailyTemps.length > 2) {
            dayAfter = {
              temp: dailyTemps[2],
              rain: dailyRain[2],
              text: codeToText(dailyCodes[2]),
            };
          }

         
          let placeName = 'Your area';
          try {
            const placeUrl =
              `https://nominatim.openstreetmap.org/reverse` +
              `?format=jsonv2&lat=${latitude}&lon=${longitude}`;

            const placeRes = await fetch(placeUrl, {
              headers: {
                Accept: 'application/json',
              },
            });

            if (placeRes.ok) {
              const placeData = await placeRes.json();
              const addr = placeData.address || {};
              placeName =
                addr.village ||
                addr.town ||
                addr.city ||
                addr.hamlet ||
                addr.county ||
                placeData.display_name ||
                'Your area';
            }
          } catch (e) {
            console.log('Place fetch error (ignored):', e);
          }

          setWeatherInfo({
            placeName,
            temperature: temp,
            weatherText,
            rainChanceNext3h,
            tomorrow,
            dayAfter,
          });
        } catch (err) {
          console.error(err);
          setError('Weather fetch karne me problem aa gayi');
        }
      },
      () => setError('Location access deny kar di aapne')
    );
  }, []);

  return (
    <div className="home-page">

      <div className="weather-box">
        {error && <p>{error}</p>}

        {!error && !weatherInfo && <p>Loading weather...</p>}

        {weatherInfo && (
          <>
            <p><strong>📍 Location:</strong> {weatherInfo.placeName}</p>
            <p><strong>🌡️ Temperature:</strong> {weatherInfo.temperature}°C</p>
            <p><strong>⛈️ Weather:</strong> {weatherInfo.weatherText}</p>

            {weatherInfo.rainChanceNext3h !== null && (
              <p>
                <strong>🌧️ Rain Chances:</strong> {weatherInfo.rainChanceNext3h}% (Next 3 hours)
              </p>
            )}

            {weatherInfo.tomorrow && (
              <p>
                <strong>📅 tomorrow:</strong>{' '}
                {weatherInfo.tomorrow.temp}°C | {weatherInfo.tomorrow.text} | Rain: {weatherInfo.tomorrow.rain}%
              </p>
            )}

            {weatherInfo.dayAfter && (
              <p>
                <strong>📅 Day After Tomorrow:</strong>{' '}
                {weatherInfo.dayAfter.temp}°C | {weatherInfo.dayAfter.text} | Rain: {weatherInfo.dayAfter.rain}%
              </p>
            )}
          </>
        )}
      </div>

      {/* NEWS SECTION */}
      <div className="news-section">
        <h3>📰 Fresh News</h3>

        {newsError && (
          <p style={{ fontSize: '13px', color: 'red' }}>{newsError}</p>
        )}

        {!newsError && news.length === 0 && (
          <p style={{ fontSize: '13px' }}>Loading…</p>
        )}

        <div className="news-grid">
          {news.map((n, idx) => (
            <div key={idx} className="news-card">
              <h4>{n.title}</h4>
              {n.pubDate && (
                <p className="news-date">
                  {new Date(n.pubDate).toLocaleDateString()}
                </p>
              )}
              {n.description && (
                <p className="news-desc">{n.description}</p>
              )}
              <a
                href={n.link}
                target="_blank"
                rel="noreferrer"
                className="news-link"
              >
                More.. →
              </a>
            </div>
          ))}
        </div>
      </div>
    
      <div className="circle-container">

  <div className="circle-item" onClick={() => navigate('/seeds')}>
    <div className="circle-icon">
      <FaSeedling size={30} color="#166534" />
    </div>
    <p>Seeds</p>
  </div>

  <div className="circle-item" onClick={() => navigate('/machinery')}>
    <div className="circle-icon">
      <FaTractor size={30} color="#166534" />
    </div>
    <p>Machinery</p>
  </div>

 <div className="circle-item" onClick={() => navigate('/watermanagement')}>
  <div className="circle-icon">
    <GiWateringCan size={30} color="#166534" />
  </div>
  <p>Water</p>
</div>


  <div className="circle-item" onClick={() => navigate('/soildetection')}>
    <div className="circle-icon">
      <GiTestTubes size={30} color="#166534" />
    </div>
    <p>Soil Test</p>
  </div>

  <div className="circle-item" onClick={() => navigate('/khetrent')}>
    <div className="circle-icon">
      <MdAgriculture size={30} color="#166534" />
    </div>
    <p>Khetrent</p>
  </div>

  <div className="circle-item" onClick={() => navigate('/warehouse')}>
    <div className="circle-icon">
      <MdWarehouse size={30} color="#166534" />
    </div>
    <p>Warehouse</p>
  </div>

  <div className="circle-item" onClick={() => navigate('/insurance')}>
    <div className="circle-icon">
      <FaShieldAlt size={30} color="#166534" />
    </div>
    <p>Insurance</p>
  </div>

  <div className="circle-item" onClick={() => navigate('/transportation')}>
    <div className="circle-icon">
      <FaTruck size={30} color="#166534" />
    </div>
    <p>Transport</p>
  </div>

  <div className="circle-item" onClick={() => navigate('/personaladvisory')}>
    <div className="circle-icon">
      <MdSupportAgent size={30} color="#166534" />
    </div>
    <p>Advisory</p>
  </div>

  <div className="circle-item" onClick={() => navigate('/payafterharvest')}>
    <div className="circle-icon">
      <FaCashRegister size={30} color="#166534" />
    </div>
    <p>Pay After</p>
  </div>

</div>


      <div className="home-content">
      
      </div>
    </div>
  );
}

export default Home;

