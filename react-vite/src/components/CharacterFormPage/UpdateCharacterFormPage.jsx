import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkAddCharacterToAnime, thunkAnimeIdLoad } from "../../redux/anime";
import { thunkCharacterIdLoad, thunkUpdateCharacter } from "../../redux/character";
import "./UpdateCharacterFormPage.css"

const UpdateCharacterFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { characterId } = useParams();
    const characterToUpdate = useSelector(state => state.characters.characterList[characterId]);
    const [previewImage, setPreviewImage] = useState(null);
    const [fullName, setFullName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [appearance, setAppearance] = useState('');
    const [personality, setPersonality] = useState('');
    useEffect(() => {
        if (!characterToUpdate) {
            dispatch(thunkCharacterIdLoad(characterId))
        }
    }, [])
    useEffect(() => {
        if (characterToUpdate) {
            setFullName(characterToUpdate.fullName);
            setIntroduction(characterToUpdate.introduction);
            setAppearance(characterToUpdate.appearance);
            setPersonality(characterToUpdate.personality);
        }
    }, [characterToUpdate])

    const [submit, setSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        const characterData = new FormData();
        characterData.append("fullName", fullName);
        characterData.append("introduction", introduction);
        characterData.append("appearance", appearance);
        characterData.append("personality", personality);
        characterData.append("previewImage", previewImage);
        // console.log("Update Character has been submitted!");
        // console.log("Updated Data:");
        // for (const pair of characterData.entries()) {
        //     console.log(pair[0], ":", pair[1]);
        // }
        const serverResponse = await dispatch(thunkUpdateCharacter(characterId, characterData));
        if (typeof serverResponse !== "object") {
            const newCharacterId = serverResponse;
            for (const animeRole of animeRoles) {
                const animeId = animeRole[0];
                const role = animeRole[2];
                if (role !== "none") {
                    await dispatch(thunkAddCharacterToAnime(animeId, newCharacterId, role));
                    await dispatch(thunkAnimeIdLoad(animeId));
                }
                // else {

                // }
            }
            await dispatch(thunkCharacterIdLoad(characterId))
            return navigate(`/character/${newCharacterId}`);
        }
        else {
            return serverResponse.errors;
        }
    }
    useEffect(() => {
        if (submit) {
            const newErrors = {};
            if (fullName.length === 0) {
                newErrors.fullName = "If the character doesn't have a name, then it at least must be called something.";
            }
            else if (fullName.length > 255) {
                newErrors.fullName = "Yeah, I currently can't imagine an anime character who goes around with more than 255 characters as their full name.";
            }
            if (introduction.length === 0) {
                newErrors.introduction = "Please introduce the character!";
            }
            if (appearance.length === 0) {
                newErrors.appearance = `If you can't describe what the character looks like, then you can say something like "Unknown Identity"`;
            }
            if (personality.length === 0) {
                newErrors.personality = "If the character has no personality, then just say so right here rather than leaving this empty!";
            }
            setErrors(newErrors);
        }
    }, [submit, fullName, introduction, appearance, personality, previewImage])

    const animeListCharacterIsIn = useSelector(state => state.characters.characterList[characterId].Anime);
    const animeObjCharacterIsIn = {};
    animeListCharacterIsIn.forEach(anime => animeObjCharacterIsIn[anime.id] = anime);
    const animePostedByUser = useSelector(state => state.session.user["Posted Anime"]);
    const [animeRoles, setAnimeRoles] = useState(animePostedByUser.map(anime => [anime.id, anime.title, animeObjCharacterIsIn[anime.id] ? animeObjCharacterIsIn[anime.id].characterType : "none"]));
    const handleChoiceChange = (position, event) => {
        const updatedAnimeRoles = [...animeRoles];
        updatedAnimeRoles[position][2] = event.target.value;
        setAnimeRoles(updatedAnimeRoles);

        // print to see what it looks like
        console.log(updatedAnimeRoles);
    }

    return (
        <div className="updateCharacterPage">
            <h1>Post a new character!</h1>
            <form className="updateCharacterForm" onSubmit={handleSubmit}>
                <label className="updateCharacterLabels">
                    Full Name
                    <textarea
                        type="text" 
                        value = {fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="What's the character's name?"
                    />
                    {errors.fullName && <p className="updateCharacterErrors">{errors.fullName}</p>}
                </label>
                <label className="updateCharacterLabels">
                    Introduction
                    <textarea
                        type="text"
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)} 
                        placeholder="Introduce the character! What are they about?"
                    />
                    {errors.introduction && <p className="updateCharacterErrors">{errors.introduction}</p>}
                </label>
                <label className="updateCharacterLabels">
                    Appearance
                    <textarea
                        type="text"
                        value={appearance}
                        onChange={(e) => setAppearance(e.target.value)} 
                        placeholder="What does the character look like?"
                    />
                    {errors.appearance && <p className="updateCharacterErrors">{errors.appearance}</p>}
                </label>
                <label className="updateCharacterLabels">
                    Personality
                    <textarea
                        type="text"
                        value={personality}
                        onChange={(e) => setPersonality(e.target.value)} 
                        placeholder="How does the character behave or act?"
                    />
                    {errors.personality && <p className="updateCharacterErrors">{errors.personality}</p>}
                </label>

                <div className="updateCharacterLabels">
                    <ul id="updateCharacterAnimeChoices">
                        {animePostedByUser.map((anime, index) => {
                            return (
                                <li key={index} className="updateCharacterAnime">
                                    <select name="updateRoles" id="updateRoleSelect" value={animeRoles[index][2]} onChange={(event) => handleChoiceChange(index, event)}>
                                        <option value="none">None</option>
                                        <option value="major">Major</option>
                                        <option value="supporting">Supporting</option>
                                        <option value="minor">Minor</option>
                                    </select>
                                    {anime.title}
                                    <img src={anime.previewImage} alt={anime.title} />
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <label className="updateCharacterLabels">
                    <div className="updateCharacterImage">
                        Preview Image
                        <input 
                            className="updateCharacterUploadBtn"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewImage(e.target.files[0])}
                        />
                    </div>
                </label>
                <div className="updateCharacterSubmitContainer"> 
                    <input 
                        className="updateCharacterBtn"
                        type="submit" 
                        value="Submit"
                        disabled={errors.fullName || errors.introduction || errors.appearance || errors.personality}
                    />
                    <button 
                        type="button" 
                        className="updateCharacterBtn"
                        onClick={() => navigate(`/character/${characterId}`)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateCharacterFormPage;