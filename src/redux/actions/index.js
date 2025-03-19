import axios from 'axios'
import { UPLOAD_EMPLOYEE_TYPE } from '../action-types'

export const UPLOAD_EMPLOYEE = (data) => async (dispatch) => {
    try {
        console.log(data);

        const response = await axios.post(
            'https://momentum.redberryinternship.ge/api/employees',
            JSON.stringify(data),
            { headers: { Authorization: "Bearer 9e77a3d7-86e5-4b4b-9264-fc67efbac2af" } }
        )
        dispatch({
            type: UPLOAD_EMPLOYEE_TYPE,
            employee: response.data,
        });
    } catch (error) {
        console.log("Error", error)
        alert("Failed to add employee. Please try again later")
    }
}


export const UPLOAD_DATA = async (data) => {
    try {
        const response = await axios.post(
            'https://momentum.redberryinternship.ge/api/tasks',
            data,
            { headers: { Authorization: "Bearer 9e77a3d7-86e5-4b4b-9264-fc67efbac2af" } }
        )
        return response;

    } catch (error) {
        console.log("Error", error)
        alert("Failed to add task. Please try again later")
    }

}