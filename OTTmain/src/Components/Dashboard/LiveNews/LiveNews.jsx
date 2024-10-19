import React, { useState } from 'react';

const LiveNewsPage = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('Active');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('url', url);
    formData.append('status', status);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/live-news/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Live news uploaded successfully!');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || 'Failed to upload live news.'}`);
      }
    } catch (error) {
      setMessage('Error: Unable to connect to the server.');
    }
  };

  return (
    <div className='p-2'>
      <h3 className='ms-3 my-1'>
        <span>Dashboard</span><span>/</span>Upload Live News
      </h3>
      <hr />
      <div>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            {/* Title and URL fields for live news */}
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

            <div className="mb-3 col-lg-6">
              <label htmlFor="url" className="form-label">Live News URL</label>
              <input 
                type="url" 
                className="form-control" 
                id="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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

export default LiveNewsPage;
