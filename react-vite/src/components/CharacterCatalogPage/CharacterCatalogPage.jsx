import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import './CharacterCatalogPage.css'
import { Welcome } from '../Welcome/Welcome.jsx'

function CharacterCatalogPage() {
    const characterCatalog = useSelector(state => state.characters.characterCatalog);
    const alphabetList = Object.keys(characterCatalog).sort();
    
    return (
        <>
            <Welcome />
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
                                            >
                                                <img src={character.previewImage} alt={character.fullName} />
                                                {character.fullName}
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

export default CharacterCatalogPage;