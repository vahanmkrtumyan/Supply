const movies = [
  
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "654",
    genre: "Ցեմենտ",
    numberInStock: "7 տ",
    dailyRentalRate: "08/01/2019"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "844",
    genre: "Գաջ",
    numberInStock: "7 տ",
    dailyRentalRate: "08/01/2019"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "484",
    genre: "Ցեմենտ",
    numberInStock: "7 տ",
    dailyRentalRate: "08/01/2019"
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = movie.genre;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}
