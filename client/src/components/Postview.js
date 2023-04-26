import React, { useContext, useEffect } from 'react';
import circle_icon from "../images/circle_icon.svg"
import camera_icon from "../images/camera_icon.png"
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { deleteCurrentUser, deleteToken, getToken } from '../utils/tokenStorage';
import { UserList } from '../contexts/PostviewContext';

export default function Postview() {

    const DP = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";
    const { user } = useContext(UserList);
    const navigate = useNavigate();
    useEffect(() => {
        if (!getToken()) navigate("/login");
    }, [])

    return <>
        <div id='postview-container'>
            <header id='head-container'>
                <section id='left-section' onClick={() => navigate("all")}>
                    <div id='img-container'>
                        <img src={circle_icon} alt="circle_icon" />
                    </div>
                    <h2>Instaclone</h2>
                </section>

                <section id='right-section'>
                    <button className='nav' onClick={() => {
                        deleteToken();
                        deleteCurrentUser();
                        navigate("/login");
                    }}>Log-Out</button>
                    <div className='img-container' id='dp'>
                        <Link to={`../user/${user._id}`} >
                        {user.profile_picture ?
                        <img src={`http://localhost:5000/users/${user._id}/dp/${user.profile_picture}`} alt="dp" /> :
                        <img src={`${DP}`} alt="dp" /> }
                        </Link>
                    </div>
                    <div className='img-container'>
                        <Link to={"new"} >
                            <img src={camera_icon} alt="camera_icon" />
                        </Link>
                    </div>
                </section>
            </header>

            <div id='posts'>
                <Outlet />
            </div>
        </div>
    </>
}
