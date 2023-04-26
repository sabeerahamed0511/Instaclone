import React, { useContext, useEffect } from "react";
import { UserList } from "../contexts/PostviewContext";
import Post from "./Post";
import { getCurrentUser, getToken } from "../utils/tokenStorage";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../utils/api-util";

export default function AllPosts() {

    const {posts, addOnInitial, addUser, addPreview} = useContext(UserList);
    const navigate = useNavigate();

    useEffect(() => {
        if(!getToken()) navigate("/login");

        getAllPost()
        .then(res => {
            if(res.status === "Success") addOnInitial(res.data.reverse()); 
            else alert(res.message);
        })
        .catch(err => alert(err.message))
        addPreview("")
        const currentUser = getCurrentUser();
        if (currentUser) addUser(currentUser);
    }, [])

    return <>      
        { posts.length === 0 ? <h3>No post available...</h3> : 
        posts.map(post => {                 
            return  <Post key={post._id} post={post} />
        })}
    </>
}