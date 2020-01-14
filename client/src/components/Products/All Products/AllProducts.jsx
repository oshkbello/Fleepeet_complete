import React from "react";
import AllProductsTabs from "./Tabs";
import Heading from "./Heading";
import SingleProduct from "../SingleProduct";
import SingleProductAll from "./SingleProductAll";
import { connect } from "react-redux";
import { getProducts } from '../../../actions/cartActions'
import key from 'randomstring'
class AllProductCarosel extends React.Component{
   renderAllProducts = ()=>{
    const {allProducts} = this.props;
      
     //Getting from MongoDb
    return allProducts.map((element)=>{
      console.log(element);
      const id = element._id;
      const {title,price,book_images} = element;
      return <SingleProductAll key={key.generate()} title = {title} price = {price} id={id} oldPrice="20" images= {book_images} school = {element.user.school}/>
    })
  }
  render() {
    return (
      <div>
        <section className="wn__bestseller__area bg--white pt--80  pb--30">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center">
                  <h2 className="title__be--2">
                    All <span className="color--theme">Products</span>
                  </h2>
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered lebmid alteration
                    in some /ledmid form
                  </p>
                </div>
              </div>
            </div>
            <div className="row mt--50">
              <div className="col-md-12 col-lg-12 col-sm-12">
                <div
                  className="product__nav nav justify-content-center"
                  role="tablist"
                >
                  <a
                    className="nav-item nav-link active"
                    data-toggle="tab"
                    href="#nav-all"
                    role="tab"
                  >
                  </a>
                 
                </div>
              </div>
            </div>

            <div
              className="row single__tab tab-pane fade show active"
              id="nav-all"
              role="tabpanel"
            >
              <div className="product__indicator--4 arrows_style owl-carousel owl-theme">
                {/* <SingleProductAll />
                
                <SingleProductAll />
                <SingleProductAll />
                <SingleProductAll /> */}
                {this.renderAllProducts()}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {allProducts:state.products}

};
export default connect(
  mapStateToProps,
  { getProducts }
)(AllProductCarosel);
