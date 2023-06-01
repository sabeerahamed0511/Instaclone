import React, { useContext } from "react";
import { UserList } from "../contexts/PostviewContext";

export default function ImagePreview({ type }) {

    const { preview } = useContext(UserList);

    return <>
        <div id="preview-img-container">
            {
                (type === "image") ?
                    <img src={preview} alt="preview" /> :
                    <video controls autoPlay onLoad={e => e.target.play()}>
                        <source src={preview} />
                    </video>
            }

        </div>
    </>

}