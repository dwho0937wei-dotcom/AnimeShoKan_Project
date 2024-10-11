import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkUpdateAnime } from "../../redux/anime";
import "./UpdateAnimeFormPage.css"

const UpdateAnimeFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { animeId } = useParams();
    const animeToUpdate = useSelector(state => state.anime.animeList[animeId]);
    const [previewImage, setPreviewImage] = useState(null);
    const [synopsis, setSynopsis] = useState(animeToUpdate.synopsis);
    const [title, setTitle] = useState(animeToUpdate.title);
    const [submit, setSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        const animeData = new FormData();
        animeData.append("title", title);
        if (synopsis.length === 0) {
            return;
        }
        animeData.append("synopsis", synopsis);
        animeData.append("previewImage", previewImage);
        const serverResponse = await dispatch(thunkUpdateAnime(animeId, animeData));
        if (typeof serverResponse !== "object") {
            const newAnimeId = serverResponse;
            return navigate(`/anime/${newAnimeId}`);
        }
        else {
            return serverResponse.errors;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="updateAnimeForm">
                <label className="updateAnimeLabels">
                    Title
                    <textarea 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Yes, it's in textarea because some anime titles are just SUPER long!!!"
                    />
                    <p className="updateAnimeErrors">{submit && title.length == 0 && `A title is needed!`}</p>
                </label>
                <label className="updateAnimeLabels">
                    Synopsis
                    <textarea 
                        type="text"
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)} 
                        placeholder="Give a brief summary of what's the anime about?"
                    />
                    <p className="updateAnimeErrors">{submit && synopsis.length == 0 && `All anime has a synopsis! Please give one!`}</p>
                </label>
                <label className="updateAnimeUploadImage">
                    <div className="updateAnimeImage">
                        Preview Image
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewImage(e.target.files[0])} 
                        />
                    </div>
                </label>
                <div className="updateAnimeSubmitContainer">
                    <input className="updateAnimeSubmitBtn" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default UpdateAnimeFormPage;