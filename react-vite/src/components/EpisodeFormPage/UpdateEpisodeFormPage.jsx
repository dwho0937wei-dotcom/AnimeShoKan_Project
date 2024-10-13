import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkUpdateEpisode, thunkAnimeIdLoad } from "../../redux/anime";
import "./UpdateEpisodeFormPage.css"

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate() + 1).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function UpdateEpisodeFormPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { animeId, episodeId } = useParams();
    animeId = parseInt(animeId); episodeId = parseInt(episodeId);
    const anime = useSelector(state => state.anime.animeList[animeId]);
    useEffect(() => {
        if (!anime) {
            dispatch(thunkAnimeIdLoad(animeId))
        }
    }, [])
    useEffect(() => {
        if (anime) {
            setTitle(episode.title);
            setPlot(episode.plot);
            setEpisodeNum(episode.episodeNum);
            setAirDate(formatDate(new Date(episode.airDate)));
        }
    }, [anime])
    const currentEpisodeIndex = anime && anime.Episodes.findIndex((episode) => episode.id === episodeId);
    const episode = anime && anime.Episodes[currentEpisodeIndex];
    const [title, setTitle] = useState('');
    const [plot, setPlot] = useState('');
    const [episodeNum, setEpisodeNum] = useState(0);
    const [airDate, setAirDate] = useState('')
    const [previewImage, setPreviewImage] = useState(null);
    const [submit, setSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        if (title.length === 0 ||
            plot.length === 0 ||
            episodeNum < 0
        ) {
            return;
        }
        const episodeData = new FormData();
        episodeData.append("title", title);
        episodeData.append("plot", plot);
        episodeData.append("episodeNum", episodeNum);
        episodeData.append("airDate", airDate);
        episodeData.append("previewImage", previewImage);
        const newEpisode = await dispatch(thunkUpdateEpisode(animeId, episodeId, currentEpisodeIndex, episodeData))
        if (newEpisode.errors) {
            // console.log(newEpisode.errors);
        }
        else {
            return navigate(`/anime/${animeId}/episode/${episodeId}`);
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
            else if (plot.length > 255) {
                newErrors.plot = "Sorry, but not even the plot can have more than 255 characters because of the database's varchar limit!";
            }
            if (episodeNum < 0) {
                newErrors.episodeNum = "Negative episode numbers don't exist! Funny enough, episode 0 can!";
            }
            if (!airDate) {
                newErrors.airDate = "The anime has to be aired on a particular day, right?";
            }
            setErrors(newErrors);
        }
    }, [submit, title, plot, episodeNum, airDate, previewImage])

    return (
        episode ?
            <div className="updateEpisodePage">
                <h1>Update episode</h1>
                <h1>{`"${episode.title}"`}</h1>
                <h1>from anime </h1>
                <h1>{`"${anime.title}"`}!</h1>
                <form onSubmit={handleSubmit}
                className="updateEpisodeForm">
                    <label className="updateEpisodeLabels">
                        Title
                        <textarea 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Every episode must have a title!"
                        />
                        {errors.title && <p className="updateEpisodeErrors">{errors.title}</p>}
                    </label>
                    <label className="updateEpisodeLabels">
                        Plot
                        <textarea 
                            type="text"
                            value={plot}
                            onChange={(e) => setPlot(e.target.value)} 
                            placeholder="There must be something happening in the episode!"
                        />
                        {errors.plot && <p className="updateEpisodeErrors">{errors.plot}</p>}
                    </label>
                    <label className="updateEpisodeLabels">
                        Episode #
                        <input
                            type="number"
                            value={episodeNum}
                            onChange={(e) => setEpisodeNum(e.target.value)} 
                        />
                        {errors.episodeNum && <p className="updateEpisodeErrors">{errors.episodeNum}</p>}
                    </label>
                    <label className="updateEpisodeLabels">
                        Aired Date
                        <input
                            type="date"
                            value={airDate}
                            onChange={(e) => setAirDate(e.target.value)} 
                        />
                        {errors.airDate && <p className="updateEpisodeErrors">{errors.airDate}</p>}
                    </label>
                    <label className="updateEpisodeUploadImage">
                        <div className="updateEpisodeImage">
                            Preview Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPreviewImage(e.target.files[0])} 
                                className="updateEpisodeBtn"
                            />
                        </div>
                    </label>
                    <div className="updateEpisodeSubmitContainer">
                        <input className="updateEpisodeBtn" type="submit" value="Submit" disabled={submit && (title.length === 0 || plot.length === 0 || episodeNum < 0)}/>
                        <button type="button" onClick={() => navigate(`/anime/${animeId}/episode/${episodeId}`)} className="updateEpisodeBtn">Cancel</button>
                    </div>
                </form>
            </div>
        :
            <h1>Loading...</h1>
    )
}

export default UpdateEpisodeFormPage;