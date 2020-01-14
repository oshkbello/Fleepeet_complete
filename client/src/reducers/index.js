import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import _ from "lodash";
import addToCart from "./cartReducers";

import products from "./productReducer";
import UserProfile from "./userProfile";

import SET_CURRENT_USER from "../actions/types";
import purchaseRequests from "./purchaseRequests";
import adminReducers from "./adminReducer";
import {Loader} from "./loader";
import posts from './blogReducer';
import faqData from './faqReducer';


const addToWishList = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      console.log(action.payload);
      const product = [...state, action.payload];
      // saveIntoStorage(product);
      // const prod = getProductsFromStorage();
      return [...state, action.payload];
    }
    case "REMOVE_FROM_WISHLIST": {
      return state.filter(element => {
        return element.id !== action.payload.id;
      });
    }

    default:
      return state;
  }
};

const Products = (state = [], action) => {
  switch (action.type) {
    case "GET_PRODUCTS": {
      return action.payload;
    }

    default:
      return state;
  }
};

const searchBook = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_BOOK": {
      return action.payload;
    }
    default:
      return state;
  }
};

const selectedSchool = (state = [], action) => {
  switch (action.type) {
    case "SELECT_SCHOOL": {
      return action.payload;
    }
    default:
      return state;
  }
};

const compareBooks = (state = [], action) => {
  switch (action.type) {
    case "COMPARE_BOOK": {
      return action.payload;
    }
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  currentUser: {},
  tickets: null,
};

const loginUser = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, currentUser: action.payload, isAuthenticated: true };
    case "SET_CURRENT_USER":
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case "GET_USER_INFO":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload
      };
    case "GET_USER_TICKETS":
      console.log(action.payload);
      return {
        ...state,
        tickets: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default combineReducers({
  addToCart: addToCart,
  form: formReducer,
  loginUser,
  products,
  UserProfile,
  purchaseRequests,
  admin: adminReducers,
  Loader,
  posts,
  faqData
});
