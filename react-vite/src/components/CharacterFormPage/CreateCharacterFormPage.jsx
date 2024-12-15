import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//! Work In Progress
import { thunkAddCharacterToAnime } from "../../redux/anime";

import { thunkNewCharacter } from "../../redux/character";
import "./CreateCharacterFormPage.css"

const CreateCharacterFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [fullName, setFullName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [appearance, setAppearance] = useState('');
    const [personality, setPersonality] = useState('');
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
        const serverResponse = await dispatch(thunkNewCharacter(characterData));
        if (typeof serverResponse !== "object") {
            const newCharacterId = serverResponse;

            //! Work In Progress
            for (let checkbox of animeIsChecked) {
                const animeId = checkbox[0];
                const isAssociated = checkbox[2];
                if (isAssociated) {
                    dispatch(thunkAddCharacterToAnime(animeId, newCharacterId));
                }
            }

            return navigate(`/character/${newCharacterId}`);
        }
        else {
            return serverResponse.errors;
        }
    }

    // This is to display any invalid input error when the user submit the form!
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
            if (!previewImage) {
                newErrors.previewImage = "If the character's identity is unknown, then an image representing an unknown identity shall do! Otherwise, just look for the character online and upload it here please!";
            }
            setErrors(newErrors);
        }
    }, [submit, fullName, introduction, appearance, personality, previewImage])

    //! Work in progress on adding functionalities for multiple anime choices the character may be in!
    const animePostedByUser = useSelector(state => state.session.user["Posted Anime"]);

    const [animeIsChecked, setAnimeIsChecked] = useState(animePostedByUser.map(anime => [anime.id, anime.title, false]));
    const handleChoiceChange = (position) => {
        const updatedAnimeIsChecked = animeIsChecked.map((anime, index) => {
            return index === position ? [anime[0], anime[1], !anime[2]] : [anime[0], anime[1], anime[2]]
        });
        setAnimeIsChecked(updatedAnimeIsChecked);

        // print to see what it looks like
        console.log(updatedAnimeIsChecked);
    }

    return (
        <div className="createCharacterPage">
            <h1>Post a new character!</h1>
            <form className="createCharacterForm" onSubmit={handleSubmit}>
                <label className="createCharacterLabels">
                    Full Name
                    <textarea
                        type="text" 
                        value = {fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="What's the character's name?"
                    />
                    {errors.fullName && <p className="createCharacterErrors">{errors.fullName}</p>}
                </label>
                <label className="createCharacterLabels">
                    Introduction
                    <textarea
                        type="text"
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)} 
                        placeholder="Introduce the character! What are they about?"
                    />
                    {errors.introduction && <p className="createCharacterErrors">{errors.introduction}</p>}
                </label>
                <label className="createCharacterLabels">
                    Appearance
                    <textarea
                        type="text"
                        value={appearance}
                        onChange={(e) => setAppearance(e.target.value)} 
                        placeholder="What does the character look like?"
                    />
                    {errors.appearance && <p className="createCharacterErrors">{errors.appearance}</p>}
                </label>
                <label className="createCharacterLabels">
                    Personality
                    <textarea
                        type="text"
                        value={personality}
                        onChange={(e) => setPersonality(e.target.value)} 
                        placeholder="How does the character behave or act?"
                    />
                    {errors.personality && <p className="createCharacterErrors">{errors.personality}</p>}
                </label>

                {/* Work in progress on adding the multiple anime checkboxes */}
                <div className="createCharacterLabels">
                    <div>Select which of your posted anime your character is in:</div>
                    <div>{`(Checkboxes Currently Under Development...)`}</div>
                    <ul id="createCharacterAnimeChoices">
                        {animePostedByUser.map((anime, index) => {
                            return (
                                <li key={index} className="createCharacterAnime">
                                    <input 
                                        type="checkbox"
                                        value={anime.title}
                                        checked={animeIsChecked[index][2]}
                                        onChange={() => handleChoiceChange(index)}  
                                    />
                                    {anime.title}
                                    <img src={anime.previewImage} alt={anime.title} />
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <label className="createCharacterLabels">
                    <div className="createCharacterImage">
                        Preview Image
                        <input 
                            className="createCharacterUploadBtn"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPreviewImage(e.target.files[0])}
                        />
                    </div>
                    {errors.previewImage && <p className="createCharacterErrors">{errors.previewImage}</p>}
                </label>
                <div className="createCharacterSubmitContainer"> 
                    <input 
                        className="createCharacterBtn"
                        type="submit" 
                        value="Submit"
                        disabled={errors.fullName || errors.introduction || errors.appearance || errors.personality || errors.previewImage}
                    />
                    <button 
                        type="button" 
                        className="createCharacterBtn"
                        onClick={() => navigate(`/`)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCharacterFormPage;