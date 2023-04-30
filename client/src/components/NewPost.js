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
        name : user.name,
        location : "",
        description : "",
        user : user._id
    })

    function base64(file) {
        return new Promise((res, rej) => {
             let fileReader = new FileReader();
             fileReader.readAsDataURL(file);
             fileReader.onload = () => {
                res(fileReader.result)
            };
        })
    }
    
    async function formValidation(e) {
        e.preventDefault();
        setLoader(true);

        // const post = new FormData(e.target);
        // post.append("user", user._id);
        formData.PostImage = await base64(formData.image);

        addNewPost(formData)
        .then(res => {
            if(res.status === "Success") {
                addPost(res.data);
                addPreview("");
                setFormData({
                    image : "",
                    location : "",
                    description : ""
                });
                setLoader(false);
                navigate("../all")
            } else {
                setLoader(false);
                alert(res.message)
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
                    <input type={"text"} id="author" name="name" placeholder="Author" value={formData.name} readOnly required onChange={(e) => {
                        setFormData(pre => {
                            return {
                                ...pre,
                                name : e.target.value
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