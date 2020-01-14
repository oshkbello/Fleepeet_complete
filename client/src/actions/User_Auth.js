import axios from "axios";
import { createNotification } from "../components/CommonComponents/Notifications";

export const registerUser = () => async dispatch => {
  const products = await axios.get("/book/getAllBooks");
  dispatch({
    type: "GET_PRODUCTS",
    payload: products.data
  });
};
export const userTickets = () => async dispatch => {
  const token = localStorage.getItem("token");
  const ticket = await axios.get("/user/userTickets", {
    headers: {
      "x-auth-token": token
    }
  });
  console.log(ticket);
  dispatch({
    type: "GET_USER_TICKETS",
    payload: ticket.data.tickets
  })
  dispatch({ type: "Response-Loader", data: false })
};

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("token");
  dispatch(setCurrentUser({}));
};

export const userPostFetch = userq => async dispatch => {
  if (userq) {
    localStorage.setItem("token", userq.token);
    dispatch(loginUser(userq.user));
  }
};

export const userPostProfile = () => async dispatch => {
  const token = localStorage.getItem("token");
  const config = { headers: { "x-auth-token": `${token}` } };
  const userq = await axios.get("/user/user", config);
  console.log(userq);
  if (userq) {
    dispatch(loginUser(userq.data));
  }
};

export const loginUser = userObj => ({
  type: "LOGIN_USER",
  payload: userObj
});

export const buyTickets = values => async dispatch => {
  const token = localStorage.getItem("token");
  dispatch({ type: "Response-Loader", data: true });
  axios
    .post("/activities/buyTickets", values, {
      headers: {
        "x-auth-token": `${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      createNotification("success", response.data.message);
      dispatch(userTickets());
    })
    .catch(error => {
      dispatch({ type: "Response-Loader", data: false })
      createNotification("error", error.response.data.message);
    });
};
