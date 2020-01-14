import React from 'react'
import { connect } from 'react-redux'
import { removeFromCart } from '../../actions/index'
import { Link } from 'react-router-dom'
import { getItemsFromLocalStorage } from '../helpers/localstorage'
import key from 'randomstring';
const Cart = (props) => {
    let products = getItemsFromLocalStorage();
    console.log(products);
    if (products === null) {
        products = [];
    }
    const cartProductCount = products.length;
    const subTotal = () => {
        let total = null;
        products.map(element => {
            total = total + element.price;
        });
        return total;
    }
    const renderCartProducts = () => {
        return products.map((product) => {
            return (
                <div key={key.generate()} className="single__items">
                    <div className="miniproduct">
                        <div className="item01 d-flex">
                            <div className="thumb">
                                <a href="product-details.html"><img
                                    src={``} alt="product images" /></a>
                            </div>
                            <div className="content">
                                <h6><a href="product-details.html">{product.title}</a></h6>
                                <span className="prize">{product.price}</span>
                                <div className="product_prize d-flex justify-content-between">
                                    <span className="qun">Qty: 01</span>
                                    <ul className="d-flex justify-content-end">
                                        <li><a href="#"><i
                                            className="zmdi zmdi-settings"></i></a></li>
                                        <li><a href="" onClick={(e) => { e.preventDefault(); props.removeFromCart(product) }}><i className="zmdi zmdi-delete"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        })
    }

    return (
        <div className="block-minicart minicart__active">
            <div className="minicart-content-wrapper">
                <div className="micart__close">
                    <span>close</span>
                </div>
                <div className="items-total d-flex justify-content-between">
                    <span>{cartProductCount}</span>
                    <span>Cart Subtotal</span>
                </div>
                <div className="total_amount text-right">
                    <span>${subTotal()}</span>
                </div>
                <div className="mini_action checkout">
                    <Link className="checkout__btn" to="/checkout">Go to Checkout</Link>

                </div>
                {renderCartProducts()}
                <div className="mini_action cart">
                    <Link className="cart__btn" to="/cart">View and edit cart</Link>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { addedToCart: state.addToCart }
}
export default connect(mapStateToProps, { removeFromCart })(Cart)