import axios from 'axios'

/* export const ADD_TASK = data => ({
    type: types.ADD_NEW_TASK,
    payload: data
})
 */
export const UPLOAD_DATA = async (data) => {
    try {
        const response = await axios.post(
            'https://momentum.redberryinternship.ge/api/tasks',
            data,
            { headers: { Authorization: "Bearer 9e701a1d-06e7-4fa6-ba9a-2455f8892d82" } }
        )
        return response;

    } catch (error) {
        console.log("Error", error)
        alert("Failed to add task. Please try again later")
    }

}