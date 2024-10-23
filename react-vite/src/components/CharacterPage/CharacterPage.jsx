// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
// import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { thunkCharacterIdLoad } from '../../redux/character';
// import { MdDeleteForever } from "react-icons/md"
// import { FaEdit } from "react-icons/fa"
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import DeleteCharacterModal from '../DeleteCharacterModal/DeleteCharacterModal';
import './CharacterPage.css'

function CharacterPage() {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const [ isLoaded, setIsLoaded ] = useState(false);
    // let { characterId } = useParams();
    // characterId = parseInt(characterId);

    // const characterList = useSelector(state => state.character.characterList)
    // useEffect(() => {
    //     if (!characterList || !characterList[characterId]) {
    //         dispatch(thunkCharacterIdLoad(characterId)).then(() => setIsLoaded(true))
    //     }
    //     else {
    //         setIsLoaded(true)
    //     }
    // }, [])
    // const character = isLoaded && characterList[characterId]
    // const user = useSelector(state => state.session.user)

    return (
        <h1>Welcome to the Character Page!</h1>
    )
}

export default CharacterPage;