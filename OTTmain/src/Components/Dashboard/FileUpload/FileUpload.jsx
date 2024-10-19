import React, { useState } from 'react';

const FileUpload = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [castCrew, setCastCrew] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [movieFile, setMovieFile] = useState(null);
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
    formData.append('movie_file', movieFile);  // movie/TV show file
    formData.append('poster_image', posterImage);  // poster image
    formData.append('rating', rating);
    formData.append('status', status);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/movies/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Movie/TV Show uploaded successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to upload.'}`);
      }
    } catch (error) {
      setMessage('Error: Unable to connect to the server.');
    }
  };

  return (
    <div className='p-2'>
      <h3 className='ms-3 my-1'>
        <span>Dashboard</span><span>/</span>Upload a File
      </h3>
      <hr />
      <div>
        <form onSubmit={handleSubmit}>
          <div className='row'>
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

            <div className='col-lg-6'>
              <label htmlFor="genre" className="form-label">Genre</label>
              <select 
                className="form-select" 
                id="genre" 
                value={genre} 
                onChange={(e) => setGenre(e.target.value)} 
                required
              >
                <option value="">Choose Genre</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
              </select>
            </div>

            <div className='col-lg-6'>
              <label htmlFor="language" className="form-label">Language</label>
              <select 
                className="form-select" 
                id="language" 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)} 
                required
              >
                <option value="">Choose Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="French">French</option>
              </select>
            </div>

            <div className="mb-3 col-lg-6">
              <label htmlFor="releasedate" className="form-label">Release Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="releasedate" 
                value={releaseDate} 
                onChange={(e) => setReleaseDate(e.target.value)} 
                required
              />
            </div>

            <div className="mb-3 col-lg-6">
              <label htmlFor="cast_crew" className="form-label">Cast & Crew</label>
              <input 
                type="text" 
                className="form-control" 
                id="cast_crew" 
                value={castCrew} 
                onChange={(e) => setCastCrew(e.target.value)} 
                required
              />
            </div>

            <div className="mb-3 col-lg-6">
              <label htmlFor="trailer_url" className="form-label">Trailer URL</label>
              <input 
                type="url" 
                className="form-control" 
                id="trailer_url" 
                value={trailerUrl} 
                onChange={(e) => setTrailerUrl(e.target.value)} 
              />
            </div>

            <div className="mb-3 col-lg-12">
              <label htmlFor="synopsis" className="form-label">Synopsis</label>
              <textarea 
                className="form-control" 
                id="synopsis" 
                rows="3" 
                value={synopsis} 
                onChange={(e) => setSynopsis(e.target.value)} 
                required
              ></textarea>
            </div>

            <div className="mb-3 col-lg-6">
              <label htmlFor="upload_movie_TV_Show_file" className="form-label">Upload Movie/TV Show file</label>
              <input 
                type="file" 
                className="form-control" 
                id="movie_file" 
                onChange={(e) => setMovieFile(e.target.files[0])} 
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

export default FileUpload;
