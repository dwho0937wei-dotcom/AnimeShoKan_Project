const ALL_ANIME_LOAD = 'anime/allAnimeLoad';

const allAnimeLoad = (animeCatalog) => ({
    type: ALL_ANIME_LOAD,
    payload: animeCatalog
});

export const thunkAllAnimeLoad = () => async (dispatch) => {
    const response = await fetch("/api/anime");
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }

        dispatch(allAnimeLoad(data));
    }
}

function animeReducer(state={}, action) {
    switch (action.type) {
        case ALL_ANIME_LOAD:
            return { ...state, animeCatalog: action.payload };
        default:
            return state
    }
}

export default animeReducer;