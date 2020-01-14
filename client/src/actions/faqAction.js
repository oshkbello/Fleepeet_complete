import {
    GET_ALL_FAQ,
    GET_SINGLE_FAQ,
    DELETE_FAQ
} from './types';

import axios from 'axios';

import { createNotification } from '../components/CommonComponents/Notifications';

// export const getAllFQA = () => async dispatch => {
//     const result = await axios.get('/activities/faq/getAll');
//     dispatch({
//         type: GET_ALL_FAQ,
//         payload: result.data.faqs
//     })

// }

export const getAllFQA = (page) => async dispatch => {
    axios
        .get("/activities/faq/getAll", page)
        .then(response => {
            dispatch({
                type: GET_ALL_FAQ,
                payload: response.data.faqs
            })

        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


}

export const getFQA = (Id) => async dispatch => {
    console.log(Id);
    axios
        .get(`/activities/faq/get/${Id}`)
        .then(response => {
            console.log(response);
            dispatch({
                type: GET_SINGLE_FAQ,
                payload: response.data.faq
            })

        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


}

export const deleteFAQ = (id) => async dispatch => {
    console.log(id);
    const token = localStorage.getItem('token')
    axios
        .delete(`/activities/faq/delete/${id}`, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {

            createNotification("success", "Success", response.data.message);
            dispatch(getAllFQA())

        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
        });


}
