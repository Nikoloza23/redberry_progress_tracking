import axios from 'axios'
import * as types from '../action-types'

export const ADD_TASK = data => ({
    type: types.ADD_NEW_TASK,
    payload: data
})

export const UPLOAD_DATA = () => {
    return async (dispatch, getState) => {
        try {
            const { identity } = getState();

            const response = await axios.post(
                'https://momentum.redberryinternship.ge/api/tasks',
                { ...identity },
                { headers: { Authorization: "Bearer 9e701a1d-06e7-4fa6-ba9a-2455f8892d82" } }
            )

            console.log("Server Response", response.data)
            alert("New Task Added Successfully!")

            dispatch({ type: types.UPLOAD_DATA_TYPE })
        } catch (error) {
            console.log("Error", error)
            alert("Failed to add task. Please try again later")
        }
    }
}