import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import BreadCrumb from "../CommonComponents/BradCrumb";
import { Link } from "react-router-dom";
import Header from '../Header/Header'
import Footer from "../Footer/index";
import { removeItem } from "../../actions/cartActions";
import Recipe from "./Recipe";
import Moment from "react-moment";


class Cart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      compare: false,
    };
  }
  compare = () => {
    this.setState({ compare: !this.state.compare });
  };
  //to remove the item completely
  handleRemove = id => {
    this.props.removeItem(id);
  };

  render() {
    let compareBooks = this.props.items.length ? (
      <table id="compareBookTable">
        <thead id="compareBook">
          <th>Title</th>
          <th>Authors</th>
          <th>Category</th>
          <th>Description</th>
          <th>Status</th>
          <th>Price</th>
          <th>Delivery Type</th>
        </thead>
        <tbody>
          {this.props.items.map(item => {
            return (
              <tr>
                <td>
                  {item.title + " "}
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={item.book_images[0]}
                  />
                  <p>{item.isbn}</p>
                </td>
                <td>{item.author}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>
                  {item.status}{" "}
                  <p>
                    <Moment format="DD/MM/YYYY">{item.publishedAt}</Moment>
                  </p>
                </td>
                <td>{item.price + "$"}</td>
                <td>{item.deliveryType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      ""
    );

    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <div className="col-md-3">
          <div className="product product__style--3" key={item._id}>
            <div>
              <div className="product__thumb">
                <Link className="first__img" to={`/productDetails/${item._id}`}>
                  <img src={item.book_images[0]} alt="product image" />
                </Link>
                <div className="hot__box">
                  <span className="hot-label"> {item.author}</span>
                </div>
              </div>
              <div className="product__content content--center">
                <h4>
                  <a href="single-product.html">{item.title}</a>
                  <a href="single-product.html">{item.bookCondition}</a>
                  {/* <p style={{color:"#ce7852",fontWeight:'normal',fontSize:14}}>{user.school}</p> */}
                </h4>

                <ul className="prize d-flex">
                  <li>${item.price}</li>
                  <li className="old_prize">
                    {item.oldPrice ? `$ ${item.oldPrice}` : null}
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.handleRemove(item._id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
          </div>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
    return (
      <Fragment>
        <Header/>
        <BreadCrumb />

        <div className="container">
          <h1>Compare books</h1>
          <div className="cart">
            <div className="row">
              
              {addedItems}
              
              </div>
             
        
            {this.props.items.length ? (
              <button className="btn btn-warning text-white" onClick={this.compare}>
                Compare Books
              </button>
            ) : (
              ""
            )}
            <div className="row">
              {this.state.compare ? (
                <div className="col-md-12">{compareBooks}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <Recipe />
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.addToCart.addedItems);
  return {
    items: state.addToCart.addedItems

    //addedItems: state.addedItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(removeItem(id));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
