import { ADD_CONTACTUS_EMAIL } from './types'
import axios from 'axios'
import { createNotification } from '../components/CommonComponents/Notifications'
export const manageSiteContent = (values) => async dispatch => {
    const token = localStorage.getItem('token')
    axios
        .post("/activities/editSiteInfo", values, {
            headers: {
                'x-auth-token': token
            }
        })
        .then(response => {
            createNotification("success", "Success", response.data.message);
        })
        .catch(error => {
            createNotification(
                "error",
                error.response.data.description,
                error.response.data.message
            );
            this.setState({ Message: error.response.data.message });
        });
    dispatch({
        type: ADD_CONTACTUS_EMAIL,
        payload: { test: 'test' }
    })

} 