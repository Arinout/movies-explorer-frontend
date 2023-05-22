class MainApi {
    constructor({ baseURL, headers }) {
      this._baseURL = baseURL
      this._headers = headers
    }
  
    _getResponse(response) {
      if (response.ok) return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    }

    register(name, email, password) {
      return fetch(`${this._baseURL}/signup`, {
        method: "POST",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({ name, email, password })
      }).then(this._getResponse);
    }
  
    login(email, password) {
      return fetch(`${this._baseURL}/signin`, {
        method: "POST",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      }).then(this._getResponse);
    }
  
    logout() {
      return fetch(`${this._baseURL}/signout`, {
        method: 'POST',
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
      }).then(this._getResponse);
    }

    checkToken() {
      return fetch(`${this._baseURL}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
        credentials: 'include',
      }).then(this._getResponse);
    }
  
    getUserData() {
      return fetch(`${this._baseURL}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
        credentials: 'include',
      }).then(this._getResponse);
    }
  
    patchUser(name, email) {
      return fetch(`${this._baseURL}/users/me`, {
        method: "PATCH",
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({ name, email }),
        credentials: 'include',
      }).then(this._getResponse);
    }

    getUserMovies() {
      return fetch(`${this._baseURL}/movies`, {
        method: 'GET',
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
        credentials: 'include',
      }).then(this._getResponse);
    }
  
    addMovie(movie) {
      return fetch(`${this._baseURL}/movies`, {
        method: 'POST',
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: movie.image,
          trailerLink: movie.trailerLink,
          thumbnail: movie.thumbnail,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }),
        credentials: 'include',
      }).then(this._getResponse);
    }
  
    deleteMovie(movieId) {
      return fetch(`${this._baseURL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          ...this._headers,
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
        credentials: 'include',
      }).then(this._getResponse);
    }
}

const mainApi = new MainApi({
  baseURL: 'https://api.arinout.movies.nomoredomains.work',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
})

export default mainApi;

