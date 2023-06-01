import React from "react";

export default function USerPostGrid({ postFromUser, ind, setInd }) {

    return <>
        <div className="post-img-container">
            {
                (postFromUser.PostImage.type === "image") ?
                    <img src={postFromUser.PostImage.url} alt='Not available' /> :
                    <video controls>
                        <source src={postFromUser.PostImage.url} alt='Not available' />
                    </video>
            }
            <div className="likes-div" onClick={() => {
                setInd(ind);
            }}><ion-icon name="heart"></ion-icon>&nbsp;{postFromUser.likes.length}</div>
        </div>
    </>
}