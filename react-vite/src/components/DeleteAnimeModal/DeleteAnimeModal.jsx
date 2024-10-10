import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteAnimeModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    return (
        <>
            <h1>Sure you want to permanently delete your anime post?</h1>
            <button>Confirm Delete</button>
            <button>Nevermind</button>
        </>
    )
}

export default DeleteAnimeModal;