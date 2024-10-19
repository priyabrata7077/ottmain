import React, { useState, useEffect } from 'react';
import style from './addBanner.module.css';

const AdBanner = () => {
  const [showAd, setShowAd] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [adData, setAdData] = useState(null); // State to hold fetched ad data

  useEffect(() => {
    // Fetch ads from the API
    const fetchAds = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ads/'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Assuming you want to display the first ad fetched
        setAdData(data[0]);
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  const closeAd = () => {
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    if (option === "not-interested") {
      setShowAd(false);
    } else {
      setShowOptions(false); // Keep the ad visible
    }
  };

  return (
    showAd && adData && ( // Only render if adData is available
      <div className={style.container}>
        <div className={style.adbanner}>
          <div className={style.adcontent}>
            <img
              src={adData.image_url} // Use fetched ad image URL
              alt="Ad Logo"
              className={style.adlogo}
              style={{ width: '100%', height: 'auto' }} // Adjust styling as needed
            />
            <div className={style.adtext}>
              <p className={style.adtitle}>{adData.title}</p>
              <h1>{adData.movie_title}</h1>
              <p>Watch Now on IMDb, Rating: {adData.rating_text}</p>
            </div>
            <a
              href={adData.link} // Use fetched ad link
              target="_blank"
              rel="noopener noreferrer"
              className={style.adbtn}
            >
              Watch Now
            </a>
          </div>

          {!showOptions ? (
            <button className={style.adclosebtn} onClick={closeAd}>
              ✖
            </button>
          ) : (
            <div className={style.optionMenu}>
              <p onClick={() => handleOptionClick("not-interested")}>Not Interested</p>
              <p onClick={() => handleOptionClick("keep-suggesting")}>Keep Suggesting</p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default AdBanner;
