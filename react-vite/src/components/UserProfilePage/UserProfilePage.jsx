import { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetUserById } from '../../redux/user';
import './UserProfilePage.css';

function UserProfilePage () {
    const dispatch = useDispatch();

    const { userId } = useParams();
    const userList = useSelector(state => state.users.userList);
    const userInProfile = userList && userList[userId];
    useEffect(() => {
        if (!userList || !userInProfile) {
            dispatch(thunkGetUserById(userId))
        }
    }, [])

    return (
        userInProfile && 
            <div id='userProfilePage'>
                <div id='circle'>{userInProfile.firstName[0].toUpperCase()}</div>
                <div id='postedNavLinks'>
                    <NavLink className="postedNavLink" to="posted-anime">Posted Anime</NavLink>
                    <NavLink className="postedNavLink">Posted Characters</NavLink>
                </div>
                <h1>Welcome to the User Profile Page!</h1>
                <main id='mainUserPosts'>
                    <Outlet />
                </main>
            </div>
    )
}

export default UserProfilePage;