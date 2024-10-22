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
            // console.log(newEpisode.errors);
        }
        else {
            return navigate(`/anime/${animeId}`);
        }
    }
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (submit) {
            const newErrors = {};
            if (title.length === 0) {
                newErrors.title = "A title is needed!";
            }
            else if (title.length > 255) {
                newErrors.title = "Title cannot have more than 255 characters!";
            }
            if (plot.length === 0) {
                newErrors.plot = "Don't leave the plot box empty!";
            }
            // else if (plot.length > 255) {
            //     newErrors.plot = "Sorry, but not even the plot can have more than 255 characters because of the database's varchar limit!";
            // }
            if (episodeNum < 0) {
                newErrors.episodeNum = "Negative episode numbers don't exist! Funny enough, episode 0 can!";
            }
            if (!airDate) {
                newErrors.airDate = "The anime has to be aired on a particular day, right?";
            }
            if (!previewImage) {
                newErrors.previewImage = "This episode needs a preview image! :("
            }
            setErrors(newErrors);
        }
    }, [submit, title, plot, episodeNum, airDate, previewImage])

    return (
        <div className="createEpisodePage">
            <h1>Add a new episode for</h1>
            <h1>{anime && `"${anime.title}"`}!</h1>
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
                    {errors.title && <p className="createEpisodeErrors">{errors.title}</p>}
                </label>
                <label className="createEpisodeLabels">
                    Plot
                    <textarea 
                        type="text"
                        value={plot}
                        onChange={(e) => setPlot(e.target.value)} 
                        placeholder="There must be something happening in the episode!"
                    />
                    {errors.plot && <p className="createEpisodeErrors">{errors.plot}</p>}
                </label>
                <label className="createEpisodeLabels">
                    Episode #
                    <input
                        type="number"
                        value={episodeNum}
                        onChange={(e) => setEpisodeNum(e.target.value)} 
                    />
                    {errors.episodeNum && <p className="createEpisodeErrors">{errors.episodeNum}</p>}
                </label>
                <label className="createEpisodeLabels">
                    Aired Date
                    <input
                        type="date"
                        value={airDate}
                        onChange={(e) => setAirDate(e.target.value)} 
                    />
                    {errors.airDate && <p className="createEpisodeErrors">{errors.airDate}</p>}
                </label>
                <label className="createEpisodeUploadImage">
                    <div className="createEpisodeImage">
                        Preview Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewImage(e.target.files[0])} 
                            className="createEpisodeUploadBtn"
                        />
                    </div>
                    {errors.previewImage && <p className="createEpisodeErrors">{errors.previewImage}</p>}
                </label>
                <div className="createEpisodeSubmitContainer">
                    <input className="createEpisodeBtn" type="submit" value="Submit" disabled={errors.title || errors.plot || errors.episodeNum || errors.airDate || errors.previewImage}/>
                    <button type="button" onClick={() => navigate(`/anime/${animeId}`)} className="createEpisodeBtn">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateEpisodeFormPage;