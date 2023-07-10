import { MOVIES_API_URI } from "../constants/constApiUri";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    return res.ok ? res.json() : Promise.reject(res);
  }

  _request(url, config) {
    return fetch(`${this._baseUrl}${url}`, config).then((res) => this._checkResult(res));
  }

  getMovies() {
    return this._request('/beatfilm-movies', {
      headers: this._headers
    });
  }
}

const MoviesApi = new Api({
  baseUrl: MOVIES_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default MoviesApi;
