import React, { Component } from 'react'
import { list } from './apiUser'
import DefaultProfile from '../images/avatar.png'
import { Link } from 'react-router-dom'

export default class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        // list the users
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ users: data })
            }

        })

    }

    renderUsers = users => (
        <div className="row">
            {this.state.users.map((user, index) => (
                <div className="card col-md-4" key={index}>
                    <img
                        style={{ height: "200px", width: "100%" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
                        onError={index => (index.target.src = `${DefaultProfile}`)} alt={user.name} />


                    <div className="card-body">

                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary btn-sm">View Profile

                        </Link>
                    </div>
                </div>

            ))}
        </div>
    );

    render() {

        //const { users } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUsers()}
            </div>
        )
    }
}
