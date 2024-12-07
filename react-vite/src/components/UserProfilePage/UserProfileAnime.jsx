import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./UserProfileAnime.css";

function UserProfileAnime () {
    const { userId } = useParams();
    const userList = useSelector(state => state.users.userList);
    const userInProfile = userList && userList[userId];
    //! Error! Whenever the user deletes the anime, it doesn't update on their "Posted Anime" in their User Profile Page!
    const postedAnime = userInProfile && userInProfile['Posted Anime'];
    return (
        postedAnime && postedAnime.length > 0 ?
            <div id="posted-anime-list">
                {postedAnime.map(anime => {
                    return (
                        <NavLink key={anime.id} className='posted-anime-card' to={`/anime/${anime.id}`}>
                            <img src={anime.previewImage} alt={anime.title} />
                            <h2>{anime.title}</h2>
                        </NavLink>
                    )
                })}
            </div>
        :
            <h1 id="no-posted-anime">{`${userInProfile.firstName} haven't posted any anime!`}</h1>
    )
}

export default UserProfileAnime;