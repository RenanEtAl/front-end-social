
export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => 
            console.log(err)
        )
}

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

export const remove = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => 
            console.log(err)
        )

}

export const update = (userId, token, user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            // get the token from local storage
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json()
        })
        .catch(err => 
            console.log(err)
        )
}

export const updateUser = (user,next)=>{
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('jwt')){
            //jwt has two props: auth and user
            let auth = JSON.parse(localStorage.getItem('jwt'))
            // grab the user
            auth.user = user
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }

}