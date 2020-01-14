import React, { Component, Fragment } from "react";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import axios from "axios";
import Spinner from "../../../helpers/Spinner";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createNotification } from "../../../CommonComponents/Notifications";
import { renderField } from "../../../CommonComponents/RenderFormField";
import { required } from "../../../CommonComponents/FormValidations";
import { giveDiscount,productDetails } from "../../../../actions/productActions";
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
class ProductDetailsDashboard extends Component {
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
    values.bookid = this.props.match.params.id;
    this.props.giveDiscount(values)

    this.closeModal();
  };

  state = { Message: null, status: null };
  constructor(props) {
    super(props);
    this.state = { product: null, loading: false };
  }

  renderInput({ input, label, type }) {
    return (
      <div class="input__box">
        <label>
          {label} <span>*</span>
        </label>
        <input {...input} type={type} />
      </div>
    );
  }

  async componentDidMount() {
    const id = this.props.match.params.id;

    this.props.productDetails(id)
    
  }

  renderBookImages = () => {
    if (this.props.product !== null) {
      return this.props.product.book_images.map(images => {
        return (
          <li>
            <a href={images}>
              <img src={images} alt="" />
            </a>
          </li>
        );
      });
    }
    return <div></div>;
  };

  setPublishing = async status => {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });
    const res = await axios.post("/book/setPublishing", status, {
      headers: {
        "x-auth-token": `${token}`
      }
    });
    if (res.status === 200) {
      const id = this.props.match.params.id;

      this.props.productDetails(id)
      this.setState({
        Message: res.data.message,
        status: res.data.data.status,
        loading: false
      });
      createNotification("success", res.data.message);
    }
    if (res.status !== 200) {
      this.setState({ loading: false });
      createNotification("error", res.data.message);
    }
  };

  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;

    if (this.props.product === null) {
      return (
        <div style={{ position: "relative", top: "50%", left: "50%" }}>
          <Spinner type="TailSpin" height="100" width="100" marginTop="220px" />
        </div>
      );
    }
    return (
      
      <Fragment>
          <SideNav >
          {this.props.product !== null ? (
            
            <div className="content container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <h4 className="page-title">Product Details</h4>
                </div>
              </div>
              <div className="card-box">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="product-view">
                      <div className="proimage-wrap">
                        <div className="pro-image" id="pro_popup">
                          <a href="img/product/product-01.jpg">
                            <img
                              className="img-fluid"
                              src={`/images/books/${this.props.product.book_images[0]}`}
                              alt=""
                            />
                          </a>
                        </div>
                        <ul className="proimage-thumb">
                          {this.renderBookImages()}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="product-info" style={{maxWidth:'100%'}}>
                      <h2>{this.props.product.title}</h2>
                      <p>{this.props.product._id}</p>
                      <p className="product_price">
                        $ {this.props.product.price}
                      </p>
                      <p>
                        <b>Qantity:</b>  {this.props.product.quantity}
                      </p>
                      <p>
                        <b>Status:</b> {this.props.product.status} &nbsp;
                        {this.props.product.quantity === 0 ? (
                          <button
                            className="btn btn-danger"
                            disabled
                          >
                            Publish
                          </button>
                        ) : (
                          <span>
                            {
                              this.props.product.status === "published" ? (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => {
                                    this.setPublishing({
                                      status: "unpublished",
                                      bookid: this.props.product._id
                                    });
                                  }}
                                >
                                  Unpublish
                          </button>
                              ) : (
                                  <button
                                    className="btn btn-success"
                                    onClick={() => {
                                      this.setPublishing({
                                        status: "published",
                                        bookid: this.props.product._id
                                      });
                                    }}
                                  >
                                    publish
                          </button>
                                )
                            }
                          </span>
                            
                        ) }
                        
                        &nbsp;
                        <button
                          onClick={() => this.openModal()}
                          class="btn btn-warning text-white btn-rounded"
                        >
                          <i class="fa fa-plus"></i> Give Discount
                        </button>
                        {this.state.loading ? (
                          <Spinner
                            type="ThreeDots"
                            marginTop="10px"
                            height="70"
                            width="70"
                          />
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <ul className="nav nav-tabs nav-tabs-bottom">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#product_desc"
                          data-toggle="tab"
                        >
                          Description
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane show active" id="product_desc">
                        <div className="product-content">
                          <p>{this.props.product.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h3 ref={subtitle => (this.subtitle = subtitle)}>Discount on Book</h3>

          <form
            action="#"
            onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
            id="requestsend"
            encType="multipart/form-data"
          >
            <div class="form-group">
              <label>New price after discount </label>
            </div>
            <div class="form-group">
              <Field
                name="contentType"
                component={renderField}
                className="form-control"
                type="number"
                validate={required}
                name="price"
              ></Field>
            </div>
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
        </SideNav>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  
  return {
    product: state.products.productDetails,
  };
};
const component = connect(mapStateToProps, {giveDiscount,productDetails})(ProductDetailsDashboard);

export default reduxForm({ form: "Review" })(component);
