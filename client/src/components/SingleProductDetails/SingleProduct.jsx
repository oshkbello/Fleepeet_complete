import React from "react";
import Header from "../Header/Header";
import BradCrumb from "../CommonComponents/BradCrumb";
import ProductDetails from "./ProductDetails";
import ProductInfo from "./ProductInfo";
import Footer from "../Footer/index";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import { required } from "../CommonComponents/FormValidations";
import { Link, withRouter } from "react-router-dom";
import BookReview from "./BookReview";
import PlateformComment from "./PlateformComments";
import Spinner from "../helpers/Spinner";
import {
  productDetails,
  sendPurchaseRequest,
  hidePurchaseCode
} from "../../actions/productActions";
import StripeCheckout from "react-stripe-checkout";
class ProductDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      paymentMethod: null,
      description: null,
      id: null,
      token: null,
      showPlateformComment: false
    };
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    this.props.productDetails(id);

    this.setState({ id });
  }
  onSubmitPurchaseRequest = async (values, dispatch) => {
    values.sellerid = this.props.product.user._id;
    values.bookid = this.props.product._id;
    values.price = this.props.product.price;
    if (this.state.paymentMethod === "Online" && this.state.token !== null) {
      values.token = this.state.token;
      this.props.sendPurchaseRequest({ type: "online", values }, this.props.history);
      this.setState({ showPlateformComment: true });
      dispatch(reset("Purchase Request"));
    } else if (this.state.paymentMethod === "Meetup") {
      this.props.sendPurchaseRequest({ type: "meetup", values }, this.props.history);
      dispatch(reset("Purchase Request"));
      this.setState({ showPlateformComment: true });
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <Header />
        <BradCrumb />
        <div className="maincontent bg--white pt--80 pb--55">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-12">
                <ProductDetails product={this.props.product} />
                <ProductInfo product={this.props.product} />
                <div className="col-sm-12">
                  <h2 className="title__be--2">Book Reviews</h2>
                  <BookReview
                    id={this.state.id}
                    product={this.props.product}
                    reviews={this.props.productReviews}
                    totalReviews={this.props.totalReviews}
                  />
                </div>
              </div>

              <div className="col-lg-4 col-12 md-mt-40 sm-mt-40">
                <div className="shop__sidebar">
                  {this.state.showPlateformComment === false ? (
                    <div class="package">
                      <div class="pheader">Send Purchase Request</div>
                      <div class="pbody">
                        <div style={{ float: "right" }}>
                          <Link className="clr-scheme" to="/login">
                            Login
                          </Link>{" "}
                          <Link className="clr-scheme" to="/register">
                            Register
                          </Link>
                        </div>
                        <form
                          onSubmit={this.props.handleSubmit(
                            this.onSubmitPurchaseRequest
                          )}
                        >
                          <label>Description</label>
                          <Field
                            name="description"
                            id="nickname_field"
                            component="textarea"
                            type="textarea"
                            className="form-control"
                            validate={required}
                            onChange={e => {
                              this.setState({ description: e.target.value });
                            }}
                          />

                          <label>Payment Method</label>
                          <Field
                            name="paymentMethod"
                            component="select"
                            className="form-control"
                            onChange={e => {
                              this.setState({ paymentMethod: e.target.value });
                            }}
                            validate={required}
                          >
                            <option />
                            {this.props.product !== null ? (
                              this.props.product.deliveryType === "Meetup" ? (
                                <option value="Meetup">Meetup</option>
                              ) : null
                            ) : null}

                            <option value="Online">Online</option>
                          </Field>
                          {this.state.paymentMethod === "Online" &&
                            this.state.token === null ? (
                              <div style={{ padding: 20 }}>
                                <StripeCheckout
                                  amount={this.props.product.price * 100}
                                  token={token => {
                                    this.setState({ token: token.id });
                                  }}
                                  stripeKey={
                                    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
                                  }
                                  name="Flipeet"
                                  description="You will not be charged right now"
                                >
                                  <button className="btn btn-warning text-white">
                                    Confirm Payment
                                </button>
                                </StripeCheckout>
                              </div>
                            ) : null}
                          {this.props.purchaseCode !== null ? (
                            <div class="alert alert-success alert-dismissible">
                              <a
                                href="#"
                                class="close"
                                data-dismiss="alert"
                                aria-label="close"
                                onClick={() => {
                                  this.props.hidePurchaseCode();
                                }}
                              >
                                &times;
                              </a>
                              <strong>
                                Purchase Code is :{this.props.purchaseCode}
                              </strong>
                            </div>
                          ) : null}

                          <button
                            style={{ margin: 15 }}
                            type="submit"
                            className="btn btn-warning text-white"
                            disabled={
                              pristine ||
                              submitting ||
                              this.state.paymentMethod === null ||
                              this.state.paymentMethod === "" ||
                              this.state.description === null ||
                              this.state.description === ""
                            }
                          >
                            Submit
                          </button>
                          {this.props.loading ? (
                            <Spinner
                              type="ThreeDots"
                              marginTop="10px"
                              height="70"
                              width="70"
                            />
                          ) : (
                              ""
                            )}
                        </form>
                      </div>
                    </div>
                  ) : (
                      <PlateformComment />
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.productDetails,
    productReviews: state.products.bookReviews,
    totalReviews: state.products.totalReviews,
    purchaseCode: state.products.purchaseCode,
    loading: state.Loader.loading
  };
};

const component = connect(mapStateToProps, {
  productDetails,
  sendPurchaseRequest,
  hidePurchaseCode
})(ProductDetailsPage);
export default withRouter(reduxForm({ form: "Purchase Request" })(component));
