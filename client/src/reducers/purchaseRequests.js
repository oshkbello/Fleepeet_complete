import { GET_PURCHASE_REQUESTS, GET_TRANSACTIONS, GET_PURCHASE_REQUESTS_BUYER,GET_SELLER_NEW_PURCHASE_REQUESTS,GET_SELLER_NEW_PURCHASE_REQUESTS_AS_BUYER } from '../actions/types'

const initState = {
    purchaseRequests: null,
    transactions: [],
    purchaseRequestsBuyer: [],
    sellerNewPurchaseRequests:[],
    sellerNewPurchaseRequestsAsBuyer:[],


}


export default (state = initState, action) => {
    switch (action.type) {

        case GET_PURCHASE_REQUESTS:
            return { ...state,
                 purchaseRequests: action.payload }

        case GET_TRANSACTIONS:
            return { ...state, transactions: action.payload }
            case GET_PURCHASE_REQUESTS_BUYER:
            return { ...state, purchaseRequestsBuyer: action.payload }
            case GET_SELLER_NEW_PURCHASE_REQUESTS:
            return { ...state, sellerNewPurchaseRequests: action.payload }
            case GET_SELLER_NEW_PURCHASE_REQUESTS_AS_BUYER:
                return { ...state, sellerNewPurchaseRequestsAsBuyer: action.payload }

        default:
            return state

    }



}
