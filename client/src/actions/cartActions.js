  

import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING} from './types'
export const getProducts = () => async dispatch => {
    // const result = await fetch('/book/getAllBooks','get');
    // console.log(result);
    dispatch({
        type: "GET_PRODUCTS",
        payload: {test:'test'}
    })

} 

//add cart action
export const addToCart= (product)=>{
    return{
        type: ADD_TO_CART,
        product
    }
}
//remove item action
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}