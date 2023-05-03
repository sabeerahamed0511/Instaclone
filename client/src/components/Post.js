import React, { useCallback, useEffect, useRef, useState } from "react";
import heart_icon from "../images/heart_icon.png"
import rocket_icon from "../images/rocket_icon.png"
import more_icon from "../images/more_icon.svg"
import { BASE_URL, updateLikes, updateUser } from "../utils/api-util";
import { useContext } from "react";
import { UserList } from "../contexts/PostviewContext";

export default function Post({ post, index, length }) {
    
    const DP = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg";
    const { name, location, likes, description, date, PostImage, _id } = post;
    const { user, updatePosts, loading, setPageNumber, hasMore} = useContext(UserList);
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
                setDp(res.user.profile_picture.url);
            }
        })
    })

    const lastPost = useRef();
    const lastPostRef = useCallback(node => {
        if(!hasMore) return
        if(loading) return
        if(lastPost.current) lastPost.current.disconnect();
        lastPost.current = new IntersectionObserver(entry => {
            if(entry[0].isIntersecting) setPageNumber(ex => (ex + 1));
        }, {threshold : 1} );
        if(node) lastPost.current.observe(node);
    }, [loading])

    return <>
        <div className='post-container' ref={(index + 1 === length)? lastPostRef : null}>
            <section className='post-header'>
                <div className="userDpAndName">
                    <div className='img-container' id='dp'>
                        {dp ?
                            <img src={dp} alt="dp" /> :
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
                <img src={PostImage.url} alt='Not available' />
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