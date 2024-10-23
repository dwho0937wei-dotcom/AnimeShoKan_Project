import { thunkAuthenticate } from "./session";


//! Action
const CHARACTER_CATALOG = 'character/characterCatalog'
const CHARACTER_ID_LOAD = 'character/characterIdLoad'
const NEW_CHARACTER = 'character/newCharacter'


//! Action Creator
const characterCatalog = (characterCatalog) => ({
    type: CHARACTER_CATALOG,
    payload: characterCatalog
})
const characterIdLoad = (currentCharacter) => ({
    type: CHARACTER_ID_LOAD,
    payload: currentCharacter
})
const newCharacter = (listEle, catalogEle, firstInitial) => ({
    type: NEW_CHARACTER,
    listEle,
    catalogEle,
    firstInitial
})


//! Thunk Action
export const thunkCharacterCatalog = () => async (dispatch) => {
    const response = await fetch("/api/characters/catalog");
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }
        dispatch(characterCatalog(data))
    }
}
export const thunkCharacterIdLoad = (characterId) => async (dispatch) => {
    const response = await fetch(`/api/characters/${characterId}`);
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        dispatch(characterIdLoad(data))
    }
}
export const thunkNewCharacter = (characterData) => async (dispatch) => {
    const response = await fetch("/api/characters", {
        method: "POST",
        body: characterData
    });
    const dataLstEle = await response.json();
    if (response.ok) {
        const dataCatalogEle = { id: dataLstEle.id, fullName: dataLstEle.fullName };
        const dataFirstInitial = dataCatalogEle.fullName[0].toUpperCase();
        //! For adding the character into the characterCatalog and characterList in Redux
        dispatch(newCharacter(dataLstEle, dataCatalogEle, dataFirstInitial))
        //! Needed for updating the Posted Character in user in Redux
        dispatch(thunkAuthenticate())
        //! Return the id assigned to the posted character so that the user will later be redirected to its page after submitting
        return dataLstEle.id
    } else {
        //! In this case, the data must be an error so we're returning an error.
        const errors = dataLstEle;
        return errors;
    }
}


function characterReducer(state={ characterCatalog: {}, characterList: {} }, action) {
    switch (action.type) {
        case CHARACTER_CATALOG:
            return { ...state, characterCatalog: action.payload };
        case CHARACTER_ID_LOAD:
            return { ...state, characterList: { ...state.characterList, [action.payload.id]: action.payload } }
        case NEW_CHARACTER: {
            let firstInitialGroup = state.characterCatalog[action.firstInitial];
            if (firstInitialGroup) {
                firstInitialGroup = [...firstInitialGroup, action.catalogEle].sort((character1, character2) => character1.title.localeCompare(character2.title));
            }
            else {
                firstInitialGroup = [action.catalogEle];
            }
            return { 
                ...state, 
                characterList: { ...state.characterList, [action.listEle.id]: action.listEle },
                characterCatalog: { ...state.characterCatalog, [action.firstInitial]: firstInitialGroup }
            }
        }
        default:
            return state;
    }
}

export default characterReducer;