import React, { Component, Fragment } from "react";
import TopNav from "../Navigation/TopNav";
import SideNav from "../Navigation/SideNav";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { getTransactions } from "../../../actions/purchaseRequests";
import moment from "moment";
class Transactions extends Component {
  state = {};
  componentDidMount() {
    this.props.getTransactions(1);
  }
  handlePageChange = page => {
    this.props.getTransactions(page);
    this.setState({ activePage: page });
  };

  renderTransactions = () => {
    return this.props.transactions
      ? this.props.transactions.map(transaction => {
          return (
            <tr>
              <td>
                <span>{transaction._id}</span>
              </td>
              <td>{moment().format(transaction.transactionDate)}</td>
              <td>
                <p class="price-sup">
                  <sup>$</sup>
                  {transaction.price}
                </p>
              </td>
              <td>
                <a target="_blank" href={transaction.recepit}>
                  View Receipt
                </a>
              </td>
              <td>
                <span>{transaction.description}</span>
              </td>
              <td>
                <span class="badge badge-warning-border">
                  {transaction.status}
                </span>
              </td>
            </tr>
          );
        })
      : null;
  };
  render() {
    return (
      <Fragment>
        <SideNav >
          <div class="content container-fluid">
            <div class="row">
              <div class="col-sm-12">
                <h4 class="page-title">Orders</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-8 col-sm-9 col-md-10 col-lg-12" >
                <div class="table-responsive">
                  <table class="table table-border custom-table m-b-0">
                    <thead>
                      <tr>
                        <th>Transaction Id</th>
                        <th>Transaction Date</th>
                        <th>Amount</th>
                        <th>Receipt</th>
                        <th>Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderTransactions()}</tbody>
                  </table>
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.props.totalReviews}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </SideNav>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { transactions: state.purchaseRequests.transactions };
};
export default connect(mapStateToProps, { getTransactions })(Transactions);
