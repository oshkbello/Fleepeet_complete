import React from "react";
import loadsjs from "../helpers/loadjsAdmin";
import TopNav from "./Navigation/TopNav";
import SideNav from "./Navigation/SideNav";
// import {getProductDetails} from '../../../actions/index';
import { connect } from "react-redux";
import ProductDetail from "./Products/ProductDetails";

class ProductDetailsN extends React.Component {
  componentDidMount() {
    loadsjs();
    // this.props.getProductDetails(id); 
  }
  render() {
    return (
      <div className="main-wrapper">
        <SideNav >
        <ProductDetail />
        </SideNav>
      </div>
    );
  }
}
     
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {}
)(ProductDetailsN);
