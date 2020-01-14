import {
    GET_ALL_POSTS,
    GET_HOME_POSTS,
    GET_SINGLE_POST
} from './types';

import axios from 'axios';

import { createNotification } from '../components/CommonComponents/Notifications';

export const getHomePosts = () => async dispatch => {
    const result = await axios.get('/activities/blog_post/home');
    dispatch({
        type: GET_HOME_POSTS,
        payload: result.data.posts
    })

}

export const getAllPosts = () => async dispatch => {
    const result = await axios.get('/activities/blog_post/getAll');
    dispatch({
        type: GET_ALL_POSTS,
        payload: result.data.posts
    })
}

export const getSinglePost = (id) => async dispatch => {
    const result = await axios.get(`/activities/blog_post/get/${id}`);
    dispatch({
        type: GET_SINGLE_POST,
        payload: result.data.post
    })
}

export const deletePost = postId => dispatch => {
    const token = localStorage.getItem("token");
    axios
        .delete(`/activities/blog_post/delete/${postId}`, {
            headers: {
                "x-auth-token": token,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            dispatch(getAllPosts())
            createNotification("success", "Success", response.data.message)
        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.message
            );
        });
};