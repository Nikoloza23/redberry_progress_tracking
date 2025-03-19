import axios from 'axios'
import * as  types from '../action-types'

/* export const UPLOAD_EMPLOYEE = (data) => async (dispatch) => {
    try {
        console.log(data);

        const payload = {
            name: data.name,
            surname: data.surname,
            department_id: parseInt(data.department_id),
            photo: data.avatar,
        };

        const response = await axios.post(
            "https://momentum.redberryinternship.ge/api/employees",
            payload,
            {
                headers: {
                    Authorization: "Bearer 9e78808b-acff-409b-acf0-5673454faeeb",
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({ type: types.UPLOAD_EMPLOYEE_TYPE, payload: response.data });
        return response.data;
    } catch (error) {
        console.log("Error:", error);
        alert("Failed to add employee. Please try again later.");
        dispatch({ type: types.UPLOAD_EMPLOYEE_FAIL, error: error.message });
    }
};
 */

export const UPLOAD_EMPLOYEE = async (data) => {
    try {
        const response = await axios.post(
            'https://momentum.redberryinternship.ge/api/employees',
            data,
            { headers: { Authorization: "Bearer 9e78808b-acff-409b-acf0-5673454faeeb" } }
        )
        return response;

    } catch (error) {
        console.log("Error", error)
        alert("Failed to add task. Please try again later")
    }

}



export const UPLOAD_DATA = async (data) => {
    try {
        const response = await axios.post(
            'https://momentum.redberryinternship.ge/api/tasks',
            data,
            { headers: { Authorization: "Bearer 9e78808b-acff-409b-acf0-5673454faeeb" } }
        )
        return response;

    } catch (error) {
        console.log("Error", error)
        alert("Failed to add task. Please try again later")
    }

}