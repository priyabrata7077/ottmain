import React, {useState} from 'react'
import style from './nav.module.css'
import user from '../../../Assets/Icons/profile.png'

const Nav = () => {
  const [searchValue,SetSearchValue] = useState('');
  const [moviesDataByName,SetMoviesDataByName] = useState();

  return (
    <div className={style.Nav}>
        <nav>
            <div className={style.search}>
              <input type="text" placeholder='Search for Latest Series/Movies' onChange={(e)=>SetSearchValue(e.target.value)} value={searchValue} />
              <span><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <img src={user} width='30' alt="user" />
        </nav>
    </div>
  )
}

export default Nav;