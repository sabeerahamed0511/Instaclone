import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../../utils/api-util";

export default function SignupForm() {
    const navigate = useNavigate()
    const [boo, setBoo] = useState(true);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState("");

    function onFormSubmit(e) {
        e.preventDefault();

        setBoo(false);
        addNewUser(newUser)
            .then(res => {
                if (res.status === "Success") {
                    setNewUser({
                        name: "",
                        email: "",
                        password: ""
                    });
                    setBoo(true);
                    navigate("/login");
                }
                else {
                    setBoo(true);
                    if (res.field) setError(res.message);
                    else alert("Failed to register, ", res.message);
                }
            })
            .catch(err => alert(err.message))
    }
    return <>
        <div id="form-container">
            <form onSubmit={onFormSubmit}>
                <h1>Instaclone</h1>
                <div className="field-container">
                    <input type="text" id="name" name="name" required onChange={e => setNewUser(ex => ({ ...ex, name: e.target.value }))} />
                    <label htmlFor="name">Name...</label>
                    <span><ion-icon name="person"></ion-icon></span>
                </div>

                <div className="field-container">
                    <input type="email" id="email" name="email" required onChange={e => {
                        setNewUser(ex => ({ ...ex, email: e.target.value }));
                        setError("");
                    }} />
                    <label htmlFor="email">Email...</label>
                    <span><ion-icon name="mail"></ion-icon></span>
                    {error && <span className="error">*{error}</span>}
                </div>
                <div className="field-container">
                    <input type="password" id="password" minLength={8} name="password" required onChange={e => setNewUser(ex => ({ ...ex, password: e.target.value }))} />
                    <label htmlFor="name">Password...</label>
                    <span><ion-icon name="lock-closed"></ion-icon></span>
                </div>

                <div className="btn-container" >
                    <button type="submit">{boo ? "Sign-Up" : <span className="loader"></span>}</button>
                    <p>Already have an account?<Link to={"/login"}>Log-In</Link></p>
                </div>
            </form>
        </div>
    </>
}