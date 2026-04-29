# 🌤️ SkyView — Weather Dashboard

A real-time weather dashboard built with pure **HTML, CSS & JavaScript** using the OpenWeatherMap API. Search any city in the world and get live weather data, forecasts, and more.

![SkyView Preview](screenshot.png)

---

## 🔗 Live Demo

👉 **[View Live Project](https://YOUR-USERNAME.github.io/skyview-weather-dashboard)**

> Replace the link above with your actual GitHub Pages URL after deployment.

---

## ✨ Features

- 🔍 **City Search** — Search any city worldwide
- 🌡️ **Current Weather** — Temperature, feels like, high/low
- 💧 **Stats** — Humidity, Wind Speed, Visibility, Pressure
- 📅 **5-Day Forecast** — Daily high/low with weather icons
- 🌅 **Sun Times** — Sunrise and Sunset timings
- ☁️ **Air & Clouds** — Cloud cover and Dew point
- ⚡ **Parallel API Calls** — Using `Promise.all()` for performance
- 🎨 **Animations** — Aurora background, floating particles, card reveals
- 📱 **Fully Responsive** — Works on mobile and desktop
- ✅ **Error Handling** — User-friendly messages for invalid searches

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, animations, responsive design |
| JavaScript (ES6+) | Logic, API calls, DOM manipulation |
| OpenWeatherMap API | Live weather data |
| CSS Grid | Layout |
| Fetch API | HTTP requests |
| async/await | Asynchronous operations |

---

## 📁 Project Structure

```
skyview-weather-dashboard/
│
├── index.html       → HTML structure only
├── style.css        → All styling & animations
├── app.js           → All JavaScript logic
└── README.md        → Project documentation
```

> Separation of Concerns followed — HTML, CSS, JS in separate files.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/skyview-weather-dashboard.git
```

### 2. Open the project
```bash
cd skyview-weather-dashboard
```

### 3. Get a free API key
- Go to [openweathermap.org](https://openweathermap.org/api)
- Create a free account
- Copy your API key

### 4. Add your API key
Open `app.js` and replace on line 3:
```js
const API_KEY = 'YOUR_API_KEY_HERE';
```

### 5. Run the project
Just open `index.html` in your browser — no server needed!

---

## 📸 Screenshots

> Add your screenshots here after taking them.

| Desktop View | Mobile View |
|---|---|
| ![Desktop](screenshots/desktop.png) | ![Mobile](screenshots/mobile.png) |

---

## 🔑 Key Concepts Used

- **REST API Integration** — Fetching live data from OpenWeatherMap
- **Promise.all()** — Both API calls fire simultaneously for better performance
- **async/await** — Clean asynchronous code
- **DOM Manipulation** — Dynamically rendering weather cards
- **Error Handling** — try/catch for network and API errors
- **CSS Animations** — keyframes, transitions, transforms
- **CSS Variables** — Consistent theming throughout
- **Responsive Design** — CSS Grid + media queries
- **localStorage** *(coming soon)* — Search history persistence

---

## ⚠️ Important Note

> The API key in this project is currently stored in the frontend JS file.  
> In a production application, the API key should be stored in a **backend server**  
> using environment variables (`.env`) so it is not exposed to the browser.

---

## 🔮 Future Improvements

- [ ] Search history using localStorage
- [ ] °C / °F unit toggle
- [ ] Debouncing on search input
- [ ] Current location weather (Geolocation API)
- [ ] Temperature trend chart (Chart.js)
- [ ] Favourite cities feature
- [ ] Dark / Light mode toggle
- [ ] Node.js + Express backend for secure API key
- [ ] PWA support (offline mode)

---

## 👨‍💻 Author

**Your Name**  
📧 your.email@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)  
🐙 [GitHub](https://github.com/YOUR-USERNAME)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **If you found this project helpful, please give it a star!**
