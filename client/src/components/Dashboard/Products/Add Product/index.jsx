import React, { Component } from "react";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import { isbnBasedSearch } from "../../../../actions/productActions";
import { resetForm } from "../../../../actions/productActions";
import categories from "../../../helpers/categories.json";
import axios from "axios";
import History from "../../../../history";
import { createNotification } from "../../../CommonComponents/Notifications";
import Spinner from "../../../helpers/Spinner";
import { renderField } from "../../../CommonComponents/RenderFormField";
import { required } from "../../../CommonComponents/FormValidations";
import { userTickets } from "../../../../actions/User_Auth";
const adaptFileEventToValue = delegate => e => delegate(e.target.files);

const FileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  meta: omitMeta,
  ...props
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
      multiple
    />
  );
};
class AddProduct extends Component {
  state = {
    Message: null,
    loading: false,
    deliveryType: "Meetup",
    bookCondition: "Excelent",
    validateImg: ""
  };

  renderCategories() {
    this.props.userTickets();
    return categories.map(category => {
      return <option value={category}>{category}</option>;
    });
  }

  onSubmitRegister = async (values, dispatch) => {
    values.deliveryType = this.state.deliveryType;
    values.bookCondition = this.state.bookCondition;
    if (!values.book_images) {
      alert("Please Select Minimum 4 Product Images!");
    }
    if (values.book_images !== undefined && values.book_images.length >= 4) {
      this.setState({ loading: true });

      const formData = new FormData();

      formData.append("author", values.author);
      formData.append("category", values.category);
      formData.append("deliveryType", values.deliveryType);
      formData.append("description", values.description);
      formData.append("isbn", values.isbn);
      formData.append("label", values.label);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("tags", values.tags);
      formData.append("title", values.title);
      formData.append("weight", values.weight);
      formData.append("bookCondition", values.bookCondition);

      // formData.append(values);
      for (const key of Object.keys(values.book_images)) {
        formData.append("book_images", values.book_images[key]);
      }

      const token = localStorage.getItem("token");
      formData.append("book_images", values.book_images);
      try {
        const res = await axios.post("/book/createBook", formData, {
          headers: {
            "x-auth-token": `${token}`
          }
        });
        console.log(res);
        this.setState({ Message: res.data.message });
        if (res.status === 200) {
          this.props.userTickets();
          this.setState({ loading: false });
          createNotification("success", res.data.message);
          dispatch(reset("Add Product Dashboard"));

          setTimeout(function() {
            History.push("/dashboard");
          }, 2000);
        }
      } catch (error) {
        this.setState({ loading: false });
        createNotification(
          "error",
          error.response.data.description,
          error.response.data.message
        );
      }
    } else {
      alert("Please Select Minimum 4 Product Images!");
    }
  };

  handleChange = e => {
    let value = e.target.value;
    this.props.isbnBasedSearch(value);
  };
  componentDidMount() {
    this.props.resetForm();
  }
  render() {
    console.log(this.props);
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
      resetForm
    } = this.props;
    return (
      <SideNav>
        <fragment>
          {/* <div class="page-wrapper"> */}
          <div class=" container-fluid ">
            <div class="row ">
              <div class="col-md-8 offset-md-2 ">
                <h4 class="page-title">Add Product</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8 offset-md-2 col-lg-8 mr-lg-5">
                <form
                  action="#"
                  onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
                  encType="multipart/form-data"
                >
                  <div class="form-group">
                    <label>Enter ISBN to Automatically Fill Data</label>
                    <Field
                      class="form-control"
                      defaultValue=" "
                      component={renderField}
                      type="text"
                      validate={required}
                      name="isbn"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <label>Book Title</label>
                    <Field
                      class="form-control"
                      type="text"
                      component={renderField}
                      name="title"
                      validate={required}
                    />
                  </div>
                  <div class="form-group">
                    <label>Author</label>
                    <Field
                      class="form-control"
                      type="text"
                      component={renderField}
                      name="author"
                      validate={required}
                    />
                  </div>
                  <div class="form-group">
                    <label>Book Description</label>
                    <Field
                      cols={30}
                      rows={6}
                      class="form-control"
                      component={renderField}
                      type="textarea"
                      name="description"
                      validate={required}
                    />
                  </div>
                  <div class="form-group">
                    <label>Book Price</label>
                    <Field
                      class="form-control"
                      component={renderField}
                      type="number"
                      steps="any"
                      validate={required}
                      min={1}
                      name="price"
                    />
                  </div>
                  <div class="form-group">
                    <label>Book Weight</label>
                    <Field
                      class="form-control"
                      component="input"
                      type="number"
                      min={1}
                      name="weight"
                    />
                  </div>

                  <div class="form-group">
                    <label>Book Category</label>
                    <Field
                      class="form-control"
                      component="select"
                      name="category"
                      validate={required}
                    >
                      <option />
                      {this.renderCategories()}
                    </Field>
                  </div>

                  <div class="form-group">
                    <label>Book DeliveryType</label>
                    <Field
                      name="deliveryType"
                      component="select"
                      className="form-control"
                      defaultValue="Meetup"
                      onChange={e => {
                        this.setState({ deliveryType: e.target.value });
                      }}
                    >
                      <option value="Meetup">Meetup</option>
                      <option value="Delivery">Delivery</option>
                    </Field>
                  </div>

                  <div class="form-group">
                    <label>Book Condition</label>
                    <Field
                      name="bookCondition"
                      component="select"
                      className="form-control"
                      defaultValue="Good"
                      onChange={e => {
                        this.setState({ bookCondition: e.target.value });
                      }}
                    >
                      <option value="New">New</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair </option>
                      <option value="Poor">Poor</option>
                    </Field>
                  </div>
                  <div class="form-group">
                    <label>Seller Notes</label>
                    <Field
                      cols={30}
                      rows={6}
                      class="form-control"
                      component="textarea"
                      type="textarea"
                      name="sellerNote"
                      component={renderField}
                    />
                  </div>

                  <div class="form-group">
                    <label>Quantity</label>
                    <Field
                      class="form-control"
                      component="input"
                      type="number"
                      min={1}
                      component={renderField}
                      validate={required}
                      name="quantity"
                    />
                  </div>
                  <div class="form-group">
                    <label>Book Tags</label>
                    <Field
                      class="form-control"
                      type="text"
                      component="input"
                      name="tags"
                    />
                  </div>
                  <div class="form-group">
                    <label>Product Images</label>
                    <div>
                      <Field
                        class="form-control"
                        type="file"
                        component={FileInput}
                        name="book_images"
                      />
                    </div>
                  </div>
                  <div class="m-t-20 text-center">
                    <button class="btn btn-warning text-white btn-lg">
                      Publish Product
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </fragment>
        {/* </div> */}
      </SideNav>
    );
  }
}
const mapStateToProps = state => {
  if (
    state.products.singleBookData !== undefined ||
    this.products.singleBookData !== null
  ) {
    return { initialValues: state.products.singleBookData };
  }
  return;
};

export default connect(mapStateToProps, {
  isbnBasedSearch,
  userTickets,
  resetForm
})(
  reduxForm({ form: "Add Product Dashboard", enableReinitialize: true })(
    AddProduct
  )
);
