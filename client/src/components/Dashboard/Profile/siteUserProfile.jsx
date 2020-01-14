import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopNav from "../../Header/Header";
import SideNav from "../Navigation/SideNav";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { buyTickets } from "../../../actions/User_Auth";
import { logoutUser } from "./../../../actions/User_Auth";
import { siteUserData } from "./../../../actions/userProfile";
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

class SiteUserProfile extends Component {
  state = { tickets: null, token: null };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.siteUserData(id);
  }
  render() {
    return (
      <SideNav>
        {this.props.loading ? (
          <div style={{ position: "relative", top: "50%", left: "40%" }}>
            <Sppiner type="TailSpin" height="100" width="100" />
          </div>
        ) : (
          <div class="content container-fluid">
            <div class="row">
              <div class="col-sm-7 col-4">
                <h4 class="page-title">My Profile</h4>
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
                            this.props.siteUser
                              ? this.props.siteUser.profile_image
                              : ""
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
                              {this.props.siteUser
                                ? this.props.siteUser.firstName
                                : ""}
                              {"  "}{" "}
                              {this.props.siteUser
                                ? this.props.siteUser.lastName
                                : ""}
                            </h3>
                          </div>
                        </div>
                        <div class="col-md-7">
                          <ul class="personal-info">
                            <li>
                              <span class="title">Email:</span>
                              <span class="text">
                                <a href="">
                                  {this.props.siteUser
                                    ? this.props.siteUser.email
                                    : ""}
                                </a>
                              </span>
                            </li>

                            <li>
                              <span class="title">City:</span>
                              <span class="text">
                                {this.props.siteUser
                                  ? this.props.siteUser.city
                                  : ""}
                              </span>
                            </li>
                            <li>
                              <span class="title">Account Type:</span>
                              <span class="text">
                                {this.props.siteUser
                                  ? this.props.siteUser.accountType
                                  : ""}
                              </span>
                            </li>
                            <li>
                              <span class="title">School:</span>
                              <span class="text">
                                {this.props.siteUser
                                  ? this.props.siteUser.school
                                  : ""}
                              </span>
                            </li>
                            <li>
                              <span class="title">Tickets Available</span>
                              <span class="text">
                                {this.props.siteUser
                                  ? this.props.siteUser.tickets
                                  : 0}
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
        )}
      </SideNav>
    );
  }
}
const mapStateToProps = state => {
  return {
    siteUser: state.UserProfile.siteUser,
    loading: state.Loader.loading,
    ticketPrice: state.admin.content.ticketPrice
  };
};

const component = connect(mapStateToProps, { logoutUser, siteUserData })(
  SiteUserProfile
);

export default reduxForm({ form: "Buy Tickets" })(component);
