import React, { Component } from 'react'

class Signup extends Component {
    // state to hold and store the value
    constructor() {
        super()
        this.state = {
            name: "",
            email: "",
            password: "",
            error: ""
        }
    }
    // higher order function
    // event is for the onChange event
    handleChange = (name) => (event) => {
        // this will handle the name, email, password
        this.setState({ [name]: event.target.value })

    }

    clickSubmit = (event) => {
        event.preventDefault()
        const { name, email, password } = this.state
        const user = {
            name: name,
            email: email,
            password: password
        }
        //console.log(user)
        // send to back end server
        fetch("http://localhost:8080/signup", {
            method: "POST",
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

    render() {

        const { name, email, password } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup page</h2>

                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" className="form-control" value={name} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Submit
                    </button>


                </form>


            </div>

        )
    }
}


export default Signup