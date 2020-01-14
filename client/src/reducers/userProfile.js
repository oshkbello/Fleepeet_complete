import { GET_USER_PROFILE_DATA } from '../actions/types'
const initState = {
    userInfo: [],
    userBooks: [],
    reviews: [],
    totalReviews:null,
    siteUser:null
}

const userProfileReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_DATA:
            return {
                ...state,
                userInfo: action.payload.info.userInfo,
                userBooks: action.payload.info.userBooks,
                reviews: action.payload.info.reviews,
                totalReviews:action.payload.totalPages
            }
            case 'GET_SITE_USER_PROFILE_DATA':
                return{
                    ...state,
                    siteUser:action.payload
                }
                case 'complaints':
                    return{
                        ...state,
                        complaints:action.payload
                    }

        default:
            return state
    }



}

export default userProfileReducer