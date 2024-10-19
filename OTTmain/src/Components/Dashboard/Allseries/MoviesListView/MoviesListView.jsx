import React,{useState,useEffect} from 'react'
import MoviesListRow from './MoviesListRow'
import movies from '../../MoviesData.js'


const MoviesListView = () => {
  const [moviesData,setMoviesData] = useState([]);

  useEffect(() => {
    setMoviesData(movies);
  }, []);

  

  // console.log(moviesData);
  return (
    <div>
      <table class="table border">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Release Date</th>
            <th scope="col">Rating</th>
            <th scope="col">Views</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            moviesData.map((movie) => {
              return (
                <MoviesListRow
                  title={movie.Title} genre={movie.Genre}
                  release_date={movie.Released} rating={movie.imdbRating}
                  views={movie.Views}
                />
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default MoviesListView
