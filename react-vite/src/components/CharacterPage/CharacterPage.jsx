import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { thunkCharacterIdLoad } from '../../redux/character';
// import { MdDeleteForever } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import DeleteCharacterModal from '../DeleteCharacterModal/DeleteCharacterModal';
import './CharacterPage.css'

function CharacterPage() {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);
    let { characterId } = useParams();
    characterId = parseInt(characterId);

    const characterList = useSelector(state => state.characters.characterList)
    useEffect(() => {
        if (!characterList || !characterList[characterId]) {
            dispatch(thunkCharacterIdLoad(characterId)).then(() => setIsLoaded(true))
        }
        else {
            setIsLoaded(true)
        }
    }, [])
    const character = isLoaded && characterList[characterId]
    const user = useSelector(state => state.session.user)

    return (
        character ?
            <div id='characterPage'>
                <NavLink to={`/character`} id='navCharCatalog'><FaArrowLeft />Back to the Character Catalog!</NavLink>
                <div id='characterContainer'>
                    <div id='charProfDesc'>
                        <div id='characterProfile'>
                            <div>
                                <h2>{character.fullName}</h2>
                            </div>
                            <div>
                                <img src={character.previewImage} alt={character.fullName} />
                            </div>
                            <div id='originList'>
                                <h2 id='originHeader'>Origin</h2>
                                {character.Anime.map(anime => {
                                    return (
                                        <div key={anime.id} className='animeOrigin'>
                                            <NavLink className="animeTitles" to={`/anime/${anime.id}`}>{anime.title}</NavLink>
                                            <p className='characterType'>({anime.characterType} character)</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div id='characterDescription'>
                            <div>
                                <h2>Introduction</h2>
                                <p>{character.introduction}</p>
                            </div>
                            <div>
                                <h2>Appearance</h2>
                                <p>{character.appearance}</p>
                            </div>
                            <div>
                                <h2>Personality</h2>
                                <p>{character.personality}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : 
            <h1>Loading...</h1>
    )
}

export default CharacterPage;