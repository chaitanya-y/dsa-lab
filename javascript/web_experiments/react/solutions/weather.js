import React, { useState } from "react";

const mockWeatherData = {
  "New York": {
    temperature: "22°C",
    humidity: "56%",
    windSpeed: "15 km/h",
  },
  "Los Angeles": {
    temperature: "27°C",
    humidity: "45%",
    windSpeed: "10 km/h",
  },
  London: {
    temperature: "15°C",
    humidity: "70%",
    windSpeed: "20 km/h",
  },
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    background: "#f4f6fb",
  },
  card: {
    width: "100%",
    maxWidth: "520px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },
  heading: {
    margin: "0 0 16px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  resultBox: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "16px",
    background: "#fafafa",
    marginTop: "12px",
  },
  row: {
    marginBottom: "8px",
  },
  error: {
    color: "#b91c1c",
    marginTop: "12px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "16px",
  },
  chip: {
    padding: "8px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "999px",
    background: "#fff",
    cursor: "pointer",
  },
  subHeading: {
    marginTop: "20px",
    marginBottom: "8px",
    fontWeight: 600,
  },
};

const emptyWeather = {
  city: "",
  temperature: "",
  humidity: "",
  windSpeed: "",
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(emptyWeather);
  const [cache, setCache] = useState({});
  const [previousSearches, setPreviousSearches] = useState([]);
  const [error, setError] = useState("");

  const fetchWeather = (cityName) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = mockWeatherData[cityName];
        if (data) {
          resolve(data);
        } else {
          reject(new Error("City not found"));
        }
      }, 300);
    });
  };

  const addPreviousSearch = (cityName) => {
    setPreviousSearches((prev) => {
      if (prev.includes(cityName)) return prev;
      return [...prev, cityName];
    });
  };

  const searchCity = async (cityName) => {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      setWeather(emptyWeather);
      return;
    }

    setError("");

    if (cache[trimmedCity]) {
      setWeather({
        city: trimmedCity,
        ...cache[trimmedCity],
      });
      addPreviousSearch(trimmedCity);
      return;
    }

    try {
      const data = await fetchWeather(trimmedCity);

      setCache((prev) => ({
        ...prev,
        [trimmedCity]: data,
      }));

      setWeather({
        city: trimmedCity,
        ...data,
      });

      addPreviousSearch(trimmedCity);
    } catch {
      setError("City not found.");
      setWeather(emptyWeather);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchCity(city);
  };

  const hasWeather = Boolean(weather.city);

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.heading}>Weather Dashboard</h1>

        <form onSubmit={handleSubmit} style={styles.form} aria-label="Weather search form">
          <input
            id="city-search"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Search for a city"
            style={styles.input}
            aria-label="Search for a city"
          />
          <button type="submit" style={styles.button}>
            Search
          </button>
        </form>

        <div aria-live="polite">
          {error && <p style={styles.error}>{error}</p>}

          {hasWeather && !error && (
            <div style={styles.resultBox}>
              <div style={styles.row}>
                <strong>City:</strong> {weather.city}
              </div>
              <div style={styles.row}>
                <strong>Temperature:</strong> {weather.temperature}
              </div>
              <div style={styles.row}>
                <strong>Humidity:</strong> {weather.humidity}
              </div>
              <div>
                <strong>Wind Speed:</strong> {weather.windSpeed}
              </div>
            </div>
          )}
        </div>

        {previousSearches.length > 0 && (
          <>
            <div style={styles.subHeading}>Previous Searches</div>
            <div style={styles.chips}>
              {previousSearches.map((searchedCity) => (
                <button
                  key={searchedCity}
                  type="button"
                  style={styles.chip}
                  onClick={() => {
                    setCity(searchedCity);
                    searchCity(searchedCity);
                  }}
                >
                  {searchedCity}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;