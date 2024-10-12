import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkUpdateEpisode, thunkAnimeIdLoad } from "../../redux/anime";
import "./UpdateEpisodeFormPage.css"

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
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
            console.log(newEpisode.errors);
        }
        else {
            return navigate(`/anime/${animeId}/episode/${episodeId}`);
        }
    }

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
                        <p className="updateEpisodeErrors">{submit && title.length == 0 && `A title is needed!`}</p>
                    </label>
                    <label className="updateEpisodeLabels">
                        Plot
                        <textarea 
                            type="text"
                            value={plot}
                            onChange={(e) => setPlot(e.target.value)} 
                            placeholder="There must be something happening in the episode!"
                        />
                        <p className="updateEpisodeErrors">{submit && plot.length == 0 && `Don't leave the plot box empty!`}</p>
                    </label>
                    <label className="updateEpisodeLabels">
                        Episode #
                        <input
                            type="number"
                            value={episodeNum}
                            onChange={(e) => setEpisodeNum(e.target.value)} 
                        />
                        <p className="updateEpisodeErrors">{submit && episodeNum < 0 && `Negative episode numbers don't exist! Funny enough, episode 0 can!`}</p>
                    </label>
                    <label className="updateEpisodeLabels">
                        Aired Date
                        <input
                            type="date"
                            value={airDate}
                            onChange={(e) => setAirDate(e.target.value)} 
                        />
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