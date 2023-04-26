import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserList } from "../contexts/PostviewContext";
import { addNewPost } from "../utils/api-util";
import ImagePreview from "./ImagePreview";
import { getToken } from "../utils/tokenStorage";

export default function NewPost() {

    const navigate = useNavigate();
    useEffect(() => {
        if(!getToken()) navigate("/login");
    }, []);

    const {user, addPost, addPreview, preview} = useContext(UserList);

    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        image : "",
        author : user.name,
        location : "",
        description : ""
    })
    
    function formValidation(e) {
        e.preventDefault();
        setLoader(true);

        const post = new FormData(e.target);
        post.append("user", user._id);
        
        addNewPost(post)
        .then(res => {
            if(res.status === "Success") {
                addPost(res.data);
                addPreview("");
                setFormData({
                    image : "",
                    author : "",
                    location : "",
                    description : ""
                });
                setLoader(false);
                navigate("../all")
            } else {
                setLoader(false);
                alert("Failed to create post, try again...")
            }
            
        })
    }

    return <>
        <div className="new-post-form">
            <button id="cancel" onClick={() => {
                addPreview("")
                navigate("/posts/all");
            }}>X</button>
            <form onSubmit={formValidation} >
                <div className="input-field">
                    <input type={"file"} id="file" name="PostImage" accept="image/*" required onChange={(e) => {
                        addPreview(URL.createObjectURL(e.target.files[0]));
                        setFormData(pre => {
                            return {
                                ...pre,
                                image : e.target.files[0]
                            }
                        })
                    }} />
                </div>
                <div id="preview-container">
                    {preview ? <ImagePreview /> : null}
                </div>
                <div className="input-field row-1">
                    <input type={"text"} id="author" name="name" placeholder="Author" value={formData.author} readOnly required onChange={(e) => {
                        setFormData(pre => {
                            return {
                                ...pre,
                                author : e.target.value
                            }
                        })
                    }} />
                    <input type={"text"} id="location" name="location" placeholder="Location" value={formData.location} required onChange={(e) => {
                        setFormData(pre => {
                            return {
                                ...pre,
                                location : e.target.value
                            }
                        })
                    }} />
                </div>
                <div className="input-field row-2">
                    <textarea type={"text"} id="description" name="description" placeholder="Description" value={formData.description} required onChange={(e) => {
                        setFormData(pre => {
                            return {
                                ...pre,
                                description : e.target.value
                            }
                        })
                    }} />
                </div>
                {
                    !loader ?
                    <div className="input-field row-3">
                        <button type={"submit"} id="post-btn">Post</button>
                    </div> :
                    <div id="loader-preview">
                        <div id="loader-container">
                            <span id="loader"></span>
                        </div>
                    </div>
                }
            </form>
        </div>
    </>
}