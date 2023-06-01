import React from "react";
import heart_icon from "../../images/heart_icon.png"
import rocket_icon from "../../images/rocket_icon.png"
import more_icon from "../../images/more_icon.svg"
import { BASE_URL, deleteUser, updateLikes } from "../../utils/api-util";
import { useContext } from "react";
import { UserList } from "../../contexts/PostviewContext";
import { useState } from "react";

export default function UserPostProfile({ postFromUser, updateUserPost, deleteUserPostList }) {
    const [boo, setBoo] = useState(false)
    const { name, location, likes, description, date, PostImage, _id } = postFromUser;
    const { user, updatePosts, deletePost } = useContext(UserList);
    function likePicture() {
        updateLikes(_id, user._id)
            .then(res => {
                if (res.status === "Success") {
                    updatePosts(res.post);
                    updateUserPost(res.post);
                }
            })
            .catch(err => alert(err.message))
    }

    function deleteUserPost() {
        deleteUser(_id)
            .then(res => {
                if (res.status === "Success") {
                    deleteUserPostList(postFromUser);
                    deletePost(postFromUser);
                    setBoo(false);
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
                    <div className='img-container' onClick={() => setBoo(true)}>
                        <img src={more_icon} alt="rocket_icon" />
                    </div> :
                    <div className="more">
                        <div className="icon-container" onClick={() => setBoo(false)}><ion-icon name="chevron-up"></ion-icon></div>
                        <div className="icon-container"><ion-icon name="create"></ion-icon></div>
                        <div className="icon-container" onClick={deleteUserPost}><ion-icon name="trash"></ion-icon></div>
                    </div>
                }
            </section>

            <section className='post-img' onDoubleClick={likePicture}>
                {
                    (PostImage.type === "image") ?
                        <img src={PostImage.url} alt='Not available' /> :
                        <video controls>
                            <source src={PostImage.url} alt='Not available' />
                        </video>
                }
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

                <div className='like'>{postFromUser.likes.length} likes</div>

                <p className='description'>
                    {description}
                </p>
            </section>
        </div>

    </>
}