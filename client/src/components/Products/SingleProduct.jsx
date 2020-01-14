import React from "react";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { Link } from "react-router-dom";
import axios from "axios";
import Shop from "../ShopStore/Shop";
import { createNotification } from "../CommonComponents/Notifications";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { like: false, noLikes: 0 };
  }
  componentWillMount() {
    const like = this.props.like;
    const noLikes = this.props.length;
    this.setState({ like, noLikes });
  }

  likeHandler = e => {
    e.preventDefault();
    let { noLikes, like } = this.state;
    if (!like) {
      noLikes = +noLikes + 1;
      this.setState({ like: true, noLikes: noLikes });
    } else {
      this.setState({ like: true });
    }
    const token = localStorage.getItem("token");
    axios
      .post(
        "/book/likebook",
        { bookid: this.props.product._id },
        {
          headers: {
            "x-auth-token": `${token}`
          }
        }
      )
      .then(res => {
        console.log(res);
        res.data.data.statusCode === 409
          ? createNotification("warning", res.data.data.message)
          : createNotification("success", "you have liked a book");
      })
      .catch(err => {
        createNotification(
          "error",
          err.response.data.description,
          err.response.data.message
        );
      });
  };
  render() {
    const {
      title,
      col,
      _id,
      price,
      count,
      total,
      author,
      book_images,
      user,
      bookCondition
    } = this.props.product;
    const product = { title, _id, price, count, total };
    return (
      <div className="product product__style--3 ">
        <div>
          <div className="product__thumb">
            <Link className="first__img" to={`/productDetails/${_id}`}>
              <img src={book_images[0]} alt="product image" />
            </Link>
            <div className="hot__box">
              <span className="hot-label"> {author}</span>
            </div>
          </div>
          <div className="product__content content--center">
            <h4>
              <a href="single-product.html">{title}</a>
              <a href="single-product.html">{bookCondition}</a>
              {/* <p style={{color:"#ce7852",fontWeight:'normal',fontSize:14}}>{user.school}</p> */}
            </h4>

            <ul className="prize d-flex">
              <li>${price}</li>
              <li className="old_prize">
                {" "}
                {this.props.product.oldPrice
                  ? `$ ${this.props.product.oldPrice} `
                  : null}
              </li>
            </ul>
            <div className="action">
              <div className="actions_inner">
                <ul className="add_to_links">
                  <li>
                    <a id='home-hover-btn'
                      className="cart"
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        this.props.addToCart(this.props.product);
                      }}
                    >
                      <i className="bi bi-shopping-cart-full" ></i>
                    </a>
                  </li>
                  <li>
                    <a id='home-hover-btn' className="compare" onClick={this.likeHandler}>
                      {this.state.like ? (
                        <i  class="fas fa-thumbs-up" >
                          <sup >{this.state.noLikes}</sup>
                        </i>
                      ) : (
                        <i class="far fa-thumbs-up" >
                          <sup >{this.state.noLikes}</sup>
                        </i>
                      )}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { state: state, user: state.loginUser.currentUser };
};

export default connect(mapStateToProps, { addToCart })(Product);
