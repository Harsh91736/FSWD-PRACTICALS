const movies = [
    {
        title: "The Shawshank Redemption",
        genre: "Drama",
        rating: 9.3,
        releaseYear: 1994
    },
    {
        title: "The Godfather",
        genre: "Crime",
        rating: 9.2,
        releaseYear: 1972
    },
    {
        title: "The Dark Knight",
        genre: "Action",
        rating: 9.0,
        releaseYear: 2008
    },
    {
        title: "Pulp Fiction",
        genre: "Crime",
        rating: 8.9,
        releaseYear: 1994
    }
];

function addMovie(title, genre, rating, releaseYear) {
    const newMovie = {
        title,
        genre,
        rating,
        releaseYear
    };
    movies.push(newMovie);
    console.log(`Added new movie: ${title}`);
}

function listMoviesByGenre(genre) {
    const genreMovies = movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
    console.log(`\nMovies in genre "${genre}":`);
    genreMovies.forEach(movie => {
        console.log(`- ${movie.title} (${movie.releaseYear})`);
    });
}

function findHighestRatedMovie() {
    const highestRated = movies.reduce((highest, current) => {
        return current.rating > highest.rating ? current : highest;
    });
    console.log(`\nHighest rated movie: ${highestRated.title} (Rating: ${highestRated.rating})`);
}

function getAllMovieTitles() {
    const titles = movies.map(movie => movie.title);
    console.log('\nAll movie titles:');
    titles.forEach(title => console.log(`- ${title}`));
}

function findMoviesAfterYear(year) {
    const recentMovies = movies.filter(movie => movie.releaseYear > year);
    console.log(`\nMovies released after ${year}:`);
    recentMovies.forEach(movie => {
        console.log(`- ${movie.title} (${movie.releaseYear})`);
    });
}

console.log('Movie Collection Manager Demo\n');

addMovie("Inception", "Sci-Fi", 8.8, 2010);
listMoviesByGenre("Crime");
findHighestRatedMovie();
getAllMovieTitles();
findMoviesAfterYear(2000); 
