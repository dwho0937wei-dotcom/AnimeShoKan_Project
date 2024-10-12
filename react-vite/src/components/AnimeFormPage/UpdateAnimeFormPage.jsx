import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkAnimeIdLoad, thunkUpdateAnime } from "../../redux/anime";
import "./UpdateAnimeFormPage.css"

const UpdateAnimeFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { animeId } = useParams();
    const animeToUpdate = useSelector(state => state.anime.animeList[animeId]);
    useEffect(() => {
        if (!animeToUpdate) {
            dispatch(thunkAnimeIdLoad(animeId))
        }
    }, [])
    useEffect(() => {
        if (animeToUpdate) {
            setTitle(animeToUpdate.title);
            setSynopsis(animeToUpdate.synopsis);
        }
    }, [animeToUpdate])
    const [previewImage, setPreviewImage] = useState(null);
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
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
        <div className="updateAnimePage">
            <h1>Update the anime</h1>
            <h1>{animeToUpdate && `"${animeToUpdate.title}"`}!</h1>
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
                            className="updateAnimeBtn"
                        />
                    </div>
                </label>
                <div className="updateAnimeSubmitContainer">
                    <input className="updateAnimeBtn" type="submit" value="Submit" disabled={submit && (title.length === 0 || synopsis.length === 0)}/>
                    <button type="button" onClick={() => navigate(`/anime/${animeId}`)} className="updateAnimeBtn">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateAnimeFormPage;