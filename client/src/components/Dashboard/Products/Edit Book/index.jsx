import React, { Component } from "react";
import TopNav from "../../Navigation/TopNav";
import SideNav from "../../Navigation/SideNav";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { singleBook } from "../../../../actions/productActions";
import categories from "../../../helpers/categories.json";
import axios from "axios";
import History from "../../../../history";
import { createNotification } from "../../../CommonComponents/Notifications";
import Spinner from "../../../helpers/Spinner";
import { renderField } from "../../../CommonComponents/RenderFormField";
import { required } from "../../../CommonComponents/FormValidations";
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
  state = { Message: null, loading: false };

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleBook(id);
  }

  renderCategories() {
    return categories.map(category => {
      return <option value={category}>{category}</option>;
    });
  }

  onSubmitRegister = async values => {
    if (!values.book_images) {
      alert("Please Select Minimum 4 Product Images!");
    }
    if (values.book_images !== undefined && values.book_images.length >= 4) {
      this.setState({ loading: true });
      const id = this.props.match.params.id;
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
      formData.append("bookId", id);
      // formData.append(values);
      // console.log(values.book_images);
      for (const key of Object.keys(values.book_images)) {
        formData.append("book_images", values.book_images[key]);
      }
      const token = localStorage.getItem("token");
      // formData.append("book_images", values.book_images);
      try {
        const res = await axios.post("/book/editBook", formData, {
          headers: {
            "x-auth-token": `${token}`
          }
        });
        console.log(res);
        this.setState({ Message: res.data.message });
        if (res.status === 200) {
          this.setState({ loading: false });
          createNotification("success", res.data.message);
          setTimeout(function() {
            History.push("/dashboard");
          }, 3000);
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
    this.props.isbnSearch(value);
  };

  render() {
    return (
        <SideNav >
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <h4 class="page-title">Add Product</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 offset-md-2">
              <form
                action="#"
                onSubmit={this.props.handleSubmit(this.onSubmitRegister)}
                encType="multipart/form-data"
              >
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
                  <label>ISBN</label>
                  <Field
                    class="form-control"
                    component="input"
                    type="text"
                    name="isbn"
                  />
                </div>

                <div class="form-group">
                  <label>Book Category</label>
                  <Field
                    class="form-control"
                    component="select"
                    name="category"
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
                  >
                    <option>Select Delivery Type</option>
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
                    <option>Select Book Condition</option>
                    <option value="New">New</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair </option>
                    <option value="Poor">Poor</option>
                  </Field>
                </div>
                <div class="form-group">
                  <label>Quantity</label>
                  <Field
                    class="form-control"
                    component="input"
                    type="number"
                    min={1}
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
                  <button class="btn btn-warning text-white btn-lg">Update Product</button>
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
const mapDispatchtoProps = dispatch => {
  return {
    getSingleBook: data => dispatch(singleBook(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(reduxForm({ form: "Edit book", enableReinitialize: true })(AddProduct));
