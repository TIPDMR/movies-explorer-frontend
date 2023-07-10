import { MAIN_API_URI } from "../constants/constApiUri";

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

  getUserInfo() {
    return this._request('/users/me', {
      headers: this._headers,
      credentials: "include",
      method: 'GET'
    });
  }

  signUp(email, password, name) {
    return this._request('/signup', {
      headers: this._headers,
      credentials: "include",
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  signIn(email, password) {
    return this._request('/signin', {
      headers: this._headers,
      credentials: "include",
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  signOut() {
    return this._request('/signout', {
      headers: this._headers,
      credentials: "include",
      method: 'GET',
    });
  }

  updateProfile(name, email) {
    return this._request('/users/me', {
      headers: this._headers,
      credentials: "include",
      method: 'PATCH',
      body: JSON.stringify({ name, email }),
    });
  }

  addMovieFavorite(movie) {
    return this._request('/movies', {
      headers: this._headers,
      credentials: "include",
      method: 'POST',
      body: JSON.stringify(movie)
    });
  };

  deleteMovieFavorite(id) {
    return this._request(`/movies/${id}`, {
      headers: this._headers,
      credentials: "include",
      method: 'DELETE'
    });
  };

  getMoviesFavorite() {
    return this._request('/movies', {
      headers: this._headers,
      credentials: "include",
      method: 'GET'
    });
  };

}

const MainApi = new Api({
  baseUrl: MAIN_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default MainApi;
