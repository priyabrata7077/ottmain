import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';
import style from './showList.module.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);  // State to hold API data
  const [error, setError] = useState(null); // State to handle any errors

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/shows/'); // API request
        if (!response.ok) {
          throw new Error('Failed to fetch shows data');
        }
        const data = await response.json(); // Parse the JSON data
        setShows(data);  // Set the fetched data to the shows state
      } catch (error) {
        setError(error.message);  // Catch and set any errors
      }
    };

    fetchShows();
  }, []);  // Empty dependency array ensures this runs only once

  return (
    <div className={style.showListContainer}>
      <h2 className={style.showListTitle}>Popular Shows</h2>
      {error && <p className={style.error}>Error: {error}</p>} {/* Show error if there's one */}
      <div className={style.showGrid}>
        {shows.length > 0 ? (
          shows.map((show, index) => (
            <ShowCard
              key={index}
              image={show.poster_image}     // Ensure this matches the field from the API response
              title={show.title}
              description={show.synopsis}   // Adjust to match API response field
            />
          ))
        ) : (
          <p>No shows available</p>  // Display this if no shows are found
        )}
      </div>
    </div>
  );
};

export default ShowList;
