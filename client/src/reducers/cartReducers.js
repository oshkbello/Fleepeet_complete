import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING } from '../actions/types'
import {createNotification} from '../components/CommonComponents/Notifications'
const initState = {
    items: [],
    addedItems: [],
    total: 0

}
const cartReducer = (state = initState, action) => {
    if (action.type === "GET_PRODUCTS") {
        return { ...state, items: action.payload }
    }
    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        var addedItem = action.product;

        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.product._id === item._id);
        if (existed_item) {
            createNotification("error", "Book already Exist in your Wishlist");
            return {
                ...state
            }
        }
        else {
            createNotification("success", "Book Added to your Wishlist");
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let new_items = state.addedItems.filter(item => action.id !== item._id)
        createNotification("error", "Book removed from your Wishlist");
        return {
            ...state,
            addedItems: new_items,
        }
    }
   

    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 6
        }
    }

    else {
        return state
    }

}

export default cartReducer