import React, { useContext, useEffect, useState } from "react";
import { UserList } from "../contexts/PostviewContext";
import Post from "./Post";
import { getCurrentUser, getToken } from "../utils/tokenStorage";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../utils/api-util";

export default function AllPosts() {

    const { posts, addOnInitial, addUser, addPreview, loading, setLoading, pageNumber, hasMore, setHasMore } = useContext(UserList);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (!getToken()) navigate("/login");
        addPreview("")
        const currentUser = getCurrentUser();
        if (currentUser) addUser(currentUser);
    }, [])

    useEffect(() => {
        setLoading(true)

        getAllPost(pageNumber)
            .then(res => {
                if (res.status === "Success") {
                    setLoader(false);
                    setLoading(false)
                    addOnInitial(res.data.reverse());
                    setHasMore(res.data.length > 0);
                    
                }
                else alert(res.message);
            })
            .catch(err => alert(err.message))
    }, [pageNumber])

    return <>
        {loader ? <div className="post-loader" ></div> :
            (posts.length === 0 ? <h3>No post available...</h3> :
                <>
                {posts.map((post, index) => {
                    return <Post key={post._id} post={post} index={index} length={posts.length} />
                })}
                {loading && <div className="post-loader" ></div>}
                {!hasMore &&
                <div className="nomore">
                    <ion-icon name="checkmark-circle-outline"></ion-icon> <br/>
                    you've seen all posts
                    
                </div>
                 
                 }
                </>
            )}
    </>
}