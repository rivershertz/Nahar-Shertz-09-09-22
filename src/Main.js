import { useEffect, useState } from "react";
import { api } from "./api";
import { FiHeart } from "react-icons/fi";
import Card from "./Card";
import { useFavorites, useFavoritesUpdate } from "./contexts/FavoritesContext";
import weatherPic from "./images/Weather_Isometric.png";

function Weather() {
  const [location, setLocation] = useState("");
  const [autocompleteResponse, setAutocompleteResponse] = useState([]);
  const [farecastData, setForecastData] = useState([]);
  const [weatherText, setWeatherText] = useState("");
  const [weatherMetric, setWeatherMetric] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const localFavorites = JSON.parse(localStorage.getItem("favorites"));
  const favorites = useFavorites();
  const updateFavorites = useFavoritesUpdate();

  useEffect(() => {
    const telAvivKey = 215854;
    api
      .getForecast(telAvivKey)
      .then((res) => {
        setForecastData(res.DailyForecasts);
      })
      .catch((err) => console.log(err));

    api
      .getCurrentWeather(telAvivKey)
      .then((res) => {
        setWeatherText(res[0].WeatherText);
        setWeatherMetric(res[0].Temperature.Metric.Value);
        setLocation("Tel Aviv");
      })
      .catch((err) => console.log(err));

    updateFavorites(localFavorites);
  }, []);

  const onSearchChange = (e) => {
    setLocation(e.target.value);
    if (location) {
      api
        .getAutocomlete(location)
        .then((res) => {
          setAutocompleteResponse(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const onSearch = (searchTerm, locationKey) => {
    setLocation(searchTerm);

    api
      .getCurrentWeather(locationKey)
      .then((res) => {
        setWeatherText(res[0].WeatherText);
        setWeatherMetric(res[0].Temperature.Metric.Value);
      })
      .catch((err) => console.log(err));

    api
      .getForecast(locationKey)
      .then((res) => {
        setForecastData(res.DailyForecasts);
      })
      .catch((err) => console.log(err));
  };

  const AddFavortieButton = ({ icon }) => (
    <button
      className={`absolute top-4 right-6 rounded-full hover:opacity-75`}
      onClick={() => {
        onAddFavortieClick(location, weatherText, weatherMetric);
      }}
    >
      {icon}
    </button>
  );

  const onAddFavortieClick = (location, weatherText, weatherMetric) => {
    if (!location) return;
    if (isFavorite) {
      updateFavorites(
        favorites.filter((favorite) => favorite.name !== location)
      );
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
      const newFavorite = {
        ID: Math.round(Math.random() * 1000),
        name: location,
        currentWeather: { text: weatherText, temperature: weatherMetric },
      };
      updateFavorites([newFavorite, ...favorites]);
    }
  };

  useEffect(() => {
    setIsFavorite(favorites.some((favorite) => favorite.name === location));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [location, favorites]);

  return (
    <div className="w-full border-box">
      <div>
        <div className="sm:w-3/4 md:w-3/5 mx-auto mt-14">
          <h1 className="text-6xl mx-auto text-center">
            So...
            <br /> How's the Weather?
          </h1>
          <p className="text-2xl text-center mt-10">
            The ultimate website that provides <u>percise</u> weather to talk
            about when you got nothing else to talk about
          </p>
        </div>

        <div className="h-8 border-box sm:w-3/4 md:w-3/5 mx-auto mt-10 flex flex-wrap">
          <input
            type="text"
            className="w-4/5 mx-auto shadow-lg dark:bg-slate-600 rounded-md"
            placeholder="Enter desired location"
            onChange={onSearchChange}
            value={location}
          ></input>
          <div
            className={`${
              location === "" ? "hidden" : ""
            } bg-white dark:bg-slate-500  flex-column w-4/5 mx-auto z-10`}
          >
            {autocompleteResponse
              .filter((suggestion) => {
                const searchTerm = location.toLowerCase();
                const suggestionName = suggestion.LocalizedName.toLowerCase();
                return (
                  searchTerm &&
                  suggestionName.startsWith(searchTerm) &&
                  suggestionName !== searchTerm
                );
              })
              .map((suggestion, index) => (
                <div
                  className={` text-slate-500 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-400 cursor-pointer`}
                  key={`${index}-${suggestion.LocalizedName}`}
                  onClick={() =>
                    onSearch(suggestion.LocalizedName, suggestion.Key)
                  }
                >
                  {suggestion.LocalizedName}
                </div>
              ))}
          </div>
        </div>
        <div className="mt-10 mx-auto sm:w-3/4 md:w-3/5 bg-white dark:bg-slate-600 rounded-md drop-shadow-lg p-4 relative">
          <AddFavortieButton
            icon={
              <FiHeart
                size="28"
                fill="red"
                fillOpacity={isFavorite ? "1" : "0"}
              />
            }
            isFavorite={isFavorite}
          />
          <h2 className="text-5xl sm:w-full md:w-1/2 mx-auto text-center">
            {location}
          </h2>
          <h3 className="text-4xl mx-auto mt-5 w-1/3 text-center">
            {weatherText}
          </h3>
          <p className="text-3xl w-1/3 mx-auto mt-8 text-center">
            {weatherMetric}
            <span>&#176;</span>
          </p>
          <div className="w-full grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-6">
            {farecastData.map((day, index) => (
              <Card
                key={`${index}-${day}`}
                weatherText={day.Day.IconPhrase}
                temperature={day.Temperature.Maximum.Value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
