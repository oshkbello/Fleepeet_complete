import React, { Component } from 'react'
import TopNav from "../../Dashboard/Navigation/TopNav";
import SideNav from "../../Dashboard/Navigation/SideNav";

import { Link } from "react-router-dom";
import {
    getPurchaseRequestsBuyer
  } from "../../../actions/purchaseRequests";
  import { connect } from "react-redux";
class PurchaseRequestsSent extends Component {
    
  componentDidMount(){
    this.props.getPurchaseRequestsBuyer();
  }
    render() {


        const renderRequestsBuyer = () => {
    
            if (this.props.requestsBuyer !== null) {
              return this.props.requestsBuyer.map(request => {
                return (
                  <tr>
                    <td style={{ padding: 15 }}>
                      <div class="product-det">
                        <img
                          src={request.bookid.book_images[0]}
                          style={{ width: "40px", height: "40px" }}
                          alt=""
                        />
                        <div class="product-desc">
                          <h2>
                            <Link to={`/dashboardproductDetails/${request.bookid._id}`}>
                              {request.bookid.title}
                            </Link>
                          </h2>
                        </div>
                      </div>
                    </td>
      
                    <td>
                      {request.userid.firstName} {request.userid.lastName}
                    </td>
                    <td>{request.description}</td>
                    <td>{request.paymentMethod}</td>
                    {request.status === "Accepted" ? (
                      <td>
                        <span class="badge badge-success-border">
                          {request.status}
                        </span>
                      </td>
                    ) : (
                      <td>
                        <span class="badge badge-danger-border">
                          {request.status}
                        </span>
                      </td>
                    )}
                  </tr>
                );
              });
            } else {
              return <div></div>;
            }
          };
        return (
        <SideNav >
        <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div class="col-sm-12">
            <h4 class="page-title">Purchase Requests Sent</h4>
          </div>
        </div>
        <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div class="col-sm-12">
            <table class="table table-border custom-table m-b-0">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>user</th>
                  <th>Description</th>
                  <th>Payment Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{renderRequestsBuyer()}</tbody>
            </table>
          </div>
        </div>
        </SideNav>
        )
    }
}
const mapStateToProps = state => {
    return {
      requestsBuyer: state.purchaseRequests.purchaseRequestsBuyer
    };
  };

  export default connect(mapStateToProps,{getPurchaseRequestsBuyer})(PurchaseRequestsSent);