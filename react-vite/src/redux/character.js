import { thunkAuthenticate } from "./session";


//! Action
const CHARACTER_CATALOG = 'character/characterCatalog'
const NEW_CHARACTER = 'character/newCharacter'


//! Action Creator
const characterCatalog = (characterCatalog) => ({
    type: CHARACTER_CATALOG,
    payload: characterCatalog
})


//! Thunk Action
export const thunkCharacterCatalog = () => async (dispatch) => {
    const response = await fetch("/api/character/catalog");
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return;
        }
        dispatch(characterCatalog(data))
    }
}


// function characterReducer(state={  })