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
    const [previewImage, setPreviewImage] = useState(null);
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
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

    const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});
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
    useEffect(() => {
        if (submit) {
            const newErrors = {};
            if (title.length === 0) {
                newErrors.title = "A title is needed!";
            }
            else if (title.length > 255) {
                newErrors.title = "Title cannot have more than 255 characters!";
            }
            if (synopsis.length === 0) {
                newErrors.synopsis = "All anime has a synopsis! Please give one!";
            }
            else if (synopsis.length > 255) {
                newErrors.synopsis = "Sorry, but not even the synopsis can have more than 255 characters because of the database's varchar limit!";
            }
            setErrors(newErrors);
        }
    }, [submit, title, synopsis])

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
                    {errors.title && <p className="updateAnimeErrors">{errors.title}</p>}
                </label>
                <label className="updateAnimeLabels">
                    Synopsis
                    <textarea 
                        type="text"
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)} 
                        placeholder="Give a brief summary of what's the anime about?"
                    />
                    {errors.synopsis && <p className="updateAnimeErrors">{errors.synopsis}</p>}
                </label>
                <label className="updateAnimeUploadImage">
                    <div className="updateAnimeImage">
                        Preview Image
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewImage(e.target.files[0])} 
                            className="updateAnimeUploadBtn"
                        />
                    </div>
                </label>
                <div className="updateAnimeSubmitContainer">
                    <input className="updateAnimeBtn" type="submit" value="Submit" disabled={errors.title || errors.synopsis}/>
                    <button type="button" onClick={() => navigate(`/anime/${animeId}`)} className="updateAnimeBtn">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateAnimeFormPage;