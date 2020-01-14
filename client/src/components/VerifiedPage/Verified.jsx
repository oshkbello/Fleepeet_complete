import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { userPostFetch } from "../../actions/User_Auth";
import History from "../../history";
import { Link } from "react-router-dom";
import { createNotification } from "../CommonComponents/Notifications";
import axios from "axios";
import { renderField } from "../CommonComponents/RenderFormField";
import {
  required,
  email,
  exactLength
} from "../CommonComponents/FormValidations";
import Breadcrumb from "../CommonComponents/BradCrumb";
import Footer from "../Footer/index";
const exactLength8 = exactLength(8, "Password length must be minimum");

class Verified extends Component {
componentDidMount(){
let id=this.props.match.params.id
  axios
  .get(`/user/verify/${id}`)
  .then(res=>{
    if(res.status===200){
            createNotification("success", res.data.message);
            setTimeout(() => {
                window.location.href = '/login'
            }, 500)
    }})
  .catch(err=>{
      console.log(err)
     createNotification(
     "error",
     err.response.data.description,
     err.response.data.message
     )
     setTimeout(()=>{
         window.location.href = '/register'
     },3000)
    
    })
}
  render() {
    return (
        <div>
            <div class="main-wrapper" style={{ marginTop: 50 }}>
                <div class="account-page">
                    <div class="container">
                    <div class="account-box">
                        <div class="account-wrapper">
                        <div class="account-logo" style={{ marginTop: 25 }}>
                            <Link href="index.html">
                            <img
                                src="images/logo/flipeetLogo2.png"
                                alt="Flipeet Logo"
                            />
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
  }
}



export default Verified;
