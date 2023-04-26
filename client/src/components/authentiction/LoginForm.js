import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginToAccount } from "../../utils/api-util";
import { setToken } from "../../utils/tokenStorage";
import { UserList } from "../../contexts/PostviewContext";

export default function LoginForm() {
    const navigate = useNavigate();
    const [boo, setBoo] = useState(true);
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const { addUser } = useContext(UserList);
    function onFormSubmit(e) {
        e.preventDefault();

        setBoo(false);
        loginToAccount(loginUser)
            .then(res => {
                if (res.status === "Success") {
                    setToken(res.token);
                    addUser(res.user);
                    setLoginUser({
                        email: "",
                        password: ""
                    });
                    setBoo(true);
                    navigate("/posts/all");
                }
                else {
                    setBoo(true);
                    if (res.field) setError(ex => ({ ...ex, [res.field]: res.message }));
                    else alert("Failed to log-in, ", res.message);
                }
            })
            .catch(err => alert(err.message))
    }

    return <>
        <div id="form-container">
            <form onSubmit={onFormSubmit}>
                <h1>Instaclone</h1>
                <div className="field-container">
                    <input type="email" id="email" name="email" required onChange={e => {
                        setLoginUser(ex => ({ ...ex, email: e.target.value }));
                        setError(ex => ({ ...ex, email: "" }));
                    }} />
                    <label htmlFor="email">Email...</label>
                    <span><ion-icon name="mail"></ion-icon></span>
                    {error.email && <span className="error">*{error.email}</span>}
                </div>
                <div className="field-container">
                    <input type="password" id="password" minLength={8} name="password" required onChange={e => {
                        setLoginUser(ex => ({ ...ex, password: e.target.value }));
                        setError(ex => ({ ...ex, password: "" }));
                    }} />
                    <label htmlFor="name">Password...</label>
                    <span><ion-icon name="lock-closed"></ion-icon></span>
                    {error.password && <span className="error">*{error.password}</span>}
                </div>
                <div className="btn-container" >
                    <button type="submit">{boo ? "Log-In" : <span className="loader"></span>}</button>
                    <p>Dont have an account?<Link to={"/register"}>Sign-Up</Link></p>
                </div>
            </form>
        </div>
    </>
}