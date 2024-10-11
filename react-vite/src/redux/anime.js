import { thunkAuthenticate } from "./session";

//! Action
// const ALL_ANIME_LOAD = 'anime/allAnimeLoad';
const ANIME_CATALOG = 'anime/animeCatalog';
const ANIME_ID_LOAD = 'anime/animeIdLoad';
const NEW_ANIME = 'anime/newAnime';
const UPDATE_ANIME = 'anime/updateAnime';
const DELETE_ANIME = 'anime/deleteAnime';
    //! Episodes
const ADD_EPISODE = 'episode/addEpisode'
const DELETE_EPISODE = 'episode/deleteEpisode'


//! Action Creator
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
const updateAnime = (listEle, catalogEle, newFirstInitial, oldTitle, oldFirstInitial) => ({
    type: UPDATE_ANIME,
    listEle,
    catalogEle,
    newFirstInitial, 
    oldTitle,
    oldFirstInitial
})
const deleteAnime = (animeId, firstInitial) => ({
    type: DELETE_ANIME,
    animeId,
    firstInitial,
}) 
    //! Episodes
const addEpisode = (animeId, newEpisode) => ({
    type: ADD_EPISODE,
    animeId,
    newEpisode
})
const deleteEpisode = (animeId, episodeIndex) => ({
    type: DELETE_EPISODE,
    animeId,
    episodeIndex
})


//! Thunk Action
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
export const thunkUpdateAnime = (animeId, animeData) => async (dispatch) => {
    const response = await fetch(`/api/anime/${animeId}`, {
        method: "PUT",
        body: animeData
    });
    const { oldTitle, updated: dataLstEle } = await response.json();
    const oldFirstInitial = oldTitle[0].toUpperCase();

    if (response.ok) {
        const dataCatalogEle = { id: dataLstEle.id, title: dataLstEle.title };
        const dataFirstInitial = dataCatalogEle.title[0].toUpperCase();
        //! For updating the anime into the animeCatalog and animeList in Redux
        dispatch(updateAnime(dataLstEle, dataCatalogEle, dataFirstInitial, oldTitle, oldFirstInitial))
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
export const thunkDeleteAnime = (animeId) => async (dispatch) => {
    const response = await fetch(`/api/anime/${animeId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const { firstInitial, message } = await response.json();
        //! Remove the anime from 
            //! the animeCatalog (firstInitial is needed to find it) 
            //! and the animeList
        dispatch(deleteAnime(parseInt(animeId), firstInitial));
        dispatch(thunkAuthenticate());
        return message;
    }
    return;
}
    //! Episodes
export const thunkAddEpisode = (animeId, episodeData) => async (dispatch) => {
    const response = await fetch(`/api/anime/${animeId}/episode`, {
        method: 'POST',
        body: episodeData
    })
    const newEpisode = await response.json();

    if (response.ok) {
        dispatch(addEpisode(animeId, newEpisode));
        return newEpisode;
    }
    else {
        const errors = newEpisode;
        return errors;
    }
}
export const thunkDeleteEpisode = (animeId, episodeId, episodeIndex) => async (dispatch) => {
    const response = await fetch(`/api/anime/${animeId}/episode/${episodeId}`, {
        method: 'DELETE'
    })
    const result = await response.json();
    if (response.ok) {
        await dispatch(deleteEpisode(animeId, episodeIndex));
        return result;
    }
    else {
        const errors = result;
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
        case UPDATE_ANIME: {
            const newState = { ...state };
            //! Has the anime title been updated?
            if (action.oldTitle !== action.catalogEle.title) {
                //! Removing the anime with the old title from the animeCatalog
                newState.animeCatalog[action.oldFirstInitial] = newState.animeCatalog[action.oldFirstInitial].filter(anime => anime.title !== action.oldTitle);
                //! Does removing it makes the existing catalog empty?
                if (newState.animeCatalog[action.oldFirstInitial].length === 0) {
                    //! If so, then remove the empty catalog!
                    delete newState.animeCatalog[action.oldFirstInitial];
                }
                //! Adding the anime with the updated title into the animeCatalog
                    //! Does there exist a catalog with anime that has the same first initial as the updated anime title?
                if (newState.animeCatalog[action.newFirstInitial]) {
                        //! If so, then push that updated anime title into the existing catalog and then re-sort afterwards!
                    newState.animeCatalog[action.newFirstInitial].push(action.catalogEle);
                    newState.animeCatalog[action.newFirstInitial].sort((anime1, anime2) => anime1.title.localeCompare(anime2.title)) ;
                }
                else {
                        //! If not, then create a new catalog that represents the first initial of the updated anime title!
                    newState.animeCatalog[action.newFirstInitial] = [action.catalogEle];
                }      
            }
            //! Updating the updated anime in the animeList
            newState.animeList[action.listEle.id] = action.listEle
            return newState
        }
        case DELETE_ANIME: {
            const newState = { ...state };
            //! Remove the anime from animeCatalog
            newState.animeCatalog[action.firstInitial] = newState.animeCatalog[action.firstInitial].filter(anime => anime.id !== action.animeId);
                //! If that makes the catalog empty, then delete it
            if (newState.animeCatalog[action.firstInitial].length === 0) {
                delete newState.animeCatalog[action.firstInitial];
            }
            //! Remove the anime from animeList
            if (newState.animeList[action.animeId]) {
                delete newState.animeList[action.animeId];
            }
            return newState;
        }
        case ADD_EPISODE: {
            const newState = { ...state };
            if (newState.animeList[action.animeId]) {
                newState.animeList[action.animeId].Episodes.push(action.newEpisode);
                newState.animeList[action.animeId].Episodes.sort((ep1, ep2) => ep1.episodeNum - ep2.episodeNum);
            }
            newState.animeList[action.animeId].numOfEpisode += 1;
            return newState;
        }
        case DELETE_EPISODE: {
            const newState = { ...state };
            newState.animeList[action.animeId].Episodes.splice(action.episodeIndex, 1);
            newState.animeList[action.animeId].numOfEpisode -= 1;
            return newState;
        }
        default:
            return state
    }
}

export default animeReducer;