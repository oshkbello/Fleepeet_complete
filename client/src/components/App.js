import React from 'react'
import Shop from './ShopStore/Shop';
import SingleProduct from './SingleProductDetails/SingleProduct';
import Home from './Home';
import Checkout from '../components/Checkout/index'
import { Router, Route, BrowserRouter, Switch } from "react-router-dom";
import history from "../history";
import { connect } from 'react-redux'
import { userPostProfile } from '../actions/User_Auth'
import { getSiteContent } from '../actions/adminActions'
import Faq from './FAQ/'
import ContactUs from './Contact Us/ContactUs';
import DashboardProducts from '../components/Dashboard/Products/ProductsGrid/'
import AddProductDashboard from '../components/Dashboard/Products/Add Product/index'
import ProductDetailsDashboard from '../components/Dashboard/Products/ProductDetails/index'
import GetPurchaseRequests from '../components/Dashboard/PruchaseRequests/index';
import Login from '../components/MyAccount/Login'
import 'react-animated-slider/build/horizontal.css';
import ReferFriend from '../components/Dashboard/ReferFriend/index'
import Register from '../components/MyAccount/Register'
import UserProfile from '../components/UserProfile/index'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications";
import Cart from '../components/CartNew/Cart'
import PrivateRoute from './../components/pivateRoute/privateRoutes';
import AdminPrivateRoute from './../components/pivateRoute/AdminPrivateRoute';
import 'react-image-gallery/styles/css/image-gallery-no-icon.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Profile from './Dashboard/Profile/index'
import UpdateProfile from './Dashboard/Profile/updateProfile'
import Transactions from './Dashboard/Transactions/index'
import ManageSiteContent from '../components/Dashboard/Admin/SiteContent/SiteContent'
import ManageUsers from './Dashboard/Admin/Manage Users/index'
import ManagePurchaseRequests from './Dashboard/Admin/Manage Purchase Requests/index'
import Verified from './VerifiedPage/Verified';
import Forget from '../components/MyAccount/Forget'
import ActiveAccount from '../components/MyAccount/activeAccount'
import ResetPassword from '../components/MyAccount/ResetPassword'
import EditProduct from './Dashboard/Products/Edit Book/index'
import PruchaseRequestsSent from './Dashboard/PruchaseRequests/PurchaseRequestsSent'
import Dashboard from './Dashboard/Dashboard/index'
import CreateBlogPost from '../components/Dashboard/Our Blog/Create Blog_Post/createPost'
import SingleBlogPost from './../components/Our Blog/SingleBlogPost';
import GridBlogPost from './../components/Dashboard/Our Blog/Grid Blog_Post/GridBlogPost'
import AdminSingleBlogPost from './../components/Dashboard/Our Blog/Single Blog_Post/AdminSingleBlogPost';
import EditBlogPost from './../components/Dashboard/Our Blog/Edit Blog_Post/editPost';
import CreateAdmin from './Dashboard/Admin/Create Admin/CreateAdmin';
import EditProfile from './Dashboard/Profile/updateProfile'
import siteUserProfile from './Dashboard/Profile/siteUserProfile'
import editSiteUserProfile from './Dashboard/Profile/editSiteUserProfile'
import ManageFAQ from './Dashboard/Admin/Manage FAQ/index';
import CreateFAQ from './Dashboard/Admin/Manage FAQ/CreateFAQ';
import EditFAQ from './Dashboard/Admin/Manage FAQ/EditFAQ';

import Complaints from '../components/Dashboard/Admin/User Complaints/UserComplaints'
class App extends React.Component {
    componentDidMount() {
        this.props.userPostProfile();
        this.props.getSiteContent();
    }
    render() {
        return (
            <React.Fragment>
                <NotificationContainer />
                <Router history={history}>
                    <div>
                        <Route path="/" exact component={Home} />
                        <Route path="/shop" exact component={Shop} />
                        <Route path="/cart" exact component={Cart} />
                        <Route path="/checkout" exact component={Checkout} />
                        <Route path="/productDetails/:id" exact component={SingleProduct} />
                        <Route path="/wishlist" exact component={DashboardProducts} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/verify/:id" exact component={Verified} />
                        <Route path="/forgot-password" exact component={Forget} />
                        <Route path="/reset-password/:resetToken" exact component={ResetPassword} />
                        <Route path="/active-account" exact component={ActiveAccount} />
                        <Route path="/blog-details/:id" exact component={SingleBlogPost} />


                        <Route path="/faq" exact component={Faq} />
                        <Route path="/contact_us" exact component={ContactUs} />
                        <Route path="/user/:id" exact component={UserProfile} />

                        <Switch>
                            <PrivateRoute exact path="/myProfile" component={Profile} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/edit-profile" component={UpdateProfile} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/dashboardproductDetails/:id" component={ProductDetailsDashboard} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/dashboardEditProduct/:id" component={EditProduct} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/dashboardAddProducts" component={AddProductDashboard} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/siteUserProfile/:id" component={siteUserProfile} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/editSiteUserProfile/:id" component={editSiteUserProfile} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/myProducts" component={DashboardProducts} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/purchaserequests" component={GetPurchaseRequests} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/purchaserequestsent" component={PruchaseRequestsSent} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/referfriend" exact component={ReferFriend} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/mytransactions" exact component={Transactions} />
                        </Switch>
                        <Switch>
                            <AdminPrivateRoute exact path="/manageSiteContent" exact component={ManageSiteContent} />
                        </Switch>
                        <Switch>
                            <AdminPrivateRoute exact path="/manageUsers" exact component={ManageUsers} />
                        </Switch>
                        <Switch>
                            <AdminPrivateRoute exact path="/managePurchaseRequests" exact component={ManagePurchaseRequests} />
                        </Switch>
                        <Switch>
                            <AdminPrivateRoute exact path="/dashboardBlogPosts" component={GridBlogPost} />
                        </Switch>
                        <Switch>
                            <AdminPrivateRoute exact path="/dashboardSingleBlogPost/:id" component={AdminSingleBlogPost} />
                        </Switch>
                        <Switch>
                            <AdminPrivateRoute exact path="/dashboardEditBlogPost/:id" component={EditBlogPost} />
                        </Switch>
                        <Switch>
                            <AdminPrivateRoute exact path="/createAdmin" component={CreateAdmin} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/dashboradCreateBlogPost" component={CreateBlogPost} />
                        </Switch>

                        <Switch>
                            <PrivateRoute exact path='/editProfile' component={EditProfile} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/userComplaints" component={Complaints} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/manageFAQ" component={ManageFAQ} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/createFAQ" component={CreateFAQ} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/editFAQ/:id" component={EditFAQ} />
                        </Switch>
                    </div>
                </Router >
            </React.Fragment>

        )

    }
}


export default connect(null, { userPostProfile, getSiteContent })(App)