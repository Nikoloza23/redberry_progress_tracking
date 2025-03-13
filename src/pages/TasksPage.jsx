import { useEffect, useState } from "react"
import { BeatLoader, PacmanLoader } from "react-spinners"

import "../sass/styles/_tasks_page.scss"

import axios from "axios"

import shape from "../assets/Shape.png"
import TasksList from "../components/TasksList"



function TasksPage() {
    const [statuses, setStatuses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await axios.get('https://momentum.redberryinternship.ge/api/statuses');
                setStatuses(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchStatuses()
    }, [])




    if (loading) return <BeatLoader />
    if (error) return <PacmanLoader />




    const getStatusColor = (statusName) => {
        const statusColors = {
            "დასაწყები": "#F7BC30",
            "პროგრესში": "#FB5607",
            "მზად ტესტირებისთვის": "#FF006E",
            "დასრულებული": "#2C9C6F"
        };

        return statusColors[statusName] || "#000";
    };


    return (
        <>
            <div className="tasks_container">
                <h3>დავალებების გვერდი</h3>
                <div className="filter_components">
                    <button className="bt1">დეპარტამენტი <img src={shape} alt="" /> </button>
                    <button className="bt2">პრიორიტეტი<img src={shape} alt="" /></button>
                    <button className="bt3">თანამშრომელი<img src={shape} alt="" /></button>
                </div>
                <div className="statuses">
                    <ul>
                        {statuses.map(status => (
                            <li key={status.id} className="status_item" style={{ backgroundColor: getStatusColor(status.name) }}
                            > {status.name}</li>
                        ))}

                    </ul>
                </div>
                <TasksList />
            </div>
        </>
    )
}

export default TasksPage