import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import style from './chennel.module.css'; // Add your CSS
import axios from 'axios'; // Axios for API requests

const Channel = () => {
  // State to store fetched channel data
  const [channels, setChannels] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/live-news/')
      .then(response => {
        setChannels(response.data);  // Assuming the API returns a list of LiveNews items
      })
      .catch(error => {
        console.error('Error fetching channels:', error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={style.channelcarousel}>
      <h2>All Channels</h2>
      <Slider {...settings}>
        {channels.map((channel) => (
          <div key={channel.id} className={style.channelcard}>
            {/* Display the YouTube video thumbnail */}
            <img
  src={`https://img.youtube.com/vi/${channel.youtube_url.split('v=')[1]}/0.jpg`}
  alt={channel.title}
  className={style.channelimage}
  onClick={() => window.open(channel.youtube_url, '_blank')}
/>

            {channel.is_active && <span className={style.livebadge}>LIVE</span>}
            <div className={style.channelinfo}>
              <h3>{channel.title}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Channel;
