import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import './EpisodePage.css'

function EpisodePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);
    let { animeId, episodeId } = useParams();
    episodeId = parseInt(episodeId)

    const episodeList = useSelector(state => state.anime.animeList[animeId].Episodes);
    const currentEpisodeIndex = episodeList.findIndex(episode => episode.id === episodeId);
    console.log('Episode Index: ', currentEpisodeIndex)
    const episode = episodeList[currentEpisodeIndex];

    return(
        <div className='episodeEntirePage'>
            <div className='episodePageContainer'>
                <div className='episodePageTop'>
                    <NavLink to={`/anime/${animeId}`}>Anime</NavLink>
                    <h1>Episode {episode.episodeNum}: {episode.title}</h1>
                    <button><FaEdit /></button>
                </div>

                <div className='ep-plot-img-container'>
                    <div className='ep-plot-img'>
                        <img src={episode.previewImage} alt={episode.title} />
                        <h2>Plot</h2>
                        {episode.plot}
                    </div>
                </div>

                <div className='ep-prev-next-btns'>
                    {currentEpisodeIndex > 0 ? 
                        <button>prev</button> : <div></div>}
                    {currentEpisodeIndex < episodeList.length - 1 ?
                        <button>next</button> : <div></div>}
                    
                </div>
            </div>
        </div>
    )
}

export default EpisodePage;