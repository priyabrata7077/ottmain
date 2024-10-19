import React, { useEffect, useState, useRef } from 'react';
import MovieCard from './MovieCard'; // Assuming you have a MovieCard component
import style from './renderCharCard.module.css';

const App = () => {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [isPlayerOpen, setIsPlayerOpen] = useState(false); // State to control video player visibility
  const [selectedMovie, setSelectedMovie] = useState(null); // State to store selected movie details
  const videoRef = useRef(null); // Reference to the video element

  // Fetch movies data from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/shows/'); // Update the endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMovies(data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array to run once after the initial render

  // Open the video player modal
  const openPlayer = (movie) => {
    setSelectedMovie(movie); // Set the clicked movie as the selected movie
    setIsPlayerOpen(true); // Show the video player modal
  };

  // Close the video player modal
  const closePlayer = () => {
    setIsPlayerOpen(false); // Hide the video player modal
    setSelectedMovie(null); // Clear the selected movie
  };

  // Fullscreen handler
  const enterFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div>
      <h1 className={style.eventstitle} id="hindi">GUJARATI Shows</h1>
      <div className={style.movielist}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div 
              key={movie.id} 
              className={style.movieitem} 
              onClick={() => openPlayer(movie)} // Open player on click
            >
              <MovieCard
                image={movie.poster_image} // Image URL from your API response
              />
            </div>
          ))
        ) : (
          <p>No movies available.</p> // Message when no movies are found
        )}
      </div>

      {/* Video Player Overlay */}
      {isPlayerOpen && (
        <div className={style.playerOverlay} onClick={closePlayer}>
          <div className={style.playerContainer} onClick={(e) => e.stopPropagation()}> {/* Prevent click from closing player */}
            <button onClick={closePlayer} className={style.closeButton}>X</button>
            {selectedMovie && (
              <video 
                ref={videoRef} // Set the ref to the video element
                controls 
                className={style.videoPlayer} 
                autoPlay
                onClick={enterFullScreen} // Click on the video to enter full screen
              >
                <source src={selectedMovie.show_file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
