import axios from 'axios'


export const UPLOAD_DATA = async (data) => {
    try {
        const response = await axios.post(
            'https://momentum.redberryinternship.ge/api/tasks',
            data,
            { headers: { Authorization: "Bearer 9e74073a-b20c-4754-971b-13c4222c6ef8" } }
        )
        return response;

    } catch (error) {
        console.log("Error", error)
        alert("Failed to add task. Please try again later")
    }

}