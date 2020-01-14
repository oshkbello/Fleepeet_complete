import {
    GET_ALL_FAQ,
    GET_SINGLE_FAQ
} from './../actions/types';

const initialState = {
    faqs: [],
    faq: {}
}

// Export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_FAQ:
            return {
                ...state,
                faqs: action.payload,
            };

        case GET_SINGLE_FAQ:
            return {
                ...state,
                faq: action.payload,
            };

        default:
            return state;
    }
}