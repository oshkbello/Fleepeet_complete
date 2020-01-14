import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
//import { addShipping } from './actions/cartActions'
class Recipe extends Component {
  

  handleChecked = e => {
    if (e.target.checked) {
      this.props.addShipping();
    } else {
      this.props.substractShipping();
    }
  };


  render() {
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
  
          </li>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedItems: state.addToCart.addedItems,
    total: state.addToCart.total
  };
};

export default connect(
  mapStateToProps,
)(Recipe);
