import React from "react";

export default function USerPostGrid({ postFromUser, ind, setInd }) {

    return <>
        <div className="post-img-container">
            <img src={postFromUser.PostImage.url} alt="instaclone_image" />
            <div className="likes-div" onClick={() => {
                setInd(ind);
                }}><ion-icon name="heart"></ion-icon>&nbsp;{postFromUser.likes.length}</div>
        </div>
    </>
}