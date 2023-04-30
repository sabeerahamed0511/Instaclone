import React from "react";
import { useContext } from "react";
import { UserList } from "../../contexts/PostviewContext";
import { useState } from "react";
import { useEffect } from "react";
import UserPostProfile from "./UserPostProfile";
import DpForm from "./DpForm";
import { BASE_URL } from "../../utils/api-util";

export function ProfilePage() {

    const DP = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";
    const { user, posts } = useContext(UserList);
    let [userPosts, setUserPosts] = useState([]);
    const [changeDp, setChangeDp] = useState(false);

    useEffect(() => {
        let allPosts = posts.filter(({ _id }) => {
            if (user.posts.indexOf(_id) === -1) return false;
            return true;
        });
        setUserPosts(allPosts);
    }, [posts, user]);

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
                {userPosts.map(post => {
                    return <UserPostProfile key={post._id} postFromUser={post} />
                })}
            </div>

        </div>
        {changeDp && <div className="dp-form-container">
            <DpForm setFalse={() => setChangeDp(false)}/>
        </div>}

    </>
}