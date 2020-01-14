import React from 'react'
import {Link} from 'react-router-dom'
import { addToCart } from '../../../actions/cartActions'
import {connect} from 'react-redux'
 class SingleProductAll extends React.Component{
    render(){
        const {price,title,label,oldPrice,id,images,school} = this.props;
    return (
        <div className="single__product">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product product__style--3">
                    <div className="product__thumb">
                        <Link className="first__img" to={'/productDetails/'+id}><img src={`/images/books/${images[0]}`} alt="product image" /></Link>
                        
                        <Link className="second__img animation1" to={'/productDetails/'+id}><img src={`images/books/${images[0]}`} alt="product image" /></Link>
                        <div className="hot__box">
                            <span className="hot-label">{label}</span>
                        </div>
                    </div>
                    <div className="product__content content--center content--center">
                        <h4><a href="single-product.html">
                        {title}
                        <p style={{color:"#ce7852",fontWeight:'normal',fontSize:14}}>{school}</p>
                        </a></h4>
                       
                      
                        <ul className="prize d-flex">
                            <li>${price}</li>
                            <li className="old_prize">${oldPrice}</li>
                        </ul>
                        <div className="action">
                            <div className="actions_inner">
                                <ul className="add_to_links">
                                    <li><a className="cart" href="#"  onClick={(e) => { e.preventDefault(); this.props.addToCart(this.props) }}><i className="bi bi-shopping-bag4"></i></a></li>
                                    <li><a className="wishlist" href="wishlist.html"><i className="bi bi-shopping-cart-full"></i></a></li>
                                    <li><a className="compare" href="#"><i className="bi bi-heart-beat"></i></a></li>
                                    <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" href="#productmodal"><i className="bi bi-search"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="product__hover--content">
                            <ul className="rating d-flex">
                                <li className="on"><i className="fa fa-star-o"></i></li>
                                <li className="on"><i className="fa fa-star-o"></i></li>
                                <li className="on"><i className="fa fa-star-o"></i></li>
                                <li><i className="fa fa-star-o"></i></li>
                                <li><i className="fa fa-star-o"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
                <div className="product product__style--3">
                    <div className="product__thumb">
                        <Link className="first__img" to={'/productDetails/'+id}><img src={`images/books/${images[0]}`} alt="product image" /></Link>
                        <Link className="second__img animation1" to={'/productDetails/'+id}><img src={`images/books/${images[0]}`} alt="product image" /></Link>
                        <div className="hot__box">
                            <span className="hot-label">BEST SALER</span>
                        </div>
                    </div>
                    <div className="product__content content--center content--center">
                        <h4><a href="single-product.html">{title}</a></h4>
                        <ul className="prize d-flex">
                            <li>${price}.00</li>
                            <li className="old_prize">$35.00</li>
                        </ul>
                        <div className="action">
                            <div className="actions_inner">
                                <ul className="add_to_links">
                                    <li><a className="cart" href="#" onClick={(e) => { e.preventDefault(); this.props.addToCart(this.props) }}><i className="bi bi-shopping-bag4"></i></a></li>
                                    <li><a className="wishlist" href="wishlist.html"><i className="bi bi-shopping-cart-full"></i></a></li>
                                    <li><a className="compare" href="#"><i className="bi bi-heart-beat"></i></a></li>
                                    <li><a data-toggle="modal" title="Quick View" className="quickview modal-view detail-link" href="#productmodal"><i className="bi bi-search"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="product__hover--content">
                            <ul className="rating d-flex">
                                <li className="on"><i className="fa fa-star-o"></i></li>
                                <li className="on"><i className="fa fa-star-o"></i></li>
                                <li className="on"><i className="fa fa-star-o"></i></li>
                                <li><i className="fa fa-star-o"></i></li>
                                <li><i className="fa fa-star-o"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}

export default connect(null,{addToCart})(SingleProductAll)