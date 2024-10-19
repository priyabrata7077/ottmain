import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import style from './renderMovie.module.css';

const App = () => {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [error, setError] = useState(null); // State to handle any errors

  // Fetch movies data from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/shows/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check if data is an array and set state
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          console.error('Data is not an array:', data);
          setError('Invalid data format received from the server.');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(error.message); // Set the error message to state
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={style.eventstitle} id='hindi'>GUJARATI MOVIE</h1>
      {error && <p className={style.error}>{error}</p>} {/* Display error message if there's an error */}
      <div className={style.movielist}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.id} // Assuming each movie has a unique id
              image={movie.poster_image} // Use the correct property for image URL from your API response
              title={movie.title}
              genre={movie.genre}
              language={movie.language}
            />
          ))
        ) : (
          <p>No movies available.</p> // Message when no movies are found
        )}
      </div>
    </div>
  );
};

export default App;
