import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper core and required modules
import 'swiper/swiper-bundle.css'; // Swiper styles

// Import Swiper modules from the correct path
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import style from './showcase.module.css';

<Swiper modules={[Autoplay, Pagination, Navigation]} />


const Showcase = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/movies/'); // Example API
                const data = await response.json();
                console.log(data);
                setVideos(data || []);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    const handleVideoClick = async (videoUrl) => {
        setLoading(true);
        setSelectedVideo(videoUrl);
        await new Promise(resolve => setTimeout(resolve, 500));
        setLoading(false);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    return (
        <div>
            <div className={style.container}>
                <div className={style.gallerycontainer}>
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]} // Pass the modules here
                        spaceBetween={5} // Space between slides
                        slidesPerView={1} // Show 1 items at a time
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        navigation={true}
                    >
                        {videos.map((video, index) => (
                            <SwiperSlide key={index} className={style.galleryitem} onClick={() => handleVideoClick(video.movie_file)}>
                                {video.poster_image && (
                                    <img
                                        src={video.poster_image}
                                        alt={video.title}
                                        className={style.posterImage}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {selectedVideo && (
                        <div className={style.modal} onClick={closeModal}>
                            <span className={style.close}>&times;</span>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <video className={style.modalcontent} controls autoPlay preload="metadata">
                                    <source src={selectedVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Showcase;
