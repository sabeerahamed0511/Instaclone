import React, { useEffect, useState } from "react";
import heart_icon from "../images/heart_icon.png"
import rocket_icon from "../images/rocket_icon.png"
import more_icon from "../images/more_icon.svg"
import { updateLikes, updateUser } from "../utils/api-util";
import { useContext } from "react";
import { UserList } from "../contexts/PostviewContext";

export default function Post({ post }) {
    
    const DP = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";
    const { name, location, likes, description, date, PostImage, _id } = post;
    const { user, updatePosts } = useContext(UserList);
    const [dp, setDp] = useState(null);
    function likePicture() {
        updateLikes(_id, user._id)
            .then(res => {
                if (res.status === "Success") {
                    updatePosts(res.post);
                }
            })
            .catch(err => alert(err.message))
    }

    useEffect(() => {
        updateUser(post.user)
        .then(res => {
            if(res.status === "Success") {
                setDp(res.user.profile_picture);
            }
        })
    })

    return <>
        <div className='post-container'>
            <section className='post-header'>
                <div className="userDpAndName">
                    <div className='img-container' id='dp'>
                        {dp ?
                            <img src={`http://localhost:5000/users/${post.user}/dp/${dp}`} alt="dp" /> :
                            <img src={`${DP}`} alt="dp" />}
                    </div>
                    <p>
                        <span className='name'>{name}</span><br />
                        <span className='place'>{location}</span>
                    </p>
                </div>
                <div className='img-container'>
                    <img src={more_icon} alt="rocket_icon" />
                </div>
            </section>

            <section className='post-img' onDoubleClick={likePicture}>
                <img src={`http://localhost:5000/images/${PostImage}`} alt='Not available' />
            </section>

            <section className='post-footer'>
                <div className='like-share-container'>
                    <div className='like-share-button'>
                        <div className='img-container'>
                            <img src={heart_icon} alt="heart_icon" onClick={likePicture} />
                        </div>
                        <div className='img-container'>
                            <img src={rocket_icon} alt="rocket_icon" />
                        </div>
                    </div>
                    <span className='date'>{date}</span>
                </div>

                <div className='like'>{likes.length} likes</div>

                <p className='description'>
                    {description}
                </p>
            </section>
        </div>

    </>
}