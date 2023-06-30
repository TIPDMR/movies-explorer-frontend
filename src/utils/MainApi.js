import { MAIN_API_URI } from "./constants";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка => ${res.status}`);
  }

  _request(url, config) {
    return fetch(`${this._baseUrl}${url}`, config).then((res) => this._checkResult(res));
  }

}

const MainApi = new Api({
  baseUrl: MAIN_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default MainApi;
