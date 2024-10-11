import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkNewAnime } from "../../redux/anime";
import "./CreateEpisodeFormPage.css"

function CreateEpisodeFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [plot, setPlot] = useState('');
    const [episodeNum, setEpisodeNum] = useState(0);
    const [airDate, setAirDate] = useState(new Date())
    const [previewImage, setPreviewImage] = useState(null);
    const [submit, setSubmit] = useState(false);

    return (
        <>
            <h1>Welcome to the Form Page for adding a new episode!</h1>
            <form className="createEpisodeForm">
                <label className="createEpisodeLabels">
                    Title
                    <textarea 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Every episode must have a title!"
                    />
                    <p className="createEpisodeErrors">{submit && title.length == 0 && `A title is needed!`}</p>
                </label>
                <label className="createEpisodeLabels">
                    Plot
                    <textarea 
                        type="text"
                        value={plot}
                        onChange={(e) => setPlot(e.target.value)} 
                        placeholder="There must be something happening in the episode!"
                    />
                    <p className="createEpisodeErrors">{submit && plot.length == 0 && `Don't leave the plot box empty!`}</p>
                </label>
                <label className="createEpisodeLabels">
                    Episode #
                    <input
                        type="number"
                        value={episodeNum}
                        onChange={(e) => setEpisodeNum(e.target.value)} 
                    />
                    <p className="createEpisodeErrors">{submit && episodeNum < 0 && `Negative episode numbers don't exist! Funny enough, episode 0 can!`}</p>
                </label>
                <label className="createEpisodeLabels">
                    Aired Date
                    <input
                        type="date"
                        value={airDate}
                        onChange={(e) => setAirDate(e.target.value)} 
                    />
                </label>
                <label className="createEpisodeUploadImage">
                    <div className="createEpisodeImage">
                        Preview Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewImage(e.target.value)} 
                        />
                    </div>
                    <p className="createEpisodeErrors">{submit && !previewImage && `Need to upload an image!`}</p>
                </label>
            </form>
        </>
    )
}

export default CreateEpisodeFormPage;