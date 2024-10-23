import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import './CharacterCatalogPage.css'

function CharacterCatalogPage() {
    const characterCatalog = useSelector(state => state.characters.characterCatalog);
    const alphabetList = Object.keys(characterCatalog).sort();
    
    return (
        <>
            <div className='welcome'>
                <h1>Welcome to the AnimeShoKan!</h1>
                <div id="navCatalogs">
                    <NavLink className="navCatalog" to="/anime"><h1>Anime</h1></NavLink>
                    <NavLink className="navCatalog" to="/character"><h1>Character</h1></NavLink>
                </div>
                <h1>Search for your favorite character here!</h1>
            </div>

            <div className='characterCatalogs'>
                {alphabetList.map(alphabet => {
                    return (
                        <div key={alphabet} className='characterCatalog'>
                            <h2>{alphabet}</h2>
                            <ul>
                                {characterCatalog[alphabet].map(character => {
                                    return (
                                        <li key={character.id}>
                                            <NavLink to={`/character/${character.id}`} 
                                            // style={{ textDecoration: 'none', color: '#CBC3E3' }}
                                            >{character.fullName}</NavLink>
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

export default CharacterCatalogPage;