import { GET_USER_PROFILE_DATA } from './types';
import { createNotification } from "../";
import axios from 'axios'
export const getUserProfileData = (id, page) => async dispatch => {
  axios
    .post("/activities/userProfile", { id, page })
    .then(response => {
      console.log(response);
      dispatch({
        type: GET_USER_PROFILE_DATA,
        payload: response.data
      })

    })
    .catch(error => {
      throw error;
    });
}
export const siteUserData = (id) => async dispatch => {
  dispatch({ type: "Response-Loader", data: true });
  const token = localStorage.getItem("token");
  axios
    .get(`/activities/siteUserData/${id}`,{
      headers: {
        "x-auth-token": `${token}`
      }
    })
    .then(response => {
      dispatch({ type: "Response-Loader", data: false });

      console.log(response.data.data);
      dispatch({
        type: 'GET_SITE_USER_PROFILE_DATA',
        payload: response.data.data
      })

    })
    .catch(error => {
      dispatch({ type: "Response-Loader", data: false });
      throw error;
    });
}

export const reportSeller = (data)  => {
  
}