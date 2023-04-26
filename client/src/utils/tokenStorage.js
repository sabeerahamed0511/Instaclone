const TOKEN_KEY = "jwtToken";
const USER_KEY = "currentUser";

//TOKEN
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    return localStorage.setItem(TOKEN_KEY, token);
}

export function deleteToken() {
    return localStorage.removeItem(TOKEN_KEY);
}

//USER
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

export function setCurrentUser(user) {
    return localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function deleteCurrentUser() {
    return localStorage.removeItem(USER_KEY);
}