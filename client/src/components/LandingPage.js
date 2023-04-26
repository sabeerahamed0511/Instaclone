import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../utils/tokenStorage";
export default function LandingPage() {

  const navigate = useNavigate();
    useEffect(() => {
        if(getToken()) navigate("/posts/all");
    }, [])

  return <div id='home-page'>
    <h1>Instaclone</h1>
    <p>Sign up to see posts from your friends.</p>
    <div><Link to={"/login"}>Log-In</Link> Or <Link to={"/register"}>Sign-Up</Link></div>
  </div>
}