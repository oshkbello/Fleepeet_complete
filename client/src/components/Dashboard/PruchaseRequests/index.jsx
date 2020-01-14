import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TopNav from "../../Dashboard/Navigation/TopNav";
import SideNav from "../../Dashboard/Navigation/SideNav";
import { Link } from "react-router-dom";
import {
  getPurchaseRequests,
  changeRequestStatus,
} from "../../../actions/purchaseRequests";
import { connect } from "react-redux";
import Modal from "react-modal";
import Spinner from "../../helpers/Spinner";
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
    loading: true
  };
  async componentDidMount() {
    this.props.getPurchaseRequests();
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
    this.closeModal();
    this.props.getPurchaseRequests();
    setTimeout(function () { }, 5000);
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    const renderRequests = () => {

      if (this.props.requests !== null) {
        return this.props.requests.map(request => {
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
                      <Link >
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
                <div>
                  <button
                    onClick={() => this.openModal(request._id)}
                    class="btn btn-primary"
                    disabled={
                      request.status === "Accepted" ||
                      request.status === "Rejected"
                    }
                  >
                    Accept/Reject
                  </button>
                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h2 ref={subtitle => (this.subtitle = subtitle)}>
                      Respond to Purchase Request
                    </h2>

                    <form
                      action="#"
                      onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
                      id="requestsend"
                      encType="multipart/form-data"
                    >
                      <div class="form-group">
                        <label>Description</label>
                        <Field
                          name="description"
                          component="textarea"
                          type="textarea"
                          className="form-control"
                          onChange={e => {
                            this.setState({ description: e.target.value });
                          }}
                        />
                        <label>Status</label>
                        <Field
                          name="status"
                          component="select"
                          className="form-control"
                          onChange={e => {
                            this.setState({ status: e.target.value });
                          }}
                        >
                          <option />

                          <option value="Accepted">Accept</option>
                          <option value="Rejected">Reject</option>
                        </Field>
                      </div>
                      <button
                        style={{ margin: 12 }}
                        type="submit"
                        className="btn btn-primary"
                        disabled={
                          pristine ||
                          submitting ||
                          this.state.status === null ||
                          this.state.status === "" ||
                          this.state.description === null ||
                          this.state.description === ""
                        }
                      >
                        Submit
                      </button>
                      <button
                        onClick={this.closeModal}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </form>
                  </Modal>
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
      <SideNav >
        <div class="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div class="col-sm-12">
            <h4 class="page-title">Purchase Requests Received</h4>
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


      </SideNav>
    );
  }
}

const mapStateToProps = state => {
  return {
    requests: state.purchaseRequests.purchaseRequests,
  };
};
const component = connect(mapStateToProps, {
  getPurchaseRequests,
  changeRequestStatus,
})(PurchaseRequests);
export default reduxForm({ form: "Respond Purchase Request" })(component);
