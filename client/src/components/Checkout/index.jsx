import React, { Component } from 'react'
import Footer from '../Footer/index'
import BreadCrumb from '../CommonComponents/BradCrumb'
import Header from '../Header/Header';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import Payment from '../CommonComponents/Payment'
 class Checkout extends Component {
state={paymentMethod:null,paymentStatus:null}
    renderItems = ()=>{
  
        if(this.props.items.length){
            return this.props.items.map(item => {
                return (
                <li>{item.title}</li>
                );
              })
        }
    }

    PlaceOrder = async()=>{
        const values = {};
        values.products = this.props.items;
        values.paymentMethod = this.state.paymentMethod;
        console.log(values);
            // const res = axios.post('/activities',values);
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <BreadCrumb />

                <section className="wn__checkout__area section-padding--lg bg__white">
                    <div className="container">
                 
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                
                            <div className="cartbox__btn">
                                    <ul className="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-end" >
                                       <li><Link to="/account">Login</Link></li>
                                       <li><Link to="/account">Register</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 md-mt-40 sm-mt-40">
                                <div className="wn__order__box">
                                    <h3 className="onder__title">Your order</h3>
                                    <ul className="order__total">
                                        <li>Product</li>
                                        {/* <li>Total</li> */}
                                    </ul>
                                    <ul className="order_product">
                                        {/* <li>Buscipit at magna × 1<span>$48.00</span></li> */}
                                       {this.renderItems()}
                                    </ul>
                                    {/* <ul className="shipping__method">
                                        <li>Cart Subtotal <span>$48.00</span></li>
                                    </ul> */}
                                    <ul className="total__amount">
                                         <li>Order Total <span>${this.props.total}</span></li>
                                         <li><Link to="/cart" className="btn btn-primary">Edit Cart</Link></li>
                                    </ul>
                                    <ul className="total__amount" style={{paddingBottom:20}}>
                                        <li>Select Payment Method
                                             <span>
                                                 <select required className="form-control" onChange={(e)=>{this.setState({paymentMethod:e.target.value})}}>
                                                     <option></option>
                                                     <option value="online">Online</option>
                                                     <option value="meetup">Meetup</option>
                                                 </select>
                                             </span>
                                        </li>
                                    </ul>

                                    <ul className="total__amount" style={{paddingBottom:20}}>
                                        {this.state.paymentMethod === 'online'?
                                         <li>Conform Order by Payment<span><Payment/></span> </li>:
                                         this.state.paymentMethod==='meetup'?   <li>Place Pending Payment Order
                                         <span><button  className="btn btn-success" onClick={this.PlaceOrder}>Place Order</button></span> 

                                      </li>:<div><li>Please Select the Payment Method</li></div>
                                    }
                                       
                                      
                                    </ul>
                                </div>
                              

                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
  console.log(state.addToCart.addedItems);
  return {
    items: state.addToCart.addedItems,
    total: state.addToCart.total
    //addedItems: state.addedItems
  };
};
export default connect(mapStateToProps,{})(Checkout)