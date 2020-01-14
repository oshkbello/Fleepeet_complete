import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createNotification } from "../CommonComponents/Notifications";
import Header from '../Header/Header'
import Breadcrumb from "../CommonComponents/BradCrumb";
import Footer from "../Footer/index";
import { getSinglePost } from "../../actions/blogAction";
import moment from 'moment';

class SingleBlogPost extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getSinglePost(id);
    }
    renderPost = () => {

        if (this.props.newPost) {
            return this.props.newPost.map(post => {
                return (
                    <div className="col-md-12 col-sm-12 card">
                        <h1 className="my-4">Post Title: 
                                <small> {post.title}</small>
                        </h1>
                        <img className="card-img-top" style={{ height: "auto" }} src={post.image} alt="Card image cap" />
                        <div style={{ marginBottom: 40, marginTop: 20 }}>
                            <h3>Description</h3>
                            <p className="card-text" >
                                {post.description}
                            </p>
                            <h5 className="card-footer text-muted mb-12"> Posted on {moment(post.publish).format("MMM Do YY")} </h5>
                        </div>
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <Breadcrumb />
                <div className="container">
                    <div className="row mt-10">
                        {this.renderPost()}
                    </div>
                </div>


                <Footer />
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return { newPost: state.posts.post };
};
export default connect(mapStateToProps, {
    getSinglePost
})(SingleBlogPost);
