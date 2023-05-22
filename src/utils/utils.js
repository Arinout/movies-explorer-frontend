function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40)
  }

function filterMoviesSearch (moviesArr, searchQuery, isShortMoviesCheckbox) {
  const filtredMoviesArr = moviesArr.filter((movie) => {
    return String(movie.nameRU)
      .toLowerCase()
      .trim()
      .indexOf(searchQuery.toLowerCase().trim()) !== -1
      || String(movie.nameEN)
        .toLowerCase()
        .trim()
        .indexOf(searchQuery.toLowerCase().trim()) !== -1
  });

  return isShortMoviesCheckbox ? filterShortMovies(filtredMoviesArr) : filtredMoviesArr;
}

function changeDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  if(hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

function findMarkedMovies (userMoviesArr, movie) {
  return userMoviesArr.find((item) => item.movieId === movie.id || item.movieId === movie.movieId);
}

function transformMoviesData (moviesArr) {
  moviesArr.forEach(movie => {
    if (!movie.nameEN) movie.nameEN = movie.nameRU;
    if (!movie.country) movie.country = 'Russia';
    if (!movie.trailerLink || !movie.trailerLink.includes('https://www.youtube.com/'))
      movie.trailerLink = 'https://www.youtube.com/';
    if (!movie.image) {
      movie.image = 'https://s1.hostingkartinok.com/uploads/images/2022/10/f27b6ff74390f86b5c5d4f222436d605.jpg'
      movie.thumbnail = 'https://s1.hostingkartinok.com/uploads/images/2022/10/f27b6ff74390f86b5c5d4f222436d605.jpg'
    } else {
      movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
      movie.image = `https://api.nomoreparties.co${movie.image.url}`;
    }
  })
  return moviesArr;
}
export { filterShortMovies, filterMoviesSearch, changeDuration, findMarkedMovies, transformMoviesData }