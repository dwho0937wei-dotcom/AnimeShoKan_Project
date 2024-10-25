import { NavLink } from 'react-router-dom';
// import { NavLink, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './UserProfilePage.css';

function UserProfilePage () {
    // const { userId } = useParams();
    // const user = useSelector(state)

    return (
        <div id='userProfilePage'>
            <div id='circle'>U</div>
            <div id='postedNavLinks'>
                <NavLink className="postedNavLink">Posted Anime</NavLink>
                <NavLink className="postedNavLink">Posted Characters</NavLink>
            </div>
            <h1>Welcome to the User Profile Page!</h1>
        </div>
    )
}

export default UserProfilePage;