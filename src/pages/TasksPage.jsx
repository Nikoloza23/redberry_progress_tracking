import { useEffect, useState } from "react";
import { BeatLoader, PacmanLoader } from "react-spinners";

import TasksList from "../components/TasksList";

import "../sass/styles/_tasks_page.scss";

import axios from "axios";

import shape from "../assets/Shape.png";

function TasksPage() {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [dropDown, setDropDown] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statusesRes, tasksRes] = await Promise.all([
                    axios.get('https://momentum.redberryinternship.ge/api/statuses'),
                    axios.get('https://momentum.redberryinternship.ge/api/tasks', {
                        headers: { Authorization: "Bearer 9e6e0481-49de-4368-acfe-6fc361aa6954" },
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

    const dropMenu = (dropdown) => {
        setDropDown(dropDown === dropdown ? null : dropdown)
    }

    if (loading) return <BeatLoader />;
    if (error) return <PacmanLoader />;

    return (
        <div className="tasks_container">
            <h3>დავალებების გვერდი</h3>
            <div className="filter_components">
                <div className="filter_item">
                    <button className="bt1" onClick={() => dropMenu("department")}>დეპარტამენტი <img src={shape} alt="" /></button>
                    {dropDown === "department" && (
                        <div className="dropdown">
                            <label><input type="checkbox" /> მარკეტინგის დეპარტამენტი</label>
                            <label><input type="checkbox" /> დიზაინის დეპარტამენტი</label>
                            <label><input type="checkbox" /> ლოჯისტიკის დეპარტამენტი</label>
                            <label><input type="checkbox" /> IT დეპარტამენტი</label>
                            <button className="apply_button">შენახვა</button>
                        </div>
                    )}

                </div>
                <div className="filter_item">

                    <button className="bt2" onClick={() => dropMenu("priority")}>პრიორიტეტი <img src={shape} alt="" /></button>
                    {dropDown === "priority" && <div className="dropdown">სადად</div>}
                </div>
                <div className="filter_item">

                    <button className="bt3" onClick={() => dropMenu("employee")}>თანამშრომელი <img src={shape} alt="" /></button>
                    {dropDown === "employee" && <div className="dropdown">სადად</div>}
                </div>
            </div>
            <TasksList statuses={statuses} tasks={tasks} getStatusColor={getStatusColor} getStatusClass={getStatusClass} />
        </div>
    );
}

export default TasksPage;
