import {
  GET_NEW_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_FILTERED_PRODUCTS,
  SEARCH_BOOKS,
  GET_PRODUCT_DETAILS,
  SEND_PURCHASE_REQUEST,
  HIDE_PURCHASE_CODE,
  GET_SELLER_BOOKS,
  GET_SELLER_NEW_BOOKS
} from "../actions/types";

const initState = {
  newItems: null,
  allItems: [],
  filteredItems: [],
  searchBooks: [],
  bookReviews: [],
  productDetails: null,
  totalReviews: null,
  purchaseCode: null,
  singleBookData: null,
  sellerProducts:null,
  sellerNewProducts:null,
  notification:null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_NEW_PRODUCTS:
      return { ...state, newItems: action.payload };
    case GET_ALL_PRODUCTS:
      return { ...state, allItems: action.payload };
    case GET_FILTERED_PRODUCTS:
      return { ...state, filteredItems: action.payload };
    case SEARCH_BOOKS:
      return { ...state, searchBooks: action.payload };
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload.prodDetails.book,
        bookReviews: action.payload.prodDetails.reviews,
        totalReviews: action.payload.prodDetails.totalPages
      };

    case SEND_PURCHASE_REQUEST:
      console.log(action.payload);
      return { ...state, purchaseCode: action.payload };

    case HIDE_PURCHASE_CODE:
      return { ...state, purchaseCode: null };
    case "Editable_Book_Data":
      return { ...state, singleBookData: action.payload };
    case "Isbn_Based_Search":
      return { ...state, singleBookData: action.payload };
      case GET_SELLER_BOOKS:
      return { ...state, sellerProducts: action.payload };
      case GET_SELLER_NEW_BOOKS:
      return { ...state, sellerNewProducts: action.payload };
      case 'GET_NOTIFICATIONS':
        return { ...state, notification: action.payload };
        case 'RESET_ADD_PRODUCY_FORM':
        return { ...state, singleBookData: null };
    default:
      return state;
  }
};
