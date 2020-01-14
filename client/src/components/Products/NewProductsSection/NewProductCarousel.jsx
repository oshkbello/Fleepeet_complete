import React from "react";
import SingleProduct from "../SingleProduct";
import { addToCart } from "../../../actions/cartActions";
import { connect } from "react-redux";
import Spinner from "../../helpers/Spinner";
import { getNewPrducts } from "../../../actions/productActions";

class AllProductCarosel extends React.Component {
  componentDidMount(){
   this.props.getNewPrducts();
  }
  renderProducts = () => {
    if (this.props.items === null) {
      return (
        <div style={{ position: "relative", top: "50%", left: "50%" }}>
          <Spinner type='TailSpin' height='100' width='100'/>
        </div>
      );
   
    } 
    return this.props.items.map(product => {
      const len = product.likes.length !== null ? product.likes.length : 0;
      console.log(product);
        const likes = product.likes.filter(like => {
          if (this.props.user._id === like.userId) {
            return true;
          }
          return false;
        });
      return (
        <div className="col-md-3">
          <SingleProduct key={product.id} product={product} length={len} like={likes[0]}/>
        </div>
      );
    });

  };
  render() {
    return (
      <div className="container">
        <div className="row">{this.renderProducts()}</div>
      </div>
    );
  }
}  

const mapStateToProps = state => {
  console.log(state);
  return { items: state.products.newItems,
  user:state.loginUser.currentUser };
};
export default connect(mapStateToProps, { addToCart,getNewPrducts })(AllProductCarosel);
