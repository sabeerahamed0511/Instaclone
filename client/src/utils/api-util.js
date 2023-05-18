import { getToken, setCurrentUser } from "./tokenStorage";

// export const BASE_URL = "http://localhost:5000"
export const BASE_URL = "https://instaclone-server-8j4r.onrender.com"

export function getAllPost(pageNumber) {

    return fetch(`${BASE_URL}/posts?page=${pageNumber}`, {
        method: "GET",
        headers: {
            "Authorization": getToken()
        }
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

export function getAllUserPost(id) {

    return fetch(`${BASE_URL}/posts/${id}`, {
        method: "GET",
        headers: {
            "Authorization": getToken()
        }
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

export function addNewPost(post) {
    return fetch(`${BASE_URL}/post`, {
        method: "POST",
        headers: {
            "Authorization": getToken(),
            "content-type" : "application/json",
            "accept" : "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

export function updateUserDp(dp, id) {
    return fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": getToken(),
            "content-type" : "application/json",
            "accept" : "application/json"
        },
        body: JSON.stringify({dp})
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

export function updateLikes(id, user) {
    return fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": getToken(),
            "content-type": "application/json"
        },
        body: JSON.stringify({user})
    })
        .then(res => res.json())
        .catch(err => alert(err.message+" from put req"));
}

export function addNewUser(data) {
    return fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

export function updateUser(id) {
    return fetch(`${BASE_URL}/users/${id}`, {
        method: "GET",
        headers: {
            "Authorization": getToken()
        }
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

export function deleteUser(id) {
    return fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": getToken()
        }
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}

export function loginToAccount(data) {
    return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => alert(err.message));
}