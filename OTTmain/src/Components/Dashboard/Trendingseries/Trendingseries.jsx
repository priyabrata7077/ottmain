import React from 'react'
import React, { useState } from 'react';

const Treningseries = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [castCrew, setCastCrew] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [showFile, setShowFile] = useState(null);
  const [posterImage, setPosterImage] = useState(null);
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('Published');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('language', language);
    formData.append('release_date', releaseDate);
    formData.append('cast_crew', castCrew);
    formData.append('trailer_url', trailerUrl);
    formData.append('synopsis', synopsis);
    formData.append('show_file', showFile);  // TV show file
    formData.append('poster_image', posterImage);  // poster image
    formData.append('rating', rating);
    formData.append('status', status);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/shows/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Show uploaded successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to upload show.'}`);
      }
    } catch (error) {
      setMessage('Error: Unable to connect to the server.');
    }
  };

  return (
    <div className='p-2'>
      <h3 className='ms-3 my-1'>
        <span>Dashboard</span><span>/</span>Upload a Show
      </h3>
      <hr />
      <div>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            {/* Similar fields as in FileUpload.jsx but for shows */}
            <div className="mb-3 col-lg-6">
              <label htmlFor="title" className="form-label">Title</label>
              <input 
                type="text" 
                className="form-control" 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>
            {/* Additional fields for shows */}
            {/* Include genre, language, release date, cast_crew, trailer_url, synopsis */}
            <div className="mb-3 col-lg-6">
              <label htmlFor="show_file" className="form-label">Upload Show File</label>
              <input 
                type="file" 
                className="form-control" 
                id="show_file" 
                onChange={(e) => setShowFile(e.target.files[0])} 
                required
              />
            </div>

            <div className="mb-3 col-lg-6">
              <label htmlFor="poster_image" className="form-label">Poster Image</label>
              <input 
                type="file" 
                className="form-control" 
                id="poster_image" 
                onChange={(e) => setPosterImage(e.target.files[0])} 
                required
              />
            </div>

            {/* Rating and Status */}
            <div className="mb-3 col-lg-6">
              <label htmlFor="rating" className="form-label">Rating</label>
              <input 
                type="text" 
                className="form-control" 
                id="rating" 
                value={rating} 
                onChange={(e) => setRating(e.target.value)} 
                required
              />
            </div>

            <div className='col-lg-6'>
              <label htmlFor="status" className="form-label">Status</label>
              <select 
                className="form-select" 
                id="status" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                required
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="col-lg-12">
              <button className='btn btn-success' type="submit">Save</button>
              <button className='btn ms-1' type="button" style={{backgroundColor:'#33526E',color:'#fff'}}>Cancel</button>
            </div>
          </div>

          {/* Display success or error message */}
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </form>
      </div>
    </div>
  );
};


export default Treningseries
