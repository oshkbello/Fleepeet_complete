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
} from "./types";
import axios from 'axios'
import { createNotification } from '../components/CommonComponents/Notifications'
export const getNewPrducts = () => async dispatch => {
    const result = await axios.get('/book/getnewbooks');
    dispatch({
        type: GET_NEW_PRODUCTS,
        payload: result.data.data
    })

}



export const getAllProducts = (pageNum) => async dispatch => {
    const res = {};
    const result = await axios.post('/book/getAllBooks', { pageNo: pageNum });
    res.data = result.data.response1.data;
    res.pages = result.data.pages;
    res.totalPages = result.data.totalPages
    dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res
    })

}


export const getSellerProducts = (pageNum) => async dispatch => {
    const token = localStorage.getItem("token");
    axios
        .get("/book/getsellerbooks", {
            headers: {
                "x-auth-token": `${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            dispatch({
                type: GET_SELLER_BOOKS,
                payload: response.data
            })

        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.message
            );
        });

}





export const getSellerNewProducts = () => async dispatch => {
    const token = localStorage.getItem("token");
    axios
        .get("/book/getSellerNewBooks", {
            headers: {
                "x-auth-token": `${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            dispatch({
                type: GET_SELLER_NEW_BOOKS,
                payload: response.data.data
            })

        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.message
            );
        });

}





export const getFilteredProducts = (query) => async dispatch => {
    const res = {};
    const result = await axios.post('/book/filterbooks', query)
    res.data = result.data.data;
    res.pages = result.data.pages;
    res.totalPages = result.data.totalPages
    dispatch({
        type: GET_FILTERED_PRODUCTS,
        payload: res
    })

}


export const searchBook = (query) => async dispatch => {
    const result = await axios.post('/book/searchBook', query);
    dispatch({
        type: SEARCH_BOOKS,
        payload: result.data.data
    })

}




export const productDetails = (id, page) => async dispatch => {
    const result = await axios.post('/book/getSingleBook', { id, page });
    dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: result.data
    })

}




export const sendPurchaseRequest = (value, history) => async dispatch => {
    const token = localStorage.getItem("token");
    dispatch({ type: "Response-Loader", data: true });
    axios
        .post("/activities/purchaseRequest", value.values, {
            headers: {
                "x-auth-token": `${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            dispatch({ type: "Response-Loader", data: false });
            createNotification("success", "Success", response.data.message);
            if (value.values.paymentMethod === 'Online') {
                dispatch({
                    type: SEND_PURCHASE_REQUEST,
                    payload: response.data.data
                })
            }
        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.message
            );
            if (error.response.data.message === 'Please Login...') {
                history.push('/login')
            }
        });
}



export const hidePurchaseCode = () => {
    return {
        type: HIDE_PURCHASE_CODE,
        payload: {}
    }
}

export const singleBook = id => dispatch => {
    axios
        .post("/book/getSingleBook", { id: id })
        .then(res => {
            dispatch({
                type: "Editable_Book_Data",
                payload: res.data.prodDetails.book
            });
        })
        .catch(err => err.response);
};

export const isbnBasedSearch = data => dispatch => {
    let isbn = data;
    axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${data}`)
        .then(res => {
            let data = {
                title: "",
                author: "",
                description: "",
                isbn: isbn,

            };
            console.log(res);

            if (res.data !== undefined && res.data.items !== undefined) {
                data.title = res.data.items[0].volumeInfo.title;
                let length = res.data.items[0].volumeInfo.authors ? res.data.items[0].volumeInfo.authors.length : '';
                for (let i = 0; i < length; i++) {
                    data.author += res.data.items[0].volumeInfo.authors[i] + ', '
                }
                data.description = res.data.items[0].volumeInfo.description;
                dispatch({
                    type: 'Isbn_Based_Search',
                    payload: data
                })
            } else {
                dispatch({
                    type: 'Isbn_Based_Search',
                    payload: data
                })
            }
            ;
        });
};


export const giveDiscount = values => dispatch => {
    const token = localStorage.getItem("token");
    axios
        .post("/book/giveDiscount", values, {
            headers: {
                "x-auth-token": `${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            createNotification("success", "Success", response.data.message)

            dispatch(productDetails(values.bookid))
        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.message
            );
        });
};




export const deleteBook = bookId => dispatch => {
    const token = localStorage.getItem("token");
    axios
        .post("/book/deleteBook", { bookId }, {
            headers: {
                "x-auth-token": token,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            dispatch(getSellerProducts())
            createNotification("success", "Success", response.data.message)
        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.message
            );
        });
};

export const getNotification = () => async dispatch => {
    const token = localStorage.getItem("token");
    axios
        .get("/activities/notification/getAll", {
            headers: {
                "x-auth-token": `${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log(response)
            dispatch({
                type: 'GET_NOTIFICATIONS',
                payload: response.data
            })

        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.message
            );
        });

}

export const resetForm = () => {
    return {
        type: 'RESET_ADD_PRODUCY_FORM',
        payload: null
    }
}