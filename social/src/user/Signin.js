import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { signin, authenticate } from '../auth'

class Signin extends Component {
    // state to hold and store the value
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            recaptcha: false
        }
    }
    // higher order function
    // event is for the onChange event
    handleChange = (name) => (event) => {
        // this will handle the name, email, password
        // whenever the user types new text on the field the error message goes away
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })

    }


    clickSubmit = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const { email, password } = this.state
        const user = {
            email,
            password
        }
        if(this.state.recaptcha){
            signin(user)
            // get response
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false });
                } else {
                    // authenticate
                    // get the jwt token
                    // redirect
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    })
                } 
            })

        } else {
            this.setState({
                loading: false,
                error: "Wrong answer. What day is today?"
            })
        }
    }
    // get event as input and use event.target.value to get the user input
    recaptchaHandler = (e) => {
        this.setState({ error: "" })
        // convert user input to lowercase
        let userDay = e.target.value.toLowerCase()
        let dayCount
        // for each day, update dayCount variable with the number
        // and use new Date().getDay() to get the current day
        // if it's sunday it returns 0, monday => 1,.. etc
        if (userDay === 'sunday') {
            dayCount = 0
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }
        // compare the user input with today's day
        if(dayCount === new Date().getDay()) {
            this.setState({recaptcha: true})
            return true
        } else {
            this.setState({recaptcja: false})
        }

        // return true after setting the state


    }


    signinForm = (email, password, recaptcha) => (
        <form>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={this.handleChange("email")} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={this.handleChange("password")} type="password" className="form-control" value={password} />
            </div>
            <div className="form-group">
                <label className="text-muted">
                    {recaptcha ? "Thanks. You got it!" : "What day is today?"}
                </label>

                <input
                    onChange={this.recaptchaHandler}
                    type="text"
                    className="form-control"
                />
            </div>


            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                Submit
            </button>


        </form>
    )


    render() {

        const { email, password, error, redirectToReferer, loading, recaptcha } = this.state
        if (redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Sign In</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>{error}</div>
                {loading ? (<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>) : ("")}
                {this.signinForm(email, password, recaptcha)}

                <p>
                    <Link to="/forgot-password" className="text-danger">
                        {" "}
                        Forgot Password
                    </Link>
                </p>

            </div>


        )
    }
}


export default Signin