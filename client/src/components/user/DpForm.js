import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserList } from "../../contexts/PostviewContext";
import { addNewPost, updateUserDp } from "../../utils/api-util";
import ImagePreview from "../ImagePreview";
import { getToken } from "../../utils/tokenStorage";

export default function DpForm({setFalse}) {

    const navigate = useNavigate();
    useEffect(() => {
        if(!getToken()) navigate("/login");
    }, []);

    const [boo, setBoo] = useState(true);
    const {user, addUser, addPreview, preview} = useContext(UserList);
    
    function formValidation(e) {
        e.preventDefault();
setBoo(false);
        const dp = new FormData(e.target);
        
        updateUserDp(dp, user._id)
        .then(res => {
            if(res.status === "Success") {
                addUser(res.user);
                addPreview("");
                setBoo(true);
                setFalse();
            } else {
                setBoo(true)
                alert("Failed to upload, try again...")
            }
            
        })
    }

    return <>
        <div className="new-dp-form">
            <button id="cancel" onClick={() => {
                addPreview("")
                setFalse();
            }}>X</button>
            <form onSubmit={formValidation} >
                <div className="input-field">
                    <input type={"file"} id="file" class="custom-file-input" name="profile_picture" accept="image/*"  required onChange={(e) => {
                        addPreview(URL.createObjectURL(e.target.files[0]));
                    }} />
                </div>
                <div className="preview-container">
                    {preview ? <ImagePreview /> : null}
                </div>
                <div className="btn-container" >
                <button type="submit">{boo ? "change" : <span className="loader"></span>}</button>
            </div>
            </form>
        </div>
    </>
}