import { thunkAuthenticate } from "./session";

// const ALL_ANIME_LOAD = 'anime/allAnimeLoad';
const ANIME_CATALOG = 'anime/animeCatalog';
const ANIME_ID_LOAD = 'anime/animeIdLoad';
const NEW_ANIME = 'anime/newAnime';

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
const newAnime = (listEle, catalogEle, firstInitial) => ({
    type: NEW_ANIME,
    listEle,
    catalogEle,
    firstInitial
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
export const thunkNewAnime = (animeData) => async (dispatch) => {
    const response = await fetch(`/api/anime/new`, {
        method: "POST",
        body: animeData
    });
    const dataLstEle = await response.json();

    if (response.ok) {
        const dataCatalogEle = { id: dataLstEle.id, title: dataLstEle.title };
        const dataFirstInitial = dataCatalogEle.title[0].toUpperCase();
        //! For adding the anime into the animeCatalog and animeList in Redux
        dispatch(newAnime(dataLstEle, dataCatalogEle, dataFirstInitial))
        //! Needed for updating the Posted Anime in user in Redux
        dispatch(thunkAuthenticate())
        //! Return the id assigned to the posted anime so that the user will later be redirected to its page after submitting
        return dataLstEle.id
    } else {
        //! In this case, the data must be an error so we're returning an error.
        const errors = dataLstEle;
        return errors;
    }
}

function animeReducer(state={ animeCatalog: {}, animeList: {} }, action) {
    switch (action.type) {
        // case ALL_ANIME_LOAD:
        //     return { ...state, animeCatalog: action.payload };
        case ANIME_CATALOG:
            return { ...state, animeCatalog: action.payload };
        case ANIME_ID_LOAD:
            return { ...state, animeList: { ...state.animeList, [action.payload.id]: action.payload } };
        case NEW_ANIME: {
            let firstInitialGroup = state.animeCatalog[action.firstInitial];
            if (firstInitialGroup) {
                firstInitialGroup = [...firstInitialGroup, action.catalogEle].sort((anime1, anime2) => anime1.title.localeCompare(anime2.title));
            }
            else {
                firstInitialGroup = [action.catalogEle];
            }
            return { 
                ...state, 
                animeList: { ...state.animeList, [action.listEle.id]: action.listEle },
                animeCatalog: { ...state.animeCatalog, [action.firstInitial]: firstInitialGroup }
            }
        }
        default:
            return state
    }
}

export default animeReducer;