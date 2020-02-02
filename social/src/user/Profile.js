import React, { Component } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import { read } from './apiUser'
import DefaultProfile from '../images/avatar.png'
import DeleteUser from './DeleteUser'

export default class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    init = (userId) => {
        const token = isAuthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error) {
                    // user is not authenticated, ask them to sign in
                    this.setState({ redirectToSignin: true })
                } else {
                    this.setState({ user: data })
                }
            })

    }


    // grab the props from backend using userId
    componentDidMount() {
        //console.log("user id from route params: ", this.props.match.params.userId)
        const userId = this.props.match.params.userId
        this.init(userId)

    }
    // 
    componentWillReceiveProps(props) {
        const userId = props.match.params.userId
        this.init(userId)
    }

    componen

    render() {
        //const redirectToSignin = this.state.redirectToSignin

        const { redirectToSignin, user } = this.state
        // if there's an error redirect user to signin
        if (redirectToSignin) return <Redirect to="/signin" />

        // if user has image show it
        // else show the default image
        const photoUrl = user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`
            : DefaultProfile;

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{ height: "200px", width: "auto" }}
                            className="img-thumbnail"
                            src={photoUrl} onError={index => (index.target.src = `${DefaultProfile}`)} alt={user.name} />

                    </div>

                    <div className="col-md-8">
                        <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id && (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-success mr-5"
                                    to={`/user/edit/${user._id}`}
                                >Edit Profile</Link>
                                <DeleteUser userId={user._id} />
                            </div>
                        )}

                    </div>

                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <hr />
                        <p className="lead">{user.about}</p>
                        <hr />
                    </div>



                </div>

            </div>
        )
    }
}
