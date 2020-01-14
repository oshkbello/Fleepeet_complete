import React from "react";
import Header from "../Header/Header";
import BradCrumb from "../CommonComponents/BradCrumb";
import ShopContent from "./ShopContent";
import Footer from "../Footer";

export default class Shop extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <BradCrumb />
        <ShopContent />
        <Footer />
      </React.Fragment>
    );
  }
}
