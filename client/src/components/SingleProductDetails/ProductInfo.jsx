import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { reviewBook } from "../../actions/index";
import { Link } from "react-router-dom";
import axios from "axios";
// import ReportSeller from "../UserProfile/ReportSeller";

class ProductInfo extends React.Component {
  state = { Message: null };
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

  onSubmitBookComment = async values => {
    values.bookid = this.props.product._id;
    const token = localStorage.getItem('token');
    const res = await axios.post("/book/commentBook", values,{
      headers:{
        'x-auth-token':token
      }
    });
    this.setState({ Message: res.message });
  };

  render() {
    const { product } = this.props;
    if (product) {
      return (
        <div className="col-md-12">
          <div className="row" style={{ marginTop: 30 }}>
            <div className="col-md-6">
              <h4>{product.title}</h4>
            </div>
            <div
              className="col-md-6 how-img"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Link
                to={`/user/${product.user._id}`}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <img
                  src={product.user.profile_image}
                  className="rounded-circle img-fluid"
                  alt=""
                  style={{ width: 64, height: 64 }}
                />

                <span className='clr-scheme' style={{ marginTop: 14 }}>{product.user.firstName}</span>
              </Link>
            </div>
          </div>
          <p className="prod_detials">
            ISBN: <span class="text-muted">{product.isbn}</span>
          </p>
          <p className="prod_detials">
            Price: <span class="text-muted">${product.price}</span>
          </p>
          <p className="prod_detials">
            Author: <span class="text-muted">{product.author}</span>
          </p>
          <p className="prod_detials">
            Book Condition:{" "}
            <span class="text-muted">{product.bookCondition}</span>
          </p>
          <p className="prod_detials">
            Description:{" "}
            <span class="text-muted">
             {product.description}
            </span>
          </p>
        </div>
      );
    }
    return <div></div>;
  }
}

const component = connect(null, { reviewBook })(ProductInfo);

export default reduxForm({ form: "Review" })(component);
