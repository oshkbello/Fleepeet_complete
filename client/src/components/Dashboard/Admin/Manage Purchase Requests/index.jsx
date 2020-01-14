import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { changeRequestStatus } from "../../../../actions/purchaseRequests";
import {
  getPurchaseRequestsAdmin,
  deletePurchaseRequestsAdmin
} from "../../../../actions/adminActions";
import { connect } from "react-redux";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement(document.getElementById("root"));
class PurchaseRequests extends Component {
  state = {
    requests: null,
    description: null,
    status: null,
    id: null,
    modalIsOpen: false,
    activePage: 1
  };
  async componentDidMount() {
    this.props.getPurchaseRequestsAdmin(1);
  }
  openModal = request => {
    this.setState({ modalIsOpen: true });
    this.setState({ id: request });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "green";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  onSubmitRegister = async values => {
    values.id = this.state.id;
    this.props.changeRequestStatus(values);
    setTimeout(function() {}, 5000);
  };

  handlePageChange = page => {
    this.props.getPurchaseRequestsAdmin(page);
    this.setState({ activePage: page });
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    const renderRequests = () => {
      if (this.props.requests != null) {
        return this.props.requests.map(request => {
          return (
            <tr>
              <td style={{ padding: 15 }}>
                <div class="product-det">
                  <img
                    src={request.bookid.book_images[0]}
                    style={{ width: 40, height: 40 }}
                    alt=""
                  />
                  <div class="product-desc">
                    <h2>
                      <Link to={`/requestdetails/${request.bookid._id}`}>
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
              <td class="text-right">
                <div class="dropdown dropdown-action">
                  <NavDropdown
                    title={<i class="fa fa-ellipsis-v" />}
                    id="basic-nav-dropdown"
                    className="desktop-hover text-black"
                  >
                    <NavDropdown.Item>
                      <Link
                        class="dropdown-item "
                        className="desktop-hover"
                        href="#"
                        data-toggle="modal"
                        data-target="#delete_employee"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure to delete this purchase Request?"
                            )
                          ) {
                            this.props.deletePurchaseRequestsAdmin(
                              1,
                              request._id
                            );
                          }
                        }}
                      >
                        <i class="fa fa-trash-o m-r-5"></i> Delete
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </td>
            </tr>
          );
        });
      } else {
        return <div></div>;
      }
    };
    return (
      <SideNav>
        <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div class="col-sm-12">
            <h4 class="page-title">Purchase Requests</h4>
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
                  <th class="text-right">Action</th>
                </tr>
              </thead>
              <tbody>{renderRequests()}</tbody>
            </table>
          </div>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.props.totalPages}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </SideNav>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.admin);
  return {
    requests: state.admin.purchaseRequests.purchaseRequests,
    totalPages: state.admin.purchaseRequests.totalPages
  };
};
const component = connect(mapStateToProps, {
  getPurchaseRequestsAdmin,
  deletePurchaseRequestsAdmin,
  changeRequestStatus
})(PurchaseRequests);
export default reduxForm({ form: "Respond Purchase Request" })(component);
