/* import { useEffect, useState } from "react"
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
            "დასრულებული": "#007bff",
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

export default TasksPage */


import { useEffect, useState } from "react";
import { BeatLoader, PacmanLoader } from "react-spinners";

import "../sass/styles/_tasks_page.scss";

import axios from "axios";

import shape from "../assets/Shape.png";
import TasksList from "../components/TasksList";

function TasksPage() {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statusesRes, tasksRes] = await Promise.all([
                    axios.get('https://momentum.redberryinternship.ge/api/statuses'),
                    axios.get('https://momentum.redberryinternship.ge/api/tasks', {
                        headers: { Authorization: "Bearer 9e6c74ed-7d82-4560-9511-89a0df985495" },
                    }),
                ]);
                setStatuses(statusesRes.data);
                setTasks(tasksRes.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const getStatusColor = (statusName) => {
        const statusColors = {
            "დასაწყები": "#F7BC30",
            "პროგრესში": "#FB5607",
            "მზად ტესტირებისთვის": "#FF006E",
            "დასრულებული": "#007bff",
        };

        return statusColors[statusName] || "#000";
    };

    if (loading) return <BeatLoader />;
    if (error) return <PacmanLoader />;


    const getStatusClass = (status) => {
        switch (status) {
            case "დასაწყები":
                return "starter";
            case "პროგრესში":
                return "in-progress";
            case "მზად ტესტირებისთვის":
                return "ready";
            case "დასრულებული":
                return "finished";
            default:
                return "";
        }
    };

    return (
        <div className="tasks_container">
            <h3>დავალებების გვერდი</h3>
            <div className="filter_components">
                <button className="bt1">დეპარტამენტი <img src={shape} alt="" /></button>
                <button className="bt2">პრიორიტეტი <img src={shape} alt="" /></button>
                <button className="bt3">თანამშრომელი <img src={shape} alt="" /></button>
            </div>
            <TasksList statuses={statuses} tasks={tasks} getStatusColor={getStatusColor} getStatusClass={getStatusClass} />
        </div>
    );
}

export default TasksPage;
