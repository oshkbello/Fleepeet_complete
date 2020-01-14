import React from "react";
import Spinner from "../helpers/Spinner";
import { addToCart} from '../../actions/cartActions'
import {connect} from 'react-redux'
import ImageGallery from "react-image-gallery";
class ProductDetails extends React.Component {
  render() {
    const { product } = this.props;
    const imagesn = [];
    if (product) {
      product.book_images.map(image => {
        imagesn.push({ original: image, thumbnail: image });
      });
    }
    return (
      <div className="wn__single__product">
        <div className="row">
          <div className="col-lg-6 col-6">
            <div class="product-view">
              <div class="proimage-wrap">
                {product ? <ImageGallery items={imagesn} /> : <Spinner type='TailSpin' height='100' width='100'/>}
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-12">
            <div className="product__info__main">
              <h1>{product ? product.title : <div></div>}</h1>
              <div className="price-box">
                <span>
                  Price:{product ? `$ ${product.price} ` : <div></div>}
                </span>
              </div>
              <div className="box-tocart d-flex">
                <div className="addtocart__actions">
                  <button className="tocart " type="submit" title="Add to Wishlist" onClick = {()=>{this.props.addToCart(product)}}>
                    Add to Wishlist
                  </button>
                </div>
              </div>
              <div className="product_meta">
                <span className="posted_in">
                  Categories:
                  {product ? product.category : <div></div>}
                </span>
              </div>
              <div className="product_meta">
                <span className="posted_in">
                  Delivery Options:{" "}
                  <span style={{fontWeight:700,fontSize:20}}>{product ? product.deliveryType : <div></div>}</span>
                </span>
              </div>
              <div className="product-share">
                {/* <h6 style={{display:'inline'}}>Seller</h6><span><Link to={`/sellerInfo/${product.user._id}`}>{product?product.user.firstName:<span></span>}</Link></span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null,{addToCart})(ProductDetails)