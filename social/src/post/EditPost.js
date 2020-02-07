import React, { Component } from 'react'
import { singlePost, update } from './apiPost'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import DefaultPost from '../images/cat.jpg'


export default class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            title: '',
            body: '',
            redirectToProfile: false,
            error: '',
            fileSize: 0,
            loading: false
        }
    }

    init = (postId) => {
        //const token = isAuthenticated().token
        singlePost(postId)
            .then(data => {
                if (data.error) {
                    // user is not authenticated, ask them to sign in
                    this.setState({ redirectToProfile: true })
                } else {
                    this.setState({
                        id: data._id,
                        title: data.title,
                        body: data.body,
                        error: '',

                    })
                }
            })

    }


    // grab the props from backend using postId
    componentDidMount() {
        this.postData = new FormData()
        const postId = this.props.match.params.postId
        this.init(postId)

    }
    // higher order function
    // event is for the onChange event
    handleChange = (name) => (event) => {
        this.setState({ error: "" });
        // grab the file input
        // this will handle the name, email, password
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;
        // populate the user data
        this.postData.set(name, value)
        this.setState({ [name]: value, fileSize: fileSize })

    }

    clickSubmit = (event) => {
        event.preventDefault()
        this.setState({ loading: true })

        if (this.isValid()) {
            // if it passes the validation
            const postId = this.state.id
            const token = isAuthenticated().token
            // update post
            update(postId, token, this.postData)
                // get response from update method
                .then(data => {
                    if (data.error) this.setState({ error: data.error });
                    else {
                        // clear the old fields
                        this.setState({ loading: false, title: '', body: '', photo: '', redirectToProfile: true })
                    }
                })
        }
    }
    // client side validation
    isValid = () => {
        const { title, body, fileSize } = this.state
        // if file size is > 1mb
        if (fileSize > 100000) {
            this.setState({ error: "File size should be less than 100kb", loading: false })
            return false
        }
        // if no user input
        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "Title and body are both required", loading: false })
            return false
        }

        return true
    }

    editPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input onChange={this.handleChange("photo")}
                    type="file" accept="image/*"
                    className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={this.handleChange("title")}
                    type="text" className="form-control"
                    value={title} />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea onChange={this.handleChange("body")}
                    type="text" className="form-control"
                    value={body} />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                Update Post
            </button>


        </form>
    )


    render() {
        const { id, title, body, redirectToProfile, error, loading, name, email, password, about } = this.state
        if (redirectToProfile) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />
        }
        return (
            <div className="container" >
                <h2 className="mt-5 mb-5">{title}</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>{error}</div>

                {loading ? (<div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>) : ("")}

                <img
                    style={{ height: "200px", width: "auto" }}
                    className="img-thumbnail"
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${id}}?${new Date().getTime()}`}
                    onError={index => (index.target.src = `${DefaultPost}`)} alt={title} />
                
                {isAuthenticated().user.role === "admin" ||
                    (isAuthenticated().user._id === id &&
                        this.signupForm(name, email, password, about))}
            </div>
        )
    }
}
