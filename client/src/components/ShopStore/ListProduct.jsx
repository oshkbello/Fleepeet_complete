import React from 'react'

export default () => {
    return (
        <div className="list__view mt--40">
            <div className="thumb">
                <a className="first__img" href="single-product.html"><img src="images/product/2.jpg" alt="product images" /></a>
                <a className="second__img animation1" href="single-product.html"><img src="images/product/4.jpg" alt="product images" /></a>
            </div>
            <div className="content">
                <h2><a href="single-product.html">Blood In Water</a></h2>
                <ul className="rating d-flex">
                    <li className="on"><i className="fa fa-star-o"></i></li>
                    <li className="on"><i className="fa fa-star-o"></i></li>
                    <li className="on"><i className="fa fa-star-o"></i></li>
                    <li className="on"><i className="fa fa-star-o"></i></li>
                    <li><i className="fa fa-star-o"></i></li>
                    <li><i className="fa fa-star-o"></i></li>
                </ul>
                <ul className="prize__box">
                    <li>$111.00</li>
                    <li className="old__prize">$220.00</li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>
                <ul className="cart__action d-flex">
                    <li className="cart"><a href="cart.html">Add to cart</a></li>
                    <li className="wishlist"><a href="cart.html"></a></li>
                    <li className="compare"><a href="cart.html"></a></li>
                </ul>

            </div>
        </div>
    )
}
