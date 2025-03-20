import axiosInstance from '../../services/axios'
import * as types from '../action-types'

export const UPLOAD_DATA = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/tasks', data)
        dispatch({
            type: types.UPLOAD_DATA_TYPE,
            payload: response.data
        });
        return response;
    } catch (error) {
        console.error("Error", error)
        alert("Failed to add task. Please try again later")
        throw error;
    }
}