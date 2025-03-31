import { useState } from "react";

export default function MovieCollectionManager() {
  const [movies, setMovies] = useState([
    { title: "Inception", genre: "Sci-Fi", rating: 8.8, year: 2010 },
    { title: "The Dark Knight", genre: "Action", rating: 9.0, year: 2008 },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, year: 2014 },
  ]);

  const [newMovie, setNewMovie] = useState({ title: "", genre: "", rating: "", year: "" });
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const addMovie = () => {
    if (!newMovie.title || !newMovie.genre || !newMovie.rating || !newMovie.year) return;
    setMovies([...movies, { ...newMovie, rating: parseFloat(newMovie.rating), year: parseInt(newMovie.year) }]);
    setNewMovie({ title: "", genre: "", rating: "", year: "" });
  };

  const filterByGenre = () => {
    return genreFilter ? movies.filter(movie => movie.genre.toLowerCase() === genreFilter.toLowerCase()) : movies;
  };

  const highestRatedMovie = () => movies.reduce((max, movie) => (movie.rating > max.rating ? movie : max), movies[0]);

  const filteredMovies = movies.filter(movie => {
    return yearFilter ? movie.year > parseInt(yearFilter) : true;
  });

  return (
    <div className="container">
      <h1>Movie Collection Manager</h1>

      <div className="input-group">
        <input placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} />
        <input placeholder="Genre" value={newMovie.genre} onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })} />
        <input placeholder="Rating" type="number" value={newMovie.rating} onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })} />
        <input placeholder="Year" type="number" value={newMovie.year} onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })} />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      <div className="filter-group">
        <input className="filter-input" placeholder="Filter by Genre" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)} />
        <input className="filter-input" placeholder="Filter by Year (>)" type="number" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} />
      </div>

      <h2>Movie List</h2>
      <div className="movie-list">
        {filteredMovies.map((movie, index) => (
          <div key={index} className="movie-card">
            <p><strong>{movie.title}</strong> ({movie.year}) - {movie.genre} - Rating: {movie.rating}</p>
          </div>
        ))}
      </div>

      <h2>Filtered by Genre</h2>
      <div className="movie-list">
        {filterByGenre().map((movie, index) => (
          <div key={index} className="movie-card">
            <p><strong>{movie.title}</strong> ({movie.year}) - {movie.genre} - Rating: {movie.rating}</p>
          </div>
        ))}
      </div>

      <h2>Highest Rated Movie</h2>
      <div className="movie-card">
        <p><strong>{highestRatedMovie().title}</strong> ({highestRatedMovie().year}) - {highestRatedMovie().genre} - Rating: {highestRatedMovie().rating}</p>
      </div>
    </div>
  );
}
