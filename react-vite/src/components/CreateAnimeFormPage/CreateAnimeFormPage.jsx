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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <textarea 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Yes, it's in textarea because some anime titles are just SUPER long!!!"
                    />
                </label>
                <label>
                    Synopsis
                    <textarea 
                        type="text"
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)} 
                        placeholder="Give a brief summary of what's the anime about?"
                    />
                </label>
                <label className="uploadImage">
                    Preview Image
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPreviewImage(e.target.files[0])} 
                    />
                </label>
                <div className="submitContainer">
                    <input className="submitBtn" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    )
}

export default CreateAnimeFormPage;