import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkNewAnime } from "../../redux/anime";
import "./CreateAnimeFormPage.css"

const CreateAnimeFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        const animeData = new FormData();
        animeData.append("title", title);
        animeData.append("synopsis", synopsis);
        animeData.append("previewImage", previewImage);
        const serverResponse = await dispatch(thunkNewAnime(animeData));
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
            if (!previewImage) {
                newErrors.previewImage = "This anime needs a preview image! :(";
            }
            setErrors(newErrors);
        }
    }, [submit, title, synopsis, previewImage])

    return (
        <div className="createAnimePage">
            <h1>Post a new anime!</h1>
            <form onSubmit={handleSubmit} className="createAnimeForm">
                <label className="createAnimeLabels">
                    Title
                    <textarea 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Yes, it's in textarea because some anime titles are just SUPER long!!!"
                    />
                    {errors.title && <p className="createAnimeErrors">{errors.title}</p>}
                </label>
                <label className="createAnimeLabels">
                    Synopsis
                    <textarea 
                        type="text"
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)} 
                        placeholder="Give a brief summary of what's the anime about?"
                    />
                    {errors.synopsis && <p className="createAnimeErrors">{errors.synopsis}</p>}
                </label>
                <label className="createAnimeUploadImage">
                    <div className="createAnimeImage">
                        Preview Image
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewImage(e.target.files[0])} 
                            className="createAnimeBtn"
                        />
                    </div>
                    {errors.previewImage && <p className="createAnimeErrors">{errors.previewImage}</p>}
                </label>
                <div className="createAnimeSubmitContainer">
                    <input className="createAnimeBtn" type="submit" value="Submit" disabled={false}/>
                    <button type="button" onClick={() => navigate(`/`)} className="createAnimeBtn">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateAnimeFormPage;