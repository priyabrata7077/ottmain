import React, { useEffect, useState } from 'react';
import style from './events.module.css';
// import Nav from '../Nav';
// import Footer from '../Footer';

const Events = () => {
    const [eventsData, setEventsData] = useState([]); // State to hold the events data
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State to handle errors
    const [isPlayerOpen, setIsPlayerOpen] = useState(false); // State for video player visibility
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(''); // State for selected video URL

    // Fetch data from the API
    useEffect(() => {
        const fetchUpcomingMovies = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/upcoming-movies/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Log the data for debugging
                console.log('Fetched data:', data);

                // Ensure data is an array before filtering
                if (Array.isArray(data)) {
                    const today = new Date();
                    const filteredEvents = data.filter(event => new Date(event.release_date) > today);
                    setEventsData(filteredEvents); // Set the filtered events to state
                } else {
                    console.error('Data is not an array:', data);
                    setError('Invalid data format received from the server.');
                }
            } catch (error) {
                console.error('Error fetching upcoming movies:', error);
                setError(error.message); // Set the error message to state
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchUpcomingMovies();
    }, []);

    // Open the video player modal
    const openPlayer = (videoUrl) => {
        setSelectedVideoUrl(videoUrl); // Set the selected video URL
        setIsPlayerOpen(true); // Show the video player modal
    };

    // Close the video player modal
    const closePlayer = () => {
        setIsPlayerOpen(false); // Hide the video player modal
        setSelectedVideoUrl(''); // Clear the selected video URL
    };

    return (
        <div className={style.container}>
            {/* <Nav /> */}
            <div className={style.eventscontainer}>
                <h1 className={style.eventstitle}>UPCOMING MOVIES</h1>
                {loading ? (
                    <p>Loading...</p> // Show loading message
                ) : error ? (
                    <p className={style.error}>{error}</p> // Display error message if there's an error
                ) : (
                    <div className={style.eventsgrid}>
                        {eventsData.length > 0 ? (
                            eventsData.map((event) => (
                                <div key={event.id} className={style.eventcard}>
                                    <img 
                                        src={event.poster_image} 
                                        alt={event.title} 
                                        className={style.eventimage} 
                                        onClick={() => openPlayer(event.trailer_url)} // Open video on image click
                                    />
                                    <div className={style.eventcontent}>
                                        <h2 className={style.eventtitle}>{event.title}</h2>
                                        <p className={style.eventdate}>{new Date(event.release_date).toLocaleDateString()}</p>
                                        <p className={style.eventdescription}>{event.synopsis}</p>
                                        <p className={style.eventrating}>Rating: {event.rating}</p>
                                        <button 
                                            className={style.learnmorebtn} 
                                            onClick={() => openPlayer(event.trailer_url)} // Open video on button click
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={style.noEvents}>No upcoming movies available.</p> // Message when no events are found
                        )}
                    </div>
                )}
            </div>

            {/* Video Player Overlay */}
            {isPlayerOpen && (
                <div className={style.playerOverlay}>
                    <div className={style.playerContainer}>
                        <button onClick={closePlayer} className={style.closeButton}>X</button>
                        <video controls className={style.videoPlayer} autoPlay>
                            <source src={selectedVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
            {/* <Footer /> */}
        </div>
    );
};

export default Events;
