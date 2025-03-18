import axios from 'axios'


export const UPLOAD_DATA = async (data) => {
    try {
        const response = await axios.post(
            'https://momentum.redberryinternship.ge/api/tasks',
            data,
            { headers: { Authorization: "Bearer 9e75a342-5310-4d57-bede-1449e259e321" } }
        )
        return response;

    } catch (error) {
        console.log("Error", error)
        alert("Failed to add task. Please try again later")
    }

}