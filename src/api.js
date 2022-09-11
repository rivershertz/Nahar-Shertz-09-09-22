class Api {
  constructor({ baseUrl, key }) {
    this._baseUrl = baseUrl;
    this._key = key;
  }

  _request(url) {
    return fetch(url).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  getAutocomlete(query) {
    const formattedQuery = query.replace(" ", "%20");
    return this._request(
      `${this._baseUrl}/locations/v1/cities/autocomplete?apikey=${this._key}&q=${formattedQuery}`
    );
  }

  getCurrentWeather(locationKey) {
    return this._request(
      `${this._baseUrl}/currentconditions/v1/${locationKey}?apikey=${this._key}`
    );
  }

  getForecast(locationKey) {
    return this._request(
      `${this._baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this._key}`
    )
  }
}

export const api = new Api({
  baseUrl: "http://dataservice.accuweather.com",
  key: "m2tzSACpN7AGgtBHc4OOJmjD2xfvOEMI",
});
