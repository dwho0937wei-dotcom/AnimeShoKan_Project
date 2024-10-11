import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkNewAnime } from "../../redux/anime";
import "./CreateAnimeFormPage.css"

const CreateAnimeFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [synopsis, setSynopsis] = useState('');
    const [title, setTitle] = useState('');
    const [submit, setSubmit] = useState(false);

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

    return (
        <div>
            <form onSubmit={handleSubmit} className="createAnimeForm">
                <label className="createAnimeLabels">
                    Title
                    <textarea 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Yes, it's in textarea because some anime titles are just SUPER long!!!"
                    />
                    <p className="createAnimeErrors">{submit && title.length == 0 && `A title is needed!`}</p>
                </label>
                <label className="createAnimeLabels">
                    Synopsis
                    <textarea 
                        type="text"
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)} 
                        placeholder="Give a brief summary of what's the anime about?"
                    />
                    <p className="createAnimeErrors">{submit && synopsis.length === 0 && `All anime has a synopsis! Please give one!`}</p>
                </label>
                <label className="createAnimeUploadImage">
                    <div className="createAnimeImage">
                        Preview Image
                        <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewImage(e.target.files[0])} 
                        />
                    </div>
                    <p className="createAnimeErrors">{submit && !previewImage && `Need to upload an image!`}</p>
                </label>
                <div className="createAnimeSubmitContainer">
                    <input className="createAnimeSubmitBtn" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default CreateAnimeFormPage;