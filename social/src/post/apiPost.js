
export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json()
        })
        .catch(err =>
            console.log(err)
        )
}

export const list = (page) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/?page=${page}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const singlePost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const listByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-type": 'application/json',
            // get the token from local storage
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const remove = (postId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const update = (postId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json()
        })
        .catch(err =>
            console.log(err)
        )
}
// which user likes post
export const like = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        // put userId in the likes array
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        },
        // send userId and postId
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json()
        })
        .catch(err =>
            console.log(err)
        )
}

// which user unlikes post
export const unlike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        },
        // send userId and postId
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json()
        })
        .catch(err =>
            console.log(err)
        )
}

export const comment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        // put userId in the likes array
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        },
        // send userId, postId, comment
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json()
        })
        .catch(err =>
            console.log(err)
        )
}

export const uncomment = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
        // put userId in the likes array
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        },
        // send userId, postId, comment
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json()
        })
        .catch(err =>
            console.log(err)
        )
}

