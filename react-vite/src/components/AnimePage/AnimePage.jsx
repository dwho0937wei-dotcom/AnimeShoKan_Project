import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { thunkAnimeIdLoad } from '../../redux/anime';
import { MdDeleteForever } from "react-icons/md"
import { FaArrowLeft, FaEdit } from "react-icons/fa"
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteAnimeModal from '../DeleteAnimeModal/DeleteAnimeModal';
import './AnimePage.css'

function AnimePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);
    let { animeId } = useParams();
    animeId = parseInt(animeId);

    const animeList = useSelector(state => state.anime.animeList)
    useEffect(() => {
        if (!animeList || !animeList[animeId]) {
            dispatch(thunkAnimeIdLoad(animeId)).then(() => setIsLoaded(true))
        }
        else {
            setIsLoaded(true)
        }
    }, [])
    const anime = isLoaded && animeList[animeId]
    const episodes = isLoaded && anime.Episodes
    const user = useSelector(state => state.session.user)

    return (
        anime ?
            <div>
                <div className='anime-nav-edit-delete-container'>
                    <NavLink to={`/anime`} id="navAnimeCatalog"><FaArrowLeft />Back to the Anime Catalog!</NavLink>
                    {
                            !user || user.id !== anime.hostEditorId
                                ?
                            <div></div>
                                :
                            <div className='anime-edit-delete'>
                                <button onClick={() => navigate(`edit`)}><FaEdit className='animeBtn'/></button>
                                <OpenModalButton
                                    buttonText={<MdDeleteForever className='animeBtn'/>}
                                    modalComponent={<DeleteAnimeModal />}
                                />
                            </div>
                    }
                </div>
                <div className='title-editor'>
                    <h1>{anime.title}</h1>
                    <h2>Posted by {anime['Host Editor'].firstName} {anime['Host Editor'].lastName}</h2>
                </div>
                <div className='container'>
                    <div className='subcontainer'>
                        <div className='syn-img'>
                            <img src={anime.previewImage} alt={anime.title} />
                            <h2>Synopsis</h2>
                            {anime.synopsis}
                        </div>
                        <div className='episodeSection'>
                            <ul className='episodes'>
                                {episodes.length > 0 ? 
                                    episodes.map(episode => {
                                        return (
                                            <li key={episode.id} className='ep-li'>
                                                <NavLink to={`episode/${episode.id}`}>Episode {episode.episodeNum}: {episode.title}</NavLink>
                                            </li>
                                        )  
                                    })
                                :
                                   "No episodes yet! Stay tuned!"}
                            </ul>
                            {
                                //! Only the host editor can add episodes!
                                user && anime.hostEditorId === user.id && 
                                    <div className='addEpisodeBtnSection'>
                                        <button className='addEpisodeBtn' onClick={() => navigate(`episode/new`)}>Add new episode!</button>
                                    </div>
                            }
                        </div>
                    </div>  
                    <div id="animeCharacterList">
                        {anime.Characters.length > 0 ?
                                anime.Characters.map(character => {
                                    return (
                                        <NavLink key={character.id} className='animeCharacter' to={`/character/${character.id}`}>
                                            <img src={character.previewImage} alt={character.fullName} />
                                            {character.fullName}
                                        </NavLink>
                                    )
                                })
                            :
                                <h1 id="noAnimeCharacters">No characters aligned with this anime yet!</h1>
                        }
                    </div>
                </div>
            </div>
        :
            `loading...`

    )
}

export default AnimePage;