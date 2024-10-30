import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./UserProfileCharacters.css";

function UserProfileCharacters () {
    const { userId } = useParams();
    const userList = useSelector(state => state.users.userList);
    const userInProfile = userList && userList[userId];
    const postedCharacters = userInProfile && userInProfile['Posted Characters'];
    return (
        postedCharacters && postedCharacters.length > 0 ?
            <div id="posted-character-list">
                {postedCharacters.map(character => {
                    return (
                        <NavLink key={character.id} className='posted-character-card'
                        to={`/character/${character.id}`}>
                            <img src={character.previewImage} alt={character.fullName} />
                            <h2>{character.fullName}</h2>
                        </NavLink>
                    )
                })}
            </div>
        :
            <h1 id='no-posted-characters'>{`${userInProfile.firstName} haven't posted any characters!`}</h1>
    )
}

export default UserProfileCharacters;