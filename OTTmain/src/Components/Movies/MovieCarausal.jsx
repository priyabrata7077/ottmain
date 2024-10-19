import React, { useEffect, useState } from 'react';
import style from './movie.module.css';

const MovieCarousel = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // Fetch videos from the API
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/movies/');
                const data = await response.json();
                console.log('Fetched videos:', data);
                setVideos(data || []); // Store the videos in state
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchVideos();
    }, []);

    const handleVideoClick = (videoUrl) => {
        setSelectedVideo(videoUrl); // Set the video URL to play in modal
    };

    const closeModal = () => {
        setSelectedVideo(null); // Close the modal by resetting video URL
    };

    // Auto-scroll functionality for videos
    useEffect(() => {
        if (videos.length > 0) {
            const interval = setInterval(() => {
                setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
            }, 5000); // Auto slide every 5 seconds
            return () => clearInterval(interval);
        }
    }, [videos]);

    return (
        <div className={style.container}>
            <div className={style.gallerycontainer}>
                <div className={style.gallerywrapper}>
                <div className={style.gallerygrid} 
    style={{
        transform: `translateX(-${currentVideoIndex * 210}px)`,
        transition: 'transform 0.8s ease',
    }}>

                        {videos.map((video, index) => (
                            <div key={index} className={style.galleryitem} onClick={() => handleVideoClick(video.movie_file)}>
                                {/* Render the poster image */}
                                {video.poster_image && (
                                    <img src={video.poster_image} alt={video.title} className={style.posterImage} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Modal to play selected video */}
                {selectedVideo && (
                    <div className={style.modal} onClick={closeModal}>
                        <span className={style.close}>&times;</span>
                        <video className={style.modalcontent} controls autoPlay>
                            <source src={selectedVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCarousel;