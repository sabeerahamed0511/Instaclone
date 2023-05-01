import React from "react";
import { useContext } from "react";
import { UserList } from "../../contexts/PostviewContext";
import { useState } from "react";
import { useEffect } from "react";
import UserPostProfile from "./UserPostProfile";
import DpForm from "./DpForm";
import { BASE_URL, getAllUserPost } from "../../utils/api-util";
import { getCurrentUser, getToken } from "../../utils/tokenStorage";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {

    const navigate = useNavigate();
    const DP = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";
    const { user, posts, addUser } = useContext(UserList);
    let [userPosts, setUserPosts] = useState([]);
    const [changeDp, setChangeDp] = useState(false);

    useEffect(() => {
        if (!getToken()) navigate("/login");

        getAllUserPost(getCurrentUser()._id)
            .then(res => {
                if (res.status === "Success") setUserPosts(res.data.reverse());
                else alert(res.message);
            })
            .catch(err => alert(err.message))
        const currentUser = getCurrentUser();
        if (currentUser) addUser(currentUser);
    }, []);
   
    return <>
        <div className="profilePage-container" >
            <header>
                <section className="left-section">
                    <div className='img-container' id='dp'>
                        {user.profile_picture ?
                            <img src={user.profile_picture.url} alt="dp" /> :
                            <img src={`${DP}`} alt="dp" />}
                    </div>
                    <h3>{user.name}</h3>
                    <h5 onClick={() => setChangeDp(true)}>change_dp</h5>
                </section>
                <section className="right-section">
                    <h4>No Of Posts</h4>
                    <h4>{userPosts.length}</h4>
                </section>

            </header>
            <div className="userPosts">
                <div className="posts-grid" >
                    {userPosts.map(post => {
                        return <UserPostProfile key={post._id} postFromUser={post}
                            updateUserPost={(data) => {
                                setUserPosts(userPosts.map(ex => {
                                    if (data._id === ex._id) return data
                                    return ex
                                }))
                            }}
                            deleteUserPostList={(data) => {
                                setUserPosts(userPosts.filter(ex => {
                                    if (data._id === ex._id) return false
                                    return true
                                }))
                            }} />
                    })}
                </div>
            </div>

        </div>
        {changeDp && <div className="dp-form-container">
            <DpForm setFalse={() => setChangeDp(false)} />
        </div>}

    </>
}