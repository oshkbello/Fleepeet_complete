import React from "react";
import TopHeading from "../CommonComponents/TopHeading";
import { getHomePosts } from "../../actions/blogAction";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

class OurBlog extends React.Component {
  componentDidMount() {
    this.props.getHomePosts();
  }
  render() {
    const newPosts = this.props.posts.newPosts;
    return (
      <section className="wn__recent__post bg--gray ptb--80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center">
                <TopHeading
                  Title="Our"
                  Heading="Blog"
                  Paragraph="Read new stories in our blog"
                />
              </div>
            </div>
          </div>
          <div className="row mt--50">
            {newPosts.map(post => (
              <div className="col-md-6 col-lg-4 col-sm-12">
                <div className="post__itam">
                  <div className="content">
                    <img
                      className="card-img-top"
                      style={{ height: "10rem" }}
                      src={post.image}
                      alt="Card image cap"
                    />
                    <h3 
                      style={{
                        "overflow": "hidden",
                        "white-space": "nowrap",
                        "text-overflow": "ellipsis",
                        "max-width": "300px"
                      }}
                    >
                      <Link to={`/blog-details/${post._id}`}>
                        {post.title}{" "}
                      </Link>
                    </h3>
                    <p 
                      style={{
                        "overflow": "hidden",
                        "white-space": "nowrap",
                        "text-overflow": "ellipsis",
                        "max-width": "350px"
                      }}
                    >
                      {post.description}
                    </p>
                    <div className="post__time">
                      <span className="day">
                        {moment(post.publish).format("MMM Do YY")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return { posts: state.posts };
};
export default connect(mapStateToProps, { getHomePosts })(OurBlog);
