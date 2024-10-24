import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkDeleteAnime } from "../../redux/anime";
import './DeleteAnimeModal.css'

function DeleteAnimeModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    let { animeId } = useParams();
    animeId = parseInt(animeId);

    const handleDelete = () => {
        // console.log("Anime confirming to be deleted!")
        dispatch(thunkDeleteAnime(animeId))
            .then(() => closeModal())
            .then(() => navigate(``));
    }
    const handleCancel = () => {
        // console.log("Deleting anime canceled!")
        closeModal();
    }

    return (
        <div className="deleteAnimeModal">
            <h1>Sure you want to permanently delete your anime post?</h1>
            <div className="deleteAnimeContainer">
                <div className="deleteAnimeTwoBtns">
                    <button onClick={handleDelete}>Confirm Delete</button>
                    <button onClick={handleCancel}>Nevermind</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAnimeModal;