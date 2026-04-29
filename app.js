// ── CONFIG ────────────────────────────────────────────
// Free API key — get your own at openweathermap.org
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const BASE    = 'https://api.openweathermap.org/data/2.5';

// ── WEATHER ICON MAP ──────────────────────────────────
const iconMap = {
  '01d':'☀️','01n':'🌙','02d':'⛅','02n':'🌤️',
  '03d':'☁️','03n':'☁️','04d':'☁️','04n':'☁️',
  '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌧️',
  '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️',
  '50d':'🌫️','50n':'🌫️'
};

function getIcon(code) {
  return iconMap[code] || '🌡️';
}

// ── SPAWN BACKGROUND PARTICLES ────────────────────────
function spawnParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 18; i++) {
    const p    = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${Math.random() * 0.4 + 0.1};
    `;
    container.appendChild(p);
  }
}

// ── LIVE DATE/TIME ────────────────────────────────────
function updateTime() {
  const now = new Date();
  document.getElementById('datetime').textContent =
    now.toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric',
      month: 'long', year: 'numeric'
    });
}

// ── LOADER HELPERS ────────────────────────────────────
function showLoader(v)  { document.getElementById('loader').classList.toggle('show', v); }
function showError()    { document.getElementById('errorMsg').classList.add('show'); }
function hideError()    { document.getElementById('errorMsg').classList.remove('show'); }
function clearContent() { document.getElementById('weatherContent').innerHTML = ''; }

function showPlaceholder() {
  document.getElementById('weatherContent').innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🌍</div>
      <h2>Search any city to begin</h2>
      <p>Get real-time weather, forecasts & more</p>
    </div>`;
}

// ── MAIN FETCH ────────────────────────────────────────
async function fetchWeather() {
  const city = document.getElementById('searchInput').value.trim();
  if (!city) return;

  showLoader(true);
  hideError();
  clearContent();

  try {
    const [current, forecast] = await Promise.all([
      fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`).then(r => r.json()),
      fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`).then(r => r.json())
    ]);

    if (current.cod !== 200) throw new Error(current.message);

    showLoader(false);
    renderWeather(current, forecast);

  } catch (err) {
    showLoader(false);
    showError();
    showPlaceholder();
  }
}

// ── RENDER WEATHER UI ─────────────────────────────────
function renderWeather(c, f) {
  const icon       = getIcon(c.weather[0].icon);
  const sunrise    = formatTime(c.sys.sunrise);
  const sunset     = formatTime(c.sys.sunset);
  const humidity   = c.main.humidity;
  const wind       = c.wind.speed;
  const visibility = (c.visibility / 1000).toFixed(1);
  const pressure   = c.main.pressure;
  const daily      = processForecast(f.list);

  document.getElementById('weatherContent').innerHTML = `
    <!-- Main 2-col card -->
    <div class="main-card reveal" style="animation-delay:0s">
      <div class="card">
        <span class="weather-icon-big">${icon}</span>
        <div class="city-name">
          ${c.name}
          <span class="country-tag">${c.sys.country}</span>
        </div>
        <div class="weather-desc">${c.weather[0].description}</div>
        <div class="temp-display">${Math.round(c.main.temp)}<sup>°C</sup></div>
        <div class="feels-like">
          Feels like ${Math.round(c.main.feels_like)}°C &nbsp;·&nbsp;
          High ${Math.round(c.main.temp_max)}° &nbsp;/&nbsp; Low ${Math.round(c.main.temp_min)}°
        </div>
      </div>

      <div class="card">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">💧</div>
            <div class="stat-label">Humidity</div>
            <div class="stat-value">${humidity}%</div>
            <div class="prog-bar"><div class="prog-fill" data-w="${humidity}"></div></div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">💨</div>
            <div class="stat-label">Wind Speed</div>
            <div class="stat-value">${wind} m/s</div>
            <div class="prog-bar"><div class="prog-fill" data-w="${Math.min(wind * 5, 100)}"></div></div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">👁️</div>
            <div class="stat-label">Visibility</div>
            <div class="stat-value">${visibility} km</div>
            <div class="prog-bar"><div class="prog-fill" data-w="${Math.min(visibility * 10, 100)}"></div></div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🔵</div>
            <div class="stat-label">Pressure</div>
            <div class="stat-value">${pressure} hPa</div>
            <div class="prog-bar"><div class="prog-fill" data-w="${Math.min((pressure - 950) / 60 * 100, 100)}"></div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sun times + Clouds row -->
    <div class="bottom-row reveal" style="animation-delay:0.15s">
      <div class="card">
        <div class="forecast-title">🌅 Sun Times</div>
        <div class="sun-row">
          <div class="sun-item">
            <div class="sun-icon">🌄</div>
            <div class="sun-label">Sunrise</div>
            <div class="sun-time">${sunrise}</div>
          </div>
          <div style="width:1px;background:var(--card-border);margin:0 8px;"></div>
          <div class="sun-item">
            <div class="sun-icon">🌇</div>
            <div class="sun-label">Sunset</div>
            <div class="sun-time">${sunset}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="forecast-title">🌡️ Air & Clouds</div>
        <div class="stats-grid" style="grid-template-columns:1fr 1fr; gap:12px;">
          <div class="stat-item">
            <div class="stat-icon">☁️</div>
            <div class="stat-label">Cloud Cover</div>
            <div class="stat-value">${c.clouds.all}%</div>
            <div class="prog-bar"><div class="prog-fill" data-w="${c.clouds.all}"></div></div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🌡️</div>
            <div class="stat-label">Dew Point</div>
            <div class="stat-value">${dewPoint(c.main.temp, humidity)}°C</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5-Day Forecast -->
    <div class="card reveal" style="animation-delay:0.3s">
      <div class="forecast-title">📅 5-Day Forecast</div>
      <div class="forecast-row">
        ${daily.map(d => `
          <div class="forecast-item">
            <div class="forecast-day">${d.day}</div>
            <div class="forecast-icon">${getIcon(d.icon)}</div>
            <div class="forecast-high">${Math.round(d.high)}°</div>
            <div class="forecast-low">${Math.round(d.low)}°</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Animate progress bars after DOM paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('.prog-fill').forEach(el => {
        el.style.width = el.dataset.w + '%';
      });
    }, 200);
  });
}

// ── HELPER: Format Unix timestamp ─────────────────────
function formatTime(unix) {
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true
  });
}

// ── HELPER: Dew point formula ─────────────────────────
function dewPoint(temp, humidity) {
  const a = 17.27, b = 237.7;
  const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
  return Math.round((b * alpha) / (a - alpha));
}

// ── HELPER: Process 5-day forecast list ───────────────
function processForecast(list) {
  const days     = {};
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const key  = date.toDateString();
    if (!days[key]) {
      days[key] = {
        day:  dayNames[date.getDay()],
        high: item.main.temp_max,
        low:  item.main.temp_min,
        icon: item.weather[0].icon
      };
    } else {
      days[key].high = Math.max(days[key].high, item.main.temp_max);
      days[key].low  = Math.min(days[key].low,  item.main.temp_min);
    }
  });

  return Object.values(days).slice(0, 5);
}

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  spawnParticles();
  updateTime();
  setInterval(updateTime, 60000);

  // Search on Enter key
  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') fetchWeather();
  });
});
