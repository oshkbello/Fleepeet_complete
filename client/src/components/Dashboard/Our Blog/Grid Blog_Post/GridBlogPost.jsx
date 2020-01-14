import React, { Component, Fragment } from "react";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import axios from "axios";
import Spinner from "../../../helpers/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllPosts, deletePost } from "../../../../actions/blogAction";
class GridBlogPost extends Component {
  state = { products: null, noOfBooks: [2, 2] };
  componentDidMount() {
    this.props.getAllPosts();
  }
  deleteBook = async postId => {
    if (window.confirm("Are you sure to delete this Blog Post?")) {
      this.props.deletePost(postId);
    }
  };
  renderBlogPost = () => {
    if (this.props.posts === null) {
      return (
        <div style={{ position: "relative", top: "50%", left: "50%" }}>
          <Spinner type="TailSpin" height="100" width="100" />
        </div>
      );
    }
    if (this.props.posts !== null) {
      return this.props.posts.map(post => {
        return (
          // <div class="col-lg-3 col-md-4 col-sm-6 col-12 " key={product.isbn}>
          <div class="col-lg-3 col-md-4 col-sm-6 col-12 ">
            <div class="product">
              <div class="product-inner">
                <img alt="alt" style={{ height: "8rem" }} src={post.image} />
                <div class="cart-btns">
                  <button
                    class="btn btn-danger addcart-btn"
                    onClick={() => this.deleteBook(post._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboardEditBlogPost/${post._id}`}
                    class="btn btn-warning  proedit-btn"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div class="pro-desc">
                <h5
                  style={{
                    overflow: "hidden",
                    "white-space": "nowrap",
                    "text-overflow": "ellipsis",
                    "max-width": "300px"
                  }}
                >
                  <Link to={`/dashboardSingleBlogPost/${post._id}`}>
                    {post.title}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <SideNav>
        <div class="row">
          <div class="col-sm-4 col-4">
            <h4>Blog Posts</h4>
          </div>
          <div class="col-sm-8 col-8 text-right m-b-20">
            <Link
              to="/dashboradCreateBlogPost"
              class="btn btn-warning text-white btn-rounded pull-right"
            >
              <i class="fa fa-plus"></i> Add Blog Post
            </Link>
          </div>
        </div>
        <div class="row">{this.renderBlogPost()}</div>
        {/* <div class="sidebar-overlay" data-reff=""></div> */}
      </SideNav>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts.newPosts };
};

export default connect(mapStateToProps, { deletePost, getAllPosts })(
  GridBlogPost
);
