import React, { Component, Fragment } from "react";
import Header from "../Header/Header";
import BreadCrumb from "../CommonComponents/BradCrumb";
import Footer from "../Footer/index";
import ItemsCarousel from "react-items-carousel";
import axios from "axios";
import { Field, reduxForm, reset } from "redux-form";
import { renderField } from "../CommonComponents/RenderFormField";
import { required } from "../CommonComponents/FormValidations";
import { createNotification } from "../CommonComponents/Notifications";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getUserProfileData } from "../../actions/userProfile";
import ReportSeller from "./ReportSeller";
class Profile extends Component {
  state = { info: null, id: null, reviews: [], activePage: 1 };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getUserProfileData(id, 1);
    this.setState({ id });
  }
  componentWillMount() {
    this.setState({
      children: [],
      activeItemIndex: 0
    });
  }
  //
  handlePageChange = page => {
    const id = this.props.match.params.id;
    this.props.getUserProfileData(id, page);
    this.setState({ activePage: page });
    this.setState({ id });
  };
  renderReviews = () => {
    {
      return this.props.reviews
        ? this.props.reviews.map(review => {
            return (
              <li>
                <div className="review">
                  <div className="review-author">
                    <img
                      className="avatar"
                      alt=""
                      src={review.userid.profile_image}
                    />
                  </div>
                  <div className="review-block">
                    <div className="review-by">
                      <span className="review-author-name">{`${review.userid.firstName} ${review.userid.lastName}`}</span>
                    </div>
                    <p>{review.review}</p>
                    <span className="review-date">{review.createdAt}</span>
                  </div>
                </div>
              </li>
            );
          })
        : null;
    }
  };

  onSubmitSellerComment = async (values, dispatch) => {
    values.sellerid = this.state.id;
    const page = this.state.activePage;
    const token = localStorage.getItem("token");
    axios
      .post("/activities/reviewSeller", values, {
        headers: {
          "x-auth-token": `${token}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        createNotification("success", "Success", response.data.message);
        if (response.status === 200) {
          const id = this.props.match.params.id;
          this.props.getUserProfileData(id, page);
          dispatch(reset("Seller Review"));
          this.setState({ commentSent: true });
        }
      })
      .catch(error => {
        console.log(error);
        createNotification(
          "error",
          error.response.data.description,
          error.response.data.message
        );
      });
  };

  changeActiveItem = activeItemIndex => this.setState({ activeItemIndex });
  render() {
    const { userInfo, userBooks, reviews } = this.props;
    return (
      <Fragment>
        <Header />
        <BreadCrumb />
        <div className="page-about about_area bg--white section-padding--lg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bio-image">
                  <img
                    src={userInfo != null ? userInfo.profile_image : null}
                    alt="image"
                    style={{ width: 180 }}
                  />
                </div>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-lg-12">
                <div itemscope="" itemtype="http://schema.org/Person">
                  <h2>
                    {" "}
                    <span>
                      {userInfo != null
                        ? `${userInfo.firstName} ${userInfo.lastName}`
                        : null}
                    </span>
                  </h2>
                  <p>
                    <i className="fa fa-map-marker"></i>{" "}
                    <span>{userInfo != null ? userInfo.city : null}</span>
                  </p>
                  <p>
                    <i className="fa fa-user"></i>{" "}
                    <span>
                      {userInfo != null ? userInfo.accountType : null}
                    </span>
                  </p>
                </div>
              </div>
              <div
                className="col-lg-12 centered-text mt-4"
                style={{ paddingTop: 50 }}
              >
                <h4>
                  {userInfo != null
                    ? `${userInfo.firstName} ${userInfo.lastName}`
                    : null}{" "}
                  Listings
                </h4>
                <div
                  className="pt-3"
                  style={{
                    padding: "0 20px",
                    maxWidth: 1000,
                    margin: "0 auto"
                  }}
                >
                  {userBooks != null ? (
                    <ItemsCarousel
                      infiniteLoop
                      gutter={12}
                      numberOfCards={4}
                      activeItemIndex={this.state.activeItemIndex}
                      requestToChangeActive={value =>
                        this.setState({ activeItemIndex: value })
                      }
                      leftChevron={<button>{"<"}</button>}
                      rightChevron={<button>{">"}</button>}
                    >
                      {" "}
                      {userBooks.map((book, i) => {
                        let img = book.book_images[0];
                        return (
                          <div
                            key={i}
                            style={{
                              height: 300,
                              background: `url(${img})`,
                              // backgroundPosition:'center',
                              backgroundSize: "100% 100%"
                            }}
                          />
                        );
                      })}
                    </ItemsCarousel>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <ul className="nav nav-tabs nav-tabs-bottom">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#product_reviews"
                data-toggle="tab"
              >
                Reviews
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#product_desc " data-toggle="tab">
                Report Seller
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane show active" id="product_reviews">
              <div className="product-reviews">
                <h3>
                  Reviews{" "}
                  {this.props.totalReviews ? this.props.totalReviews : null}
                </h3>
                <ul className="review-list">{this.renderReviews()}</ul>
                <div className="all-reviews">
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.props.totalReviews}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              </div>
              <div className="product-write-review">
                <h3>Write Review</h3>
                <form
                  onSubmit={this.props.handleSubmit(this.onSubmitSellerComment)}
                  action="#"
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Review Comments</label>
                        <Field
                          name="review"
                          component={renderField}
                          type="textarea"
                          cols={1}
                          rows={4}
                          className="form-control"
                          validate={required}
                          style={{width:'300px'}}
                        />
                      </div>
                      <div className="review-submit">
                        <button className="btn btn-primary">
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="tab-pane " id="product_desc">
              <div className="product-content">
                <ReportSeller id={this.state.id} />
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <Footer />
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    userInfo: state.UserProfile.userInfo,
    userBooks: state.UserProfile.userBooks,
    reviews: state.UserProfile.reviews,
    totalReviews: state.UserProfile.totalReviews
  };
};
const component = connect(mapStateToProps, { getUserProfileData })(Profile);
export default reduxForm({ form: "Seller Review" })(component);
