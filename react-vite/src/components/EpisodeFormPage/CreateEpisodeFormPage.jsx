import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkAddEpisode, thunkAnimeIdLoad } from "../../redux/anime";
import "./CreateEpisodeFormPage.css"

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function CreateEpisodeFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { animeId } = useParams();
    const [title, setTitle] = useState('');
    const [plot, setPlot] = useState('');
    const [episodeNum, setEpisodeNum] = useState(0);
    const [airDate, setAirDate] = useState(formatDate(new Date()))
    const [previewImage, setPreviewImage] = useState(null);
    const [submit, setSubmit] = useState(false);

    const anime = useSelector(state => state.anime.animeList[animeId]);
    useEffect(() => {
        if (!anime) {
            dispatch(thunkAnimeIdLoad(animeId))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        const episodeData = new FormData();
        episodeData.append("title", title);
        episodeData.append("plot", plot);
        episodeData.append("episodeNum", episodeNum);
        episodeData.append("airDate", airDate);
        episodeData.append("previewImage", previewImage);
        const newEpisode = await dispatch(thunkAddEpisode(animeId, episodeData))
        if (newEpisode.errors) {
            console.log(newEpisode.errors);
        }
        else {
            return navigate(`/anime/${animeId}`);
        }
    }

    return (
        <>
            <h1>Welcome to the Form Page for adding a new episode!</h1>
            <form onSubmit={handleSubmit}
            className="createEpisodeForm">
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
                            onChange={(e) => setPreviewImage(e.target.files[0])} 
                        />
                    </div>
                    <p className="createEpisodeErrors">{submit && !previewImage && `Need to upload an image!`}</p>
                </label>
                <div className="createEpisodeSubmitContainer">
                    <input className="createEpisodeSubmitBtn" type="submit" value="Submit" />
                </div>
            </form>
        </>
    )
}

export default CreateEpisodeFormPage;