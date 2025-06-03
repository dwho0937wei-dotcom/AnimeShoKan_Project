import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import './AnimeCatalogPage.css'
import { Welcome } from '../Welcome/Welcome.jsx'

function AnimeCatalogPage() {
    const animeCatalog = useSelector(state => state.anime.animeCatalog);
    const alphabetList = Object.keys(animeCatalog).sort();
    
    return (
        <>
            <Welcome />
            <div className='animeCatalogs'>
                {alphabetList.map(alphabet => {
                    return (
                        <div key={alphabet} className='animeCatalog'>
                            <h2>{alphabet}</h2>
                            <ul>
                                {animeCatalog[alphabet].map(anime => {
                                    return (
                                        <li key={anime.id}>
                                            <NavLink to={`/anime/${anime.id}`} 
                                            // style={{ textDecoration: 'none', color: '#CBC3E3' }}
                                            >
                                                 <img src={anime.previewImage} alt={anime.title} />
                                                {anime.title}
                                            </NavLink>
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

export default AnimeCatalogPage;