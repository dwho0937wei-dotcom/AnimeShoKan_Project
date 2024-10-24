import { thunkAuthenticate } from "./session";


//! Action
const CHARACTER_CATALOG = 'character/characterCatalog'
const CHARACTER_ID_LOAD = 'character/characterIdLoad'
const DELETE_CHARACTER = 'character/deleteCharacter'
const NEW_CHARACTER = 'character/newCharacter'
const UPDATE_CHARACTER = 'character/updateCharacter'


//! Action Creator
const characterCatalog = (characterCatalog) => ({
    type: CHARACTER_CATALOG,
    payload: characterCatalog
})
const characterIdLoad = (currentCharacter) => ({
    type: CHARACTER_ID_LOAD,
    payload: currentCharacter
})
const deleteCharacter = (characterId, firstInitial) => ({
    type: DELETE_CHARACTER,
    characterId,
    firstInitial,
}) 
const newCharacter = (listEle, catalogEle, firstInitial) => ({
    type: NEW_CHARACTER,
    listEle,
    catalogEle,
    firstInitial
})
const updateCharacter = (listEle, catalogEle, newFirstInitial, oldFullName, oldFirstInitial) => ({
    type: UPDATE_CHARACTER,
    listEle,
    catalogEle,
    newFirstInitial, 
    oldFullName,
    oldFirstInitial
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
export const thunkDeleteCharacter = (characterId) => async (dispatch) => {
    const response = await fetch(`/api/characters/${characterId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const { firstInitial, message } = await response.json();
        //! Remove the character from
            //! the characterCatalog (firstInitial is needed to find it)
            //! and the characterList
        dispatch(deleteCharacter(parseInt(characterId), firstInitial));
        dispatch(thunkAuthenticate())
        return message;
    }
    return;
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
export const thunkUpdateCharacter = (characterId, characterData) => async (dispatch) => {
    const response = await fetch(`/api/characters/${characterId}`, {
        method: 'PUT',
        body: characterData
    })
    const { oldFullName, updated: dataLstEle } = await response.json();
    const oldFirstInitial = oldFullName[0].toUpperCase();
    if (response.ok) {
        const dataCatalogEle = { id: dataLstEle.id, fullName: dataLstEle.fullName };
        const dataFirstInitial = dataCatalogEle.fullName[0].toUpperCase();
        dispatch(updateCharacter(dataLstEle, dataCatalogEle, dataFirstInitial, oldFullName, oldFirstInitial));
        dispatch(thunkAuthenticate());
        return dataLstEle.id;
    } else {
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
        case DELETE_CHARACTER: {
            const newState = { ...state }
            //! Remove the character from characterCatalog
            newState.characterCatalog[action.firstInitial] = newState.characterCatalog[action.firstInitial].filter(character => character.id !== action.characterId);
                //! If that makes the catalog empty, then delete it
            if (newState.characterCatalog[action.firstInitial].length === 0) {
                delete newState.characterCatalog[action.firstInitial];
            }
            //! Remove the character from characterList
            if (newState.characterList[action.characterId]) {
                delete newState.characterList[action.characterId];
            }
            return newState;
        }
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
        case UPDATE_CHARACTER: {
            const newState = { ...state };
            //! Has the character full name been updated?
            if (action.oldFullName !== action.catalogEle.fullName) {
                //! Removing the character with the old full name from the characterCatalog using its unique id to find it
                    //! This is in case there are several characters with the same full name
                newState.characterCatalog[action.oldFirstInitial] = newState.characterCatalog[action.oldFirstInitial].filter(character => character.id !== action.catalogEle.id);
                //! Does removing it makes the existing catalog empty?
                if (newState.characterCatalog[action.oldFirstInitial].length === 0) {
                    //! If so, then remove the empty catalog!
                    delete newState.characterCatalog[action.oldFirstInitial];
                }
                //! Adding the character with the updated full name into the characterCatalog
                    //! Does there exist a catalog with characters that have the same first initial as the updated character full name?
                if (newState.characterCatalog[action.newFirstInitial]) {
                        //! If so, then put that updated character full name into the existing catalog and then re-sort afterwards!
                    newState.characterCatalog[action.newFirstInitial].push(action.catalogEle);
                    newState.characterCatalog[action.newFirstInitial].sort((character1, character2) => character1.fullName.localeCompare(character2.fullName));
                }
                else {
                        //! If not, then create a new catalog that represents the first initial of the updated character full name!
                    newState.characterCatalog[action.newFirstInitial] = [action.catalogEle];
                }
            }
            //! Updating the updated character in the characterList
            newState.characterList[action.listEle.id] = action.listEle
            return newState;
        }
        default:
            return state;
    }
}

export default characterReducer;