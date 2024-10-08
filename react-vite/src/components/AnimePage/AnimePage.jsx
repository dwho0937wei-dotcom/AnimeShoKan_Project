import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { thunkAnimeIdLoad } from '../../redux/anime';

function AnimePage() {
    const { animeId } = useParams();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkAnimeIdLoad(animeId)).then(() => setIsLoaded(true))
    }, [animeId, dispatch, setIsLoaded])
    const anime = useSelector(state => state.anime.currentAnime)

    return (
        <>
            {isLoaded ? anime.title : `loading...`}
        </>
    )
}

export default AnimePage;