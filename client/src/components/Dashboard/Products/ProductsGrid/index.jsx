import React, { Component, Fragment } from "react";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import Spinner from "../../../helpers/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteBook,
  getSellerProducts
} from "../../../../actions/productActions";
class SellerDashboard extends Component {
  state = { products: null, noOfBooks: [2, 2] };
  async componentDidMount() {
    this.props.getSellerProducts();

    // this.setState({ products: res.data, noOfBooks });
  }
  deleteBook = async bookid => {
    if (window.confirm("Are you sure to delete this book?")) {
      this.props.deleteBook(bookid);
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
          <div class="col-lg-3 col-md-4 col-sm-6 col-12 " key={product.isbn}>
            <div class="product">
              <div class="product-inner">
                <img
                  alt="alt"
                  style={{ height: "8rem" }}
                  src={product.book_images[0]}
                />
                <div class="cart-btns">
                  <button
                    class="btn btn-danger addcart-btn"
                    onClick={() => this.deleteBook(product._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboardEditProduct/${product._id}`}
                    class="btn btn-warning text-white proedit-btn"
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
          <div class="row ">
            <div class="col-sm-4 col-4">
              <h4>Products</h4>
            </div>
            <div class="col-sm-8 col-8 text-right m-b-20">
              {this.props.status === "deactive" ? (
                <div style={{ float: "left" }} className="alert alert-danger">
                  Your Email is not Verified Please check your Email to Verify
                </div>
              ) : null}
              <Link
                to="/dashboardAddProducts"
                class="btn btn-warning text-white btn-rounded pull-right"
              >
                <i class="fa fa-plus"></i> Add Product
              </Link>
            </div>
          </div>
          <div class="row">{this.renderProducts()}</div>
          <div class="sidebar-overlay" data-reff=""></div>
        </Fragment>
      </SideNav>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.sellerProducts,
    status: state.loginUser.currentUser.status
  };
};

export default connect(mapStateToProps, { deleteBook, getSellerProducts })(
  SellerDashboard
);
