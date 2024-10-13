import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { thunkAnimeIdLoad } from '../../redux/anime';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteEpisodeModal from '../DeleteEpisodeModal/DeleteEpisodeModal';
import './EpisodePage.css'

function EpisodePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { animeId, episodeId } = useParams();
    episodeId = parseInt(episodeId)

    const user = useSelector(state => state.session.user);
    const anime = useSelector(state => state.anime.animeList[animeId]);
    useEffect(() => {
        if (!anime) {
            dispatch(thunkAnimeIdLoad(animeId))
        }
    }, [])
    const episodeList = anime && anime.Episodes;
    const currentEpisodeIndex = episodeList && episodeList.findIndex(episode => episode.id === episodeId);
    const episode = episodeList && episodeList[currentEpisodeIndex];

    return(
        episode ?
            <div className='episodeEntirePage'>
                <div className='episodePageContainer'>
                    <div className='episodeNav'>
                        <NavLink to={`/anime/${animeId}`}><FaArrowLeft />{`${anime.title}`}</NavLink>
                        {
                            user && anime.hostEditorId === user.id ? 
                                <div className='ep-edit-delete'>
                                    <button onClick={() => navigate(`edit`)}><FaEdit className='ep-edit-delete-buttons'/></button>
                                    <OpenModalButton
                                        buttonText={<MdDeleteForever className='ep-edit-delete-buttons'/>}
                                        modalComponent={<DeleteEpisodeModal />}
                                    />
                                </div>
                            :
                                <div></div>
                        }
                    </div>
                    <div className='episodePageTitle'>
                        <h1>Episode {episode.episodeNum}: {episode.title}</h1>
                    </div>
                    <div className='ep-plot-img-container'>
                        <div className='ep-plot-img'>
                            <img src={episode.previewImage} alt={episode.title} />
                            <h2>Plot</h2>
                            {episode.plot}
                        </div>
                    </div>
                    <div className='ep-prev-next-container'>
                        <div className='ep-prev-next-btns'>
                            {currentEpisodeIndex > 0 ? 
                                <button onClick={() => navigate(`/anime/${animeId}/episode/${episodeList[currentEpisodeIndex-1].id}`)}>prev</button> : <div></div>}
                            {currentEpisodeIndex < episodeList.length - 1 ?
                                <button onClick={() => navigate(`/anime/${animeId}/episode/${episodeList[currentEpisodeIndex+1].id}`)}>next</button> : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
        :
            <h1>Loading...</h1>
    )
}

export default EpisodePage;