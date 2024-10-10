import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
    const animeCatalog = useSelector(state => state.anime.animeCatalog);
    const alphabetList = Object.keys(animeCatalog).sort();
    
    return (
        <>
            <div className='welcome'>
                <h1>Welcome to the AnimeShoKan!</h1>
                <h1>Search for your favorite anime here!</h1>
            </div>

            <div className='lists'>
                {alphabetList.map(alphabet => {
                    return (
                        <div key={alphabet} className='list'>
                            <h2>{alphabet}</h2>
                            <ul>
                                {animeCatalog[alphabet].map(anime => {
                                    return (
                                        <li key={anime.id}>
                                            <NavLink to={`/anime/${anime.id}`} style={{ textDecoration: 'none', color: 'blue' }}>{anime.title}</NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default HomePage;