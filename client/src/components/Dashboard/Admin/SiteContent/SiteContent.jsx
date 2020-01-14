import React, { Component } from "react";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../../../CommonComponents/RenderFormField";
import { required, email } from "../../../CommonComponents/FormValidations";
import SliderImages from "./SliderImages";
import BreadCrumbImage from "./BreadCrumbImage";
import {
  manageSiteContent,
  getSiteContent
} from "../../../../actions/adminActions";
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
class SiteContent extends Component {
  componentDidMount() {
    this.props.getSiteContent();
  }
  state = { modalIsOpen: false, actionType: null };

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
  onSubmitRegister = async values => {
    this.props.manageSiteContent(values);
    this.closeModal();
  };

  renderpromocode = () => {
    if (this.props.content.promoCode) {
      return this.props.content.promoCode.map(code => {
        return <span class="badge badge-warning text-white">{code}</span>;
      });
    }
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <SideNav >
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h3 ref={subtitle => (this.subtitle = subtitle)}>Edit Site Information</h3>

          <form
            action="#"
            onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
            id="requestsend"
            encType="multipart/form-data"
          >
            <div class="form-group">
              <label>Select Content To Edit </label>
            </div>
            <div class="form-group">
              <Field
                name="contentType"
                component="select"
                className="form-control"
                onChange={e => {
                  this.setState({ actionType: e.target.value });
                }}
                validate={required}
              >
                <option />
                <option value="contactUsEmail">Edit Contact Us Email</option>
                <option value="setTicketPrice">Set Ticket Price</option>
                <option value="createPromoCode">Create Promo Code</option>
              </Field>
            </div>
            {this.state.actionType === "contactUsEmail" ? (
              <div class="form-group">
                <label>Enter Contact Us Email </label>
                <Field
                  name="contactUsEmail"
                  component={renderField}
                  className="form-control"
                  type="email"
                  placeholder="Enter Contact US Email"
                  validate={[required, email]}
                ></Field>
              </div>
            ) : this.state.actionType === "setTicketPrice" ? (
              <div class="form-group">
                <label>Enter Ticket Price </label>
                <Field
                  name="ticketPrice"
                  type="number"
                  component={renderField}
                  className="form-control"
                  validate={required}
                ></Field>
              </div>
            ) : this.state.actionType === "createPromoCode" ? (
              <div class="form-group">
                <label>Enter Promo Code </label>
                <Field
                  name="promoCode"
                  type="number"
                  component={renderField}
                  className="form-control"
                  validate={required}
                ></Field>
              </div>
            ) : null}
            <button
              style={{ margin: 12 }}
              type="submit"
              className="btn btn-warning text-white"
              disabled={pristine || submitting || this.state.token === null}
            >
              Submit
            </button>
            <button onClick={this.closeModal} className="btn btn-danger">
              Cancel
            </button>
          </form>
        </Modal>
      
          <div class="row">
            <div class="col-sm-7 col-4">
              <h4 class="page-title">Site Information</h4>
            </div>

            <div class="col-sm-5 col-8 text-right m-b-30">
              <button
                onClick={() => this.openModal()}
                class="btn btn-warning text-white btn-rounded"
              >
                <i class="fa fa-plus"></i> Edit Information
              </button>
            </div>
          </div>
          <div class="card-box">
            <div class="row">
              <div class="col-md-12">
                <div class="profile-view">
                  <div>
                    <div class="row">
                      <div class="col-md-12">
                        <ul class="personal-info">
                          <li>
                            <span class="title">Contact Us Email:</span>
                            <span class="text">
                              <a href="">
                                {this.props.content
                                  ? this.props.content.contactUsEmail
                                  : ""}
                              </a>
                            </span>
                          </li>

                          <li>
                            <span class="title">Ticket Price:</span>
                            <span class="text">
                              $
                              {this.props.content
                                ? this.props.content.ticketPrice
                                : ""}
                            </span>
                          </li>
                          <li>
                            <span class="title">Promo Codes:</span>
                            {this.renderpromocode()}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
     
        <SliderImages
          images={this.props.content ? this.props.content.sliderImage : []}
        />
        <BreadCrumbImage
          image={this.props.content ? this.props.content.breadcrumbImage : ""}
        />
      </SideNav>
    );
  }
}
const mapStateToProps = state => {
  return {
    content: state.admin.content
  };
};

const component = connect(mapStateToProps, {
  manageSiteContent,
  getSiteContent
})(SiteContent);

export default reduxForm({ form: "Buy Tickets" })(component);
