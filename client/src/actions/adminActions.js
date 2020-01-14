import { ADD_CONTACTUS_EMAIL, ADMIN_GET_USERS , GET_SITE_CONTENT ,GET_ADMIN_REQUESTS} from './types'
import axios from 'axios'
import { createNotification } from '../components/CommonComponents/Notifications'
export const manageSiteContent = (values) => async dispatch => {
    const token = localStorage.getItem('token')
    axios
        .post("/activities/editSiteInfo", values, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            createNotification("success", "Success", response.data.message);
        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
            this.setState({ Message: error.response.data.message });
        });
    dispatch({
        type: ADD_CONTACTUS_EMAIL,
        payload: { test: 'test' }
    })

}


export const getUsers = (page) => async dispatch => {
    const token = localStorage.getItem('token')
    axios
        .post("/activities/getUsers", page, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            dispatch({
                type: ADMIN_GET_USERS,
                payload: response.data
            })

        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


}



export const deleteUser = (id) => async dispatch => {
    console.log(id);
    const token = localStorage.getItem('token')
    axios
        .delete(`/user/delete/${id}`, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {

            createNotification("success", "Success", response.data.message);
            dispatch(getUsers())

        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


}



export const editSliderImage = (values) => async dispatch => {
    const formData = new FormData();
    for (const key of Object.keys(values.sliderImage)) {
        formData.append("sliderImage", values.sliderImage[key]);
    }
    const token = localStorage.getItem("token");

    axios.post("/activities/addSliderImages", formData, {
        headers: {
            "x-auth-token": `${token}`
        }
    }).then(response => {

        createNotification("success", "Success", response.data.message);

    })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


}




export const editBreadCrumbImage = (values) => async dispatch => {
    const formData = new FormData();
    formData.append("breadcrumbImage", values.breadcrumbImage[0]);
    const token = localStorage.getItem("token");

    axios.post("/activities/editBreadcrumbImages", formData, {
        headers: {
            "x-auth-token": `${token}`
        }
    }).then(response => {

        createNotification("success", "Success", response.data.message);

    })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


}



export const getSiteContent = () => async dispatch => {
    axios.get("/activities/getSiteContent", {
    }).then(response => {
        console.log(response.data);

        dispatch({
            type:GET_SITE_CONTENT,
            payload:response.data.content
        
        })

    })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


}



export const getPurchaseRequestsAdmin = (page) => async dispatch => {
    const token = localStorage.getItem('token')
    axios
        .post("/activities/getPurchaseRequestsAdmin", page, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            console.log(response.data);
            dispatch({
                type: GET_ADMIN_REQUESTS,
                payload: response.data
            })

        })
        .catch(error => {
           console.log(error)
        });


  }

export const deletePurchaseRequestsAdmin = (page, id) => async dispatch => {
    console.log(id);
    const data = {
        id
    };
    const token = localStorage.getItem('token')
    axios
        .post('/activities/deletePurchaseRequest', data,{
    
                        headers: {
                            'x-auth-token': token
                        }
                    })  .then(response => {     
            console.log(response)
            createNotification("success", "Success", response.data.message);
            dispatch(getPurchaseRequestsAdmin(page))

        })
        .catch(error => {
            console.log(error)
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


  }
  
  
  export const userComplaints = (page) => async dispatch => {
    // dispatch({ type: "Response-Loader", data: true });

    const token = localStorage.getItem('token')
    axios
        .post("/activities/getuserComplaints",page, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {          dispatch({
            type: 'GET_USER_COMPLAINTS',
            payload: response.data
        })

    })
    .catch(error => {
        dispatch({ type: "Response-Loader", data: false });
       console.log(error)
    });


}
 
