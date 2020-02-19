import React from 'react'
import {Link} from 'react-router-dom'
export default () => {
    return (
        <footer id="wn__footer" className="footer__area bg__cat--8 brown--color">
            <div className="footer-static-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer__widget footer__menu">
                                <div className="ft__logo">
                                    <Link to="/">
                                        <img src="images/logo/flipeetLogo1.png" alt="Flipeet Logo" />
                                    </Link>
                                    <p>Connect with us</p>
                                </div>
                                <div className="footer__content">
                                    <ul className="social__net social__net--2 d-flex justify-content-center clr-scheme">
                                        <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                                        <li><a href="https://www.instagram.com/comflipeet"><i className="bi bi-instagram"></i></a></li>
                                        <li><a href="https://twitter.com/comflipeet"><i className="bi bi-twitter"></i></a></li>
                                        <li><a href="#"><i className="bi bi-linkedin"></i></a></li>
                                        <li><a href="#"><i className="bi bi-youtube"></i></a></li>
                                    </ul>
        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright__wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="copyright">
                                <div className="copy__right__inner text-left">
                                    <p>Copyright <i className="fa fa-copyright"></i> <a href="#">Flipeet.</a> All Rights Reserved</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="payment text-right">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
