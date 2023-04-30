import React from "react";
import heart_icon from "../../images/heart_icon.png"
import rocket_icon from "../../images/rocket_icon.png"
import more_icon from "../../images/more_icon.svg"
import { BASE_URL, deleteUser, updateLikes } from "../../utils/api-util";
import { useContext } from "react";
import { UserList } from "../../contexts/PostviewContext";
import { useState } from "react";

export default function UserPostProfile({ postFromUser }) {
    const [post, setPost] = useState({ ...postFromUser, boo: false })
    const { name, location, likes, description, date, PostImage, _id, boo } = post;
    const { user, updatePosts, deletePost } = useContext(UserList);

    function likePicture() {
        updateLikes(_id, user._id)
            .then(res => {
                if (res.status === "Success") {
                    updatePosts(res.post);
                }
            })
            .catch(err => alert(err.message))
    }

    function deleteUserPost() {
        deleteUser(_id)
        .then(res => {
            if (res.status === "Success") {
                deletePost(post);
                setPost(ex => ({...ex, boo : false}));
            }
        })
        .catch(err => alert(err.message))
    }

    return <>
        <div className='post-container'>

            <section className='post-header'>
                <p>
                    <span className='name'>{name}</span><br />
                    <span className='place'>{location}</span>
                </p>
                {!boo ?
                    <div className='img-container' onClick={() => setPost(ex => ({...ex, boo : true}))}>
                        <img src={more_icon} alt="rocket_icon" />
                    </div> :
                    <div className="more">
                        <div className="icon-container" onClick={() => setPost(ex => ({...ex, boo : false}))}><ion-icon name="chevron-up"></ion-icon></div>
                        <div className="icon-container"><ion-icon name="create"></ion-icon></div>
                        <div className="icon-container" onClick={deleteUserPost}><ion-icon name="trash"></ion-icon></div>
                    </div>
                }
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