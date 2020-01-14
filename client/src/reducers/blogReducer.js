import {
    GET_ALL_POSTS,
    GET_HOME_POSTS,
    GET_SINGLE_POST
} from './../actions/types';

const initialState = {
    newPosts: [],
    post: []
}

// Export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_HOME_POSTS:
            return {
                ...state,
                newPosts: action.payload,
            };

        case GET_SINGLE_POST:
            return {
                ...state,
                post: action.payload,
            };

        case GET_ALL_POSTS:
            return {
                ...state,
                newPosts: action.payload
            }

        default:
            return state;
    }
}