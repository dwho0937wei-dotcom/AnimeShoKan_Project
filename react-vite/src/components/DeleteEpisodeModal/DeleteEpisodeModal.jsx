import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkDeleteEpisode } from "../../redux/anime";
import './DeleteEpisodeModal.css'

function DeleteEpisodeModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    let { animeId, episodeId } = useParams();
    animeId = parseInt(animeId);
    episodeId = parseInt(episodeId);
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
        <div className="deleteEpisodeModal">
            <h1>Sure you want to permanently delete this episode?</h1>
            <div className="deleteEpisodeContainer">
                <div className="deleteEpisodeTwoBtns">
                    <button onClick={handleDelete}>Confirm Delete</button>
                    <button onClick={handleCancel}>Nevermind</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteEpisodeModal;