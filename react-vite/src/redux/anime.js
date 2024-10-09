// const ALL_ANIME_LOAD = 'anime/allAnimeLoad';
const ANIME_CATALOG = 'anime/animeCatalog';
const ANIME_ID_LOAD = 'anime/animeIdLoad';

// const allAnimeLoad = (animeCatalog) => ({
//     type: ALL_ANIME_LOAD,
//     payload: animeCatalog
// });
const animeCatalog = (animeCatalog) => ({
    type: ANIME_CATALOG,
    payload: animeCatalog
})
const animeIdLoad = (currentAnime) => ({
    type: ANIME_ID_LOAD,
    payload: currentAnime
})

// export const thunkAllAnimeLoad = () => async (dispatch) => {
//     const response = await fetch("/api/anime");
//     if (response.ok) {
//         const data = await response.json()
//         if (data.errors) {
//             return;
//         }

//         dispatch(allAnimeLoad(data));
//     }
// }
export const thunkAnimeCatalog = () => async (dispatch) => {
    const response = await fetch("/api/anime/catalog");
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }

        dispatch(animeCatalog(data));
    }
}
export const thunkAnimeIdLoad = (animeId) => async (dispatch) => {
    const response = await fetch(`/api/anime/${animeId}`);
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }

        dispatch(animeIdLoad(data))
    }
}

function animeReducer(state={}, action) {
    switch (action.type) {
        // case ALL_ANIME_LOAD:
        //     return { ...state, animeCatalog: action.payload };
        case ANIME_CATALOG:
            return { ...state, animeCatalog: action.payload };
        case ANIME_ID_LOAD:
            return { ...state, animeList: { ...state.animeList, [action.payload.id]: action.payload } };
        default:
            return state
    }
}

export default animeReducer;