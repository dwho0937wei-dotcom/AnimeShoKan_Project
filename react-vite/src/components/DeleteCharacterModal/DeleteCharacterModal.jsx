import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkAnimeIdLoad } from "../../redux/anime";
import { thunkDeleteCharacter } from "../../redux/character";
import './DeleteCharacterModal.css'

function DeleteCharacterModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    let { characterId } = useParams();
    characterId = parseInt(characterId);

    const animeList = useSelector(state => state.anime.animeList)
    const associatedLoadedAnime = Object.values(animeList).filter(anime => anime.Characters.filter(character => character.id === characterId).length === 1);

    const handleDelete = () => {
        dispatch(thunkDeleteCharacter(characterId))
            .then(() => closeModal())
            .then(() => navigate(`/character`))
            .then(() => {
                for (const anime of associatedLoadedAnime) {
                    dispatch(thunkAnimeIdLoad(anime.id));
                }
            });
    }
    const handleCancel = () => {
        closeModal();
    }

    return (
        <div className="deleteCharacterModal">
            <h1>Sure you want to permanently delete your character post?</h1>
            <div className="deleteCharacterContainer">
                <div className="deleteCharacterTwoBtns">
                    <button onClick={handleDelete}>Confirm Delete</button>
                    <button onClick={handleCancel}>Nevermind</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCharacterModal;