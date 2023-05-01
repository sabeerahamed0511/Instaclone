import React, { createContext, useEffect, useState } from "react";
import { getAllPost, updateUser } from "../utils/api-util";
import { getCurrentUser, setCurrentUser } from "../utils/tokenStorage";

export const UserList = createContext()

export default function PostviewContext({ children }) {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [preview, setPreview] = useState("");
    function updatePosts(post) {
        setPosts(posts.map(ex => {
            if(post._id === ex._id) return post
            return ex
        }))
    }

    function deletePost(post) {
        setPosts(posts.filter(ex => {
            if(post._id === ex._id) return false
            return true
        }))
    }

    useEffect(() => {
        if(getCurrentUser()) setUser(getCurrentUser());
    }, []);

    return <UserList.Provider value={{
        user,
        addUser: (data) => {
            setCurrentUser(data);
            setUser(data);
        },
        posts: posts,
        addOnInitial : (data) => setPosts(data),
        addPost: (post) => {
            const updated = [post, ...posts];
            setPosts(updated);
            updateUser(user._id)
                .then(res => {
                    setCurrentUser(res.user);
                    setUser(res.user);
                })
        },
        updatePosts,
        deletePost,
        preview,
        addPreview: (url) => setPreview(url)
    }}>
        {children}
    </UserList.Provider>
}

