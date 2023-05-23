class MoviesApi {
	constructor(options) {
	  this._options = options;
	}
  
	_getResponse(response) {
	  if (response.ok) return response.json();
	  return Promise.reject(`Ошибка: ${response.status}`);
	}
  
	getMovies() {
	  return fetch(`${this._options.MOVIE_API_URL}`, {
		headers: this._options.headers,
	  }).then(this._getResponse);
	}
  }

export const moviesApi = new MoviesApi({
	MOVIE_API_URL: 'https://api.nomoreparties.co/beatfilm-movies',
	headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
	}
})