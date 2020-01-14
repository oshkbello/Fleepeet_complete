import {
  ADMIN_GET_USERS,
  GET_SITE_CONTENT,
  GET_ADMIN_REQUESTS
} from "../actions/types";

const initState = {
  users: [],
  content: {},
  purchaseRequests: {},
  userComplaints: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS:
      return { ...state, users: action.payload };

    case GET_SITE_CONTENT:
      return { ...state, content: action.payload };
    case GET_ADMIN_REQUESTS:
      return { ...state, purchaseRequests: action.payload };
    case 'GET_USER_COMPLAINTS':
      return { ...state, userComplaints: action.payload};
    default:
      return state;
  }
};
