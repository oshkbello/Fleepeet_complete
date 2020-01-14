import React, { Component } from "react";
import {Link} from 'react-router-dom'
import TopNav from "../../Header/Header";
import SideNav from "../Navigation/SideNav";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import Modal from "react-modal";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../../CommonComponents/RenderFormField";
import { required } from "../../CommonComponents/FormValidations";
import { buyTickets } from "../../../actions/User_Auth";
import { logoutUser } from "./../../../actions/User_Auth";
import { createNotification } from "../../CommonComponents/Notifications";
import Sppiner from "../../helpers/Spinner";
import axios from "axios";
import History from "../../../history";


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
class MyProfile extends Component {
  state = { modalIsOpen: false, tickets: null, token: null, loading: false };

  componentDidMount() {
    History.push('/myProfile');
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "green";
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  suspendAccount = () => {
    if (window.confirm("Are you sure to suspend your account?")) {
      // console.log(this.props.user._id);
      if (this.props.user._id === undefined) {
        console.log('hello')
        History.push('/myProfile');

      }
      const token = localStorage.getItem("token");
      console.log(token)
      axios
        .put(`/user/suspendUser/${this.props.user._id}`,
          {
            headers: {
              "x-auth-token": `${token}`
            }
          })
        .then(response => {
          createNotification("error", response.data.message);
          if (response.status === 200) {
            this.setState({ loading: false });
            this.props.logoutUser();
            History.push('/login');
          }
        })
        .catch(error => {
          createNotification(
            "error",
            error.response.data.message
          );
        });
    }
  };

  deleteAccount = () => {
    if (window.confirm("Are you sure to delete your account?")) {
      console.log(this.props.user._id);
      if (this.props.user._id === undefined) {
        console.log('hello')
        History.push('/myProfile');

      }
      const token = localStorage.getItem("token");
      axios
        .delete(`/user/delete/${this.props.user._id}`, 
          {
            headers: {
              "x-auth-token": `${token}`
            }
          }
        )
        .then(response => {
          console.log(response)
          createNotification("error", response.data.message);
          if (response.status === 200) {
            this.setState({ loading: false });
            this.props.logoutUser();
            History.push('/login');
          }
        })
        .catch(error => {
          console.log(error)
          createNotification("error", error.response.message);
        });
    }
  };

  onSubmitRegister = values => {
    this.setState({ loading: true });
    values.token = this.state.token;
    values.ticketAmount = this.props.ticketPrice;
    this.closeModal();
    return this.props.buyTickets(values);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <SideNav>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h3 ref={subtitle => (this.subtitle = subtitle)}>Buy Tickets</h3>
          <p>Price of one ticket is ${this.props.ticketPrice}</p>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
            id="requestsend"
            encType="multipart/form-data"
          >
            <div class="form-group">
              <label>Number of Tickets wants to buy</label>
              <Field
                name="tickets"
                component={renderField}
                type="number"
                className="form-control"
                validate={required}
                onChange={e => {
                  this.setState({ tickets: e.target.value });
                  console.log(this.state.tickets);
                }}
              />
            </div>
            <div class="form-group">
              <StripeCheckout
                amount={this.state.tickets * this.props.ticketPrice * 100}
                token={token => {
                  this.setState({ token: token.id });
                }}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                name="Flipeet"
                description={`Ticket Price: $${
                  this.props.ticketPrice
                }. Yours tickets are '${this.state.tickets}'.`}
              >
                <a className="btn btn-warning text-white btn-rounded">Confirm Payment</a>
              </StripeCheckout>
            </div>

            <button
              style={{ margin: 12 }}
              type="submit"
              className="btn btn-warning text-white"
              // disabled={
              //   pristine ||
              //   submitting||
              //   this.state.token===null
              // }
            >
              Submit
            </button>
            <button onClick={this.closeModal} className="btn btn-danger">
              Cancel
            </button>
          </form>
          {this.props.loading ? (
            <Sppiner
              type="ThreeDots"
              marginTop="3px"
              height="50"
              width="50"
              marginLeft="70px"
            />
          ) : (
            ""
          )}
        </Modal>
        <div class="content container-fluid">
          <div class="row">
            <div class="col-sm-7 col-4">
              <h4 class="page-title">My Profile</h4>
            </div>
            <div class="col-sm-5 col-8 text-right m-b-30">
              <Link
                to="/edit-profile"
                class="btn btn-warning text-white btn-sm btn-rounded"
              >
                <i class="fa fa-plus"></i> Edit Profile
              </Link>
              <button
                className="btn btn-danger btn-sm btn-rounded link"
                onClick={() => this.suspendAccount()}
              >
                <i class="fa fa-pause"></i> Suspend Account
              </button>

              <br />
              <div class="row text-right m-t-10">
                <div className="col-sm-2 col-4"></div>
                <div className="col-sm-10 col-8">
                  <button
                    onClick={() => this.openModal()}
                    class="btn btn-warning text-white btn-sm btn-rounded"
                  >
                    <i class="fa fa-plus"></i> Buy Tickets
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-rounded"
                    onClick={() => this.deleteAccount()}
                  >
                    <i class="fa fa-times"></i> Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-box">
            <div class="row">
              <div class="col-md-12">
                <div class="profile-view">
                  <div class="profile-img-wrap">
                    <div class="profile-img">
                      <img
                        class="avatar"
                        src={
                          this.props.user ? this.props.user.profile_image : ""
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="profile-basic">
                    <div class="row">
                      <div class="col-md-5">
                        <div class="profile-info-left">
                          <h3 class="user-name m-t-0 m-b-0">
                            {" "}
                            {this.props.user ? this.props.user.firstName : ""}
                            {"  "}{" "}
                            {this.props.user ? this.props.user.lastName : ""}
                          </h3>
                        </div>
                      </div>
                      <div class="col-md-7">
                        <ul class="personal-info">
                          <li>
                            <span class="title">Email:</span>
                            <span class="text">
                              <a href="">
                                {this.props.user ? this.props.user.email : ""}
                              </a>
                            </span>
                          </li>

                          <li>
                            <span class="title">City:</span>
                            <span class="text">
                              {this.props.user ? this.props.user.city : ""}
                            </span>
                          </li>
                          <li>
                            <span class="title">Account Type:</span>
                            <span class="text">
                              {this.props.user
                                ? this.props.user.accountType
                                : ""}
                            </span>
                          </li>
                          { this.props.user.accountType === 'student' ? (
                          <li>
                            <span class="title">School:</span>
                            <span class="text">
                              {this.props.user
                                ? this.props.user.school
                                : ""}
                            </span>
                          </li>
                          ) : null}
                          <li>
                            <span class="title">Tickets Available</span>
                            <span class="text">
                              {this.props.tickets ? this.props.tickets : 0}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </SideNav>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.loginUser.currentUser,
    tickets: state.loginUser.tickets,
    loading: state.Loader.loading,
    ticketPrice: state.admin.content.ticketPrice
  };
};

const component = connect(mapStateToProps, { buyTickets, logoutUser })(MyProfile);

export default reduxForm({ form: "Buy Tickets" })(component);
