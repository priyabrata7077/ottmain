import React, { useEffect, useState } from 'react';
import style from './festival.module.css';

const FestivalShowcase = () => {
  const [celebrityEvents, setCelebrityEvents] = useState([]);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false); // State to control player visibility
  const [selectedMovie, setSelectedMovie] = useState(null); // State to store selected movie details

  // Fetching data from the API
  useEffect(() => {
    const fetchCelebrityEvents = async () => {  
      try {
        const response = await fetch('http://127.0.0.1:8000/api/movies/?language=Gujrati');  // Update this with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCelebrityEvents(data);
      } catch (error) {
        console.error('Error fetching celebrity events:', error);
      }
    };

    fetchCelebrityEvents();
  }, []);

  // Open the video player modal
  const openPlayer = (movie) => {
    setSelectedMovie(movie);
    setIsPlayerOpen(true);
  };

  // Close the video player modal
  const closePlayer = () => {
    setIsPlayerOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className={style.festivalshowcasecontainer}>
      <h2>Movie Showcase</h2>
      <div className={style.celebritygrid}>
        {celebrityEvents.slice(0, 6).map((event, index) => (  // Limit to 6 items
          <div
            className={style.celebrityitem}
            key={index}
            onClick={() => openPlayer(event)} // Open player on click
          >
            <img src={event.poster_image} alt={event.title} style={{ height: '330px', width: '100%' }} />
          </div>
        ))}
      </div>

      {/* Modal for video player */}
      {isPlayerOpen && (
        <div className={style.playerOverlay} onClick={closePlayer}>
          <div className={style.playerContainer}>
            <button onClick={closePlayer} className={style.closeButton}>X</button>
            {selectedMovie && (
              <video controls className={style.videoPlayer} autoPlay>
                <source src={selectedMovie.movie_file} type="video/mp4" /> {/* Use movie file instead of trailer */}
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FestivalShowcase;
