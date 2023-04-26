import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPosts from "./AllPosts";
import LandingPage from "./LandingPage";
import NewPost from "./NewPost";
import Postview from "./Postview";
import SignupForm from "./authentiction/SignupForm";
import LoginForm from "./authentiction/LoginForm";
import { ProfilePage } from "./user/ProfilePage";


export default function AppRouter() {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            <Route path="posts" element={<Postview/>} >
                <Route path="all" element={<AllPosts />} />
                <Route path="new" element={<NewPost/>} />
            </Route>
        </Routes>
    </BrowserRouter>
}