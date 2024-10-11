import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkDeleteEpisode } from "../../redux/anime";
import './DeleteAnimeModal.css'

function DeleteEpisodeModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const { animeId, episodeId } = useParams();
    const episodeList = useSelector(state => state.anime.animeList[animeId].Episodes);
    const episodeIndex = episodeList.findIndex((episode) => episode.id === episodeId);

    const handleDelete = () => {
        dispatch(thunkDeleteEpisode(animeId, episodeId, episodeIndex))
            .then(() => closeModal())
            .then(() => navigate(`/anime/${animeId}`));
    }
    const handleCancel = () => {
        // console.log("Deleting anime canceled!")
        closeModal();
    }

    return (
        <div className="deleteModal">
            <h1>Sure you want to permanently delete your anime post?</h1>
            <div className="container">
                <div className="twoBtns">
                    <button onClick={handleDelete}>Confirm Delete</button>
                    <button onClick={handleCancel}>Nevermind</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteEpisodeModal;