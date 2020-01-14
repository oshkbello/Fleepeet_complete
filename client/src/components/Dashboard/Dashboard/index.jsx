import React, { Component, Fragment } from "react";
import TopNav from "../Navigation/TopNav";
import { Link } from "react-router-dom";
import SideNav from "../Navigation/SideNav";
import axios from "axios";
import Spinner from "../../helpers/Spinner";
import { connect } from "react-redux";
import OverviewChart from "../Products/ProductOverviewChart/index";
import {
  deleteBook,
  getSellerNewProducts
} from "../../../actions/productActions";
import {
  getSellerNewPurchaseRequests,
  getnewPurchaseRequestsBuyer
} from "../../../actions/purchaseRequests";

class SellerDashboard extends Component {
  state = { products: null, noOfBooks: [2, 5, 2] };
  async componentDidMount() {
    this.props.getSellerNewProducts();
    this.props.getSellerNewPurchaseRequests();
    this.props.getnewPurchaseRequestsBuyer();

    // this.setState({ products: res.data, noOfBooks });
  }
  deleteBook = async bookid => {
    if (window.confirm("Are you sure to delete this book?")) {
      this.props.deleteBook(bookid);
    }
  };

  renderRequests = () => {
    if (this.props.requests !== null) {
      return this.props.requests.map(request => {
        return (
          <tr>
            <td style={{ padding: 15 }}>
              <div class="product-det">
                <img
                  src={request.bookid.book_images[0]}
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                />
                <div class="product-desc">
                  <h2>
                    <Link >
                      {request.bookid.title}
                    </Link>
                  </h2>
                </div>
              </div>
            </td>

            <td>
              {request.userid.firstName} {request.userid.lastName}
            </td>
            <td>{request.description}</td>
            <td>{request.paymentMethod}</td>
            {request.status === "Accepted" ? (
              <td>
                <span class="badge badge-success-border">{request.status}</span>
              </td>
            ) : (
              <td>
                <span class="badge badge-danger-border">{request.status}</span>
              </td>
            )}
          </tr>
        );
      });
    } else {
      return <div></div>;
    }
  };

  renderRequestsBuyer = () => {
    if (this.props.requests !== null) {
      return this.props.requestsBuyer.map(request => {
        return (
          <tr>
            <td style={{ padding: 15 }}>
              <div class="product-det">
                <img
                  src={request.bookid.book_images[0]}
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                />
                <div class="product-desc">
                  <h2>
                    <Link >
                      {request.bookid.title}
                    </Link>
                  </h2>
                </div>
              </div>
            </td>

            <td>
              {request.userid.firstName} {request.userid.lastName}
            </td>
            <td>{request.description}</td>
            <td>{request.paymentMethod}</td>
            {request.status === "Accepted" ? (
              <td>
                <span class="badge badge-success-border">{request.status}</span>
              </td>
            ) : (
              <td>
                <span class="badge badge-danger-border">{request.status}</span>
              </td>
            )}
          </tr>
        );
      });
    } else {
      return <div></div>;
    }
  };
  renderProducts = () => {
    if (this.props.products === null) {
      return (
        <div style={{ position: "relative", top: "50%", left: "50%" }}>
          <Spinner type="TailSpin" height="100" width="100" />
        </div>
      );
    }
    if (this.props.products !== null) {
      return this.props.products.map(product => {
        console.log(product.book_images[0]);
        return (
          <div class=" col-8 col-sm-8 col-md-6 col-lg-4 " key={product.isbn}>
            <div class="product">
              <div class="product-inner">
                <img alt="alt" src={product.book_images[0]} />
                <div class="cart-btns">
                  <button
                    class="btn btn-danger addcart-btn"
                    onClick={() => this.deleteBook(product._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboardEditProduct/${product._id}`}
                    class="btn btn-warning  proedit-btn"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <div class="pro-desc">
                <h5>
                  <Link to={`/dashboardproductDetails/${product._id}`}>
                    {product.title}
                  </Link>
                </h5>
                <div class="price">
                  <sup>$</sup>
                  {product.price}
                </div>
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
        <Fragment>
          <div class="row">
            <div class="col-10 col-sm-6  text-right m-b-20">
              {this.props.status === "deactive" ? (
                <div style={{ float: "left" }} className="alert alert-danger">
                  Your Email is not Verified Please check your Email to Verify
                </div>
              ) : null}
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <h4 style={{ marginBottom: 20, marginLeft: 15 }}>
                New Purchase Requests Received
              </h4>
            </div>
          </div>
          <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
            <div class="col-9 col-sm-12 col-md-12">
              <table class="table table-border custom-table m-b-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>user</th>
                    <th>Description</th>
                    <th>Payment Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{this.renderRequests()}</tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div
              className="col-6 col-sm-12 col-md-12"
              style={{ marginBottom: 60, marginTop: 30 }}
            >
              <Link
                to="/purchaserequests"
                className="btn btn-warning text-white"
                style={{ float: "right" }}
              >
                View All Requests Received
              </Link>
              <br></br>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <h4 style={{ marginBottom: 20, marginLeft: 15 }}>
                New Purchase Requests Sent
              </h4>
            </div>
          </div>
          <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
            <div class="col-7 col-sm-12 col-md-12 col-lg-12">
              <table class="table table-border custom-table m-b-0">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>user</th>
                    <th>Description</th>
                    <th>Payment Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{this.renderRequestsBuyer()}</tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div
              className="col-5 col-sm-12 col-md-12"
              style={{ marginBottom: 60, marginTop: 30 }}
            >
              <Link
                to="/purchaserequestsent"
                className="btn btn-warning text-white"
                style={{ float: "right" }}
              >
                View All Requests Sent
              </Link>
              <br></br>
            </div>
          </div>
          <div class="row ">
            <h4 style={{ marginBottom: 20, marginLeft: 15 }}>
              New Products Published
            </h4>
          </div>
          <div class="row">{this.renderProducts()}</div>

          <div className="row">
            <div
              className="col-4 col-sm-12 col-md-12 float-right"
              style={{ marginBottom: 60, marginTop: 30 }}
            >
              <Link
                to="/myProducts"
                className="btn btn-warning text-white"
                style={{ float: "right" }}
              >
                View All Products
              </Link>
              <br></br>
            </div>

            <div className="row">
              <div className="col-10 col-sm-8 col-md-9 col-lg-12">
                <OverviewChart overviewData={this.state.noOfBooks} />
              </div>
            </div>
            <div class="sidebar-overlay" data-reff=""></div>
          </div>
        </Fragment>
      </SideNav>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.sellerNewProducts,
    status: state.loginUser.currentUser.status,
    requests: state.purchaseRequests.sellerNewPurchaseRequests,
    requestsBuyer: state.purchaseRequests.sellerNewPurchaseRequestsAsBuyer
  };
};

export default connect(mapStateToProps, {
  deleteBook,
  getSellerNewProducts,
  getSellerNewPurchaseRequests,
  getnewPurchaseRequestsBuyer
})(SellerDashboard);
