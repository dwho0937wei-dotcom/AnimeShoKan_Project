import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkNewAnime } from "../../redux/anime";
import "./CreateCharacterFormPage.css"

const CreateCharacterFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [fullName, setFullName] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [appearance, setAppearance] = useState('');
    const [personality, setPersonality] = useState('');

    return (
        <div className="createCharacterPage">
            <h1>Post a new character!</h1>
            <form className="createCharacterForm">
                <label className="createCharacterLabels">
                    Full Name
                    <textarea
                        type="text" 
                        value = {fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="What's the character's name?"
                    />
                </label>
                <label className="createCharacterLabels">
                    Introduction
                    <textarea
                        type="text"
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)} 
                        placeholder="Introduce the character! What are they about?"
                    />
                </label>
                <label className="createCharacterLabels">
                    Appearance
                    <textarea
                        type="text"
                        value={appearance}
                        onChange={(e) => setAppearance(e.target.value)} 
                        placeholder="What does the character look like?"
                    />
                </label>
                <label className="createCharacterLabels">
                    Personality
                    <textarea
                        type="text"
                        value={personality}
                        onChange={(e) => setPersonality(e.target.value)} 
                        placeholder="How does the character behave or act?"
                    />
                </label>
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
                </label>
                <div className="createCharacterSubmitContainer"> 
                    <input 
                        className="createCharacterBtn"
                        type="submit" 
                        value="Submit"
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