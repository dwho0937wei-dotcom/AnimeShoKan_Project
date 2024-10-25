import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetUserById } from '../../redux/user';
import './UserProfilePage.css';

function UserProfilePage () {
    const dispatch = useDispatch();

    const { userId } = useParams();
    const userList = useSelector(state => state.userList);
    const userInProfile = userList && userList[userId];
    useEffect(() => {
        if (!userList || !userInProfile) {
            dispatch(thunkGetUserById(userId))
        }
    }, [])

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