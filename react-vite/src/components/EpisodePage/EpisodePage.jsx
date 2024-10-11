import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import './EpisodePage.css'

function EpisodePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ isLoaded, setIsLoaded ] = useState(false);
    let { animeId, episodeId } = useParams();
    episodeId = parseInt(episodeId)

    const episodeList = useSelector(state => state.anime.animeList[animeId].Episodes);
    const currentEpisodeIndex = episodeList.findIndex(episode => episode.id === episodeId);
    const episode = episodeList[currentEpisodeIndex];

    return(
        <div className='episodeEntirePage'>
            <div className='episodePageContainer'>
                <div className='episodePageTop'>
                    <NavLink to={`/anime/${animeId}`}>Anime</NavLink>
                    <h1>Episode {episode.episodeNum}: {episode.title}</h1>
                    <div className='ep-edit-delete'>
                        <button><FaEdit /></button>
                        <button><MdDeleteForever /></button>
                    </div>
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
                        <button onClick={() => navigate(`/anime/${animeId}/episode/${episodeList[currentEpisodeIndex-1].id}`)}>prev</button> : <div></div>}
                    {currentEpisodeIndex < episodeList.length - 1 ?
                        <button onClick={() => navigate(`/anime/${animeId}/episode/${episodeList[currentEpisodeIndex+1].id}`)}>next</button> : <div></div>}
                    
                </div>
            </div>
        </div>
    )
}

export default EpisodePage;