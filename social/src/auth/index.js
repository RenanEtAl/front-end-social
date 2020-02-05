export const signup = (user) => {
    //console.log(user)
    // make a post request using fetch
    // send to back end server
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)

    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const signin = (user) => {
    //console.log(user)
    // make a post request using fetch
    // send to back end server
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)

    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const authenticate = (jwt, next) => {
    // if the window is not undefined
    // for rendering purpose
    if (typeof window !== "undefined") {
        // store jwt in browser's localStorage
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }
}
// takes another call back func as an arg
// next arg redirects the user
export const signout = (next) => {
    if (typeof window !== "undefined") localStorage.removeItem("jwt")
    next()
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response)
            return response.json()
        })
        .catch((err) => console.log(err))
}
// useful for hiding links such as signup and signin
export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}

export const forgotPassword = email => {
    console.log("email", email)
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    }).then(response => {
        console.log("forgot password response", response)
        return response.json()
    }).catch(err => console.log(err))
}

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ resetInfo })
    }).then(response => {
        console.log("forgot password response: ", response)
        return response.json()
    }).catch(err => console.log(err))
}