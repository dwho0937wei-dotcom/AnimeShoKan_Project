import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./UserProfileAnime.css";

function UserProfileAnime () {
    const { userId } = useParams();
    const userList = useSelector(state => state.users.userList);
    const userInProfile = userList && userList[userId];
    const postedAnime = userInProfile && userInProfile['Posted Anime'];
    return (
        postedAnime && 
            <div id="posted-anime-list">
                {postedAnime.map(anime => {
                    return (
                        <div key={anime.id} className='posted-anime-card'>
                            <img src={anime.previewImage} alt={anime.title} />
                            <h2>{anime.title}</h2>
                        </div>
                    )
                })}
            </div>
    )
}

export default UserProfileAnime;