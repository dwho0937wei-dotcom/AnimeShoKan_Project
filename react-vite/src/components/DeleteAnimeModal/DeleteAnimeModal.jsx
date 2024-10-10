import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './DeleteAnimeModal.css'

function DeleteAnimeModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleDelete = () => {
        console.log("Anime confirming to be deleted!")
        closeModal();
        return navigate(``);
    }
    const handleCancel = () => {
        console.log("Deleting anime canceled!")
        closeModal();
    }

    return (
        <div className="deleteModal">
            <h1>Sure you want to permanently delete your anime post?</h1>
            <div className="container">
                <div className="twoBtns">
                    <button onClick={handleDelete}>Confirm Delete</button>
                    <button onClick={handleCancel}>Nevermind</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAnimeModal;