import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { thunkAnimeIdLoad } from '../../redux/anime';
import './AnimePage.css'

function AnimePage() {
    let { animeId } = useParams();
    animeId = parseInt(animeId);

    const [ isLoaded, setIsLoaded ] = useState(false);
    const dispatch = useDispatch();

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

    return (
        anime ?
            <div>
                <div className='title-and-edit'>
                    <div></div>
                    {<h1>{anime.title}</h1>}
                    <button>Edit</button>
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