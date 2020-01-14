import React, { Component } from "react";
import Header from '../Header/Header'
import Slider from "../Header/Slider";
import NewProducts from "../Products/NewProductsSection/NewProducts";
import NewsLetter from "../NewsLetter/NewsLetter";
import AllProducts from "../Products/All Products/AllProducts";
import OurBlog from "../Our Blog/OurBlog";
import Footer from "../Footer";
import { connect } from "react-redux";
import { getProducts } from "../../actions/cartActions";
import {NotificationContainer} from 'react-notifications';
class Home extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <Slider />
        <NewProducts />
        <OurBlog />
        <NewsLetter />
        <Footer />
        <NotificationContainer/>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { getProducts }
)(Home);
