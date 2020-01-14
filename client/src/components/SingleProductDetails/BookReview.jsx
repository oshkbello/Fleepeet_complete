import React from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import Pagination from "react-js-pagination";
import { renderField } from "../CommonComponents/RenderFormField";
import { required } from "../CommonComponents/FormValidations";
import axios from "axios";
import { createNotification } from "../CommonComponents/Notifications";
import { productDetails } from "../../actions/productActions";
import Spinner from "../helpers/Spinner";
class BookComment extends React.Component {
  state = { activePage: 1, loading: false };
  onSubmitBookComment = async (values, dispatch) => {
    values.bookid = this.props.product._id;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .post("/book/commentBook", values, {
        headers: {
          "x-auth-token": token
        }
      })
      .then(response => {
        this.setState({ loading: false });
        createNotification("success", "Success", response.data.message);
        if (response.status === 200) {

          dispatch(reset("Book Review"));
          const id = this.props.id;
          const page = this.state.activePage;
          this.props.productDetails(id, page);
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
        createNotification(
          "error",
          error.response.data.description,
          error.response.data.message
        );
      });
  };
  handlePageChange = page => {
    const id = this.props.id;
    this.props.productDetails(id, page);
    this.setState({ activePage: page });
  };

  renderReviews = () => {
    if (this.props.reviews===[]) {
      return (
        <Spinner type="ThreeDots" marginTop="10px" height="70" width="70" />
      );
    }else{
    return this.props.reviews.map(review => {
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
              <div className="review-by ">
                <span className="review-author-name ">{`${review.userid.firstName} ${review.userid.lastName}`}</span>
              </div>
              <p>{review.review}</p>
              <span className="review-date">{review.createdAt}</span>
            </div>
          </div>
        </li>
      );
    })};
  };
  render() {
    const { product } = this.props;
    return (
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
                onSubmit={this.props.handleSubmit(this.onSubmitBookComment)}
                action="#"
              >
                <div className="row">
                  <div className="col-sm-8">
                    <div className="form-group">
                      <label>Review</label>
                      <Field
                        name="review"
                        component={renderField}
                        type="textarea"
                        cols={1}
                        rows={4}
                        className="form-control"
                        validate={required}
                      />
                    </div>
                    <div className="review-submit">
                      <button className="btn btn-primary">Submit Review</button>
                    </div>
                    {this.state.loading ? (
                      <Spinner
                        type="ThreeDots"
                        marginTop="10px"
                        height="70"
                        width="70"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const component = connect(null, { productDetails })(BookComment);

export default reduxForm({ form: "Book Review" })(component);
