import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { thunkAnimeIdLoad } from '../../redux/anime';
import { MdDeleteForever } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
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

    const user = useSelector(state => state.session.user)

    return (
        anime ?
            <div>
                <div className='title-and-edit'>
                    <div></div>
                    <h1>{anime.title}</h1>
                    {
                        !user || user.id !== anime.hostEditorId
                            ?
                        <div></div>
                            :
                        <div className='edit-delete'>
                            <button onClick={() => navigate(`/anime/${animeId}/edit`)}><FaEdit /></button>
                            <button><MdDeleteForever /></button>
                        </div>
                    }
                </div>
                <div className='container'>
                    <div className='subcontainer'>
                        <div className='syn-img'>
                            <img src={anime.previewImage} alt={anime.title} />
                            <h2>Synopsis</h2>
                            {anime.synopsis}
                        </div>
                        <div className='episodes'>
                            Episodes are here!
                        </div>
                    </div>  
                </div>
            </div>
        :
            `loading...`

    )
}

export default AnimePage;