import { GET_PURCHASE_REQUESTS, GET_TRANSACTIONS , GET_PURCHASE_REQUESTS_BUYER,GET_SELLER_NEW_PURCHASE_REQUESTS,GET_SELLER_NEW_PURCHASE_REQUESTS_AS_BUYER} from './types'
import axios from 'axios'
import { createNotification } from '../components/CommonComponents/Notifications'

export const getPurchaseRequests = () => async dispatch => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/activities/getMyPurchaseRequests", {
    headers: {
      "x-auth-token": `${token}`
    }
  });
  dispatch({
    type: GET_PURCHASE_REQUESTS,
    payload: res.data.data
  })

}


export const getSellerNewPurchaseRequests = () => async dispatch => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/activities/getMyNewPurchaseRequests", {
    headers: {
      "x-auth-token": `${token}`
    }
  });
  dispatch({
    type: GET_SELLER_NEW_PURCHASE_REQUESTS,
    payload: res.data.data
  })

}



export const getPurchaseRequestsBuyer = () => async dispatch => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/activities/getPurchaseRequestBuyer", {
    headers: {
      "x-auth-token": `${token}`
    }
  });
  console.log(res);
  dispatch({
    type: GET_PURCHASE_REQUESTS_BUYER,
    payload: res.data.result
  })

}


export const getnewPurchaseRequestsBuyer = () => async dispatch => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/activities/getnewPurchaseRequestBuyer", {
    headers: {
      "x-auth-token": `${token}`
    }
  });
  console.log(res);
  dispatch({
    type: GET_SELLER_NEW_PURCHASE_REQUESTS_AS_BUYER,
    payload: res.data.result
  })

}



export const changeRequestStatus = (values) => async dispatch => {
  const token = localStorage.getItem("token");
  axios
    .post("/activities/respondToPurchaseRequest", values, {
      headers: {
        "x-auth-token": token
      }
    })
    .then(response => {
      createNotification("success", "Success", response.data.message);
      dispatch(getPurchaseRequests());
    })
    .catch(error => {
      console.log(error);
      if (error) {
        createNotification(
          "error",
          error.response.data.description,
          error.response.data.message
        );
      }
    });

}



export const getTransactions = (page) => async dispatch => {
  const token = localStorage.getItem("token");
  axios
    .post("/activities/getTransactions", page,{
      headers: {
        "x-auth-token": token
      }
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: GET_TRANSACTIONS,
        payload: response.data.transactions
      });
    })
    .catch(error => {
      console.log(error);
      if (error) {
        throw error;
      }
    });

} 
