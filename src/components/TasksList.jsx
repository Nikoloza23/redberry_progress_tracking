import { useState, useEffect } from "react";

import axios from "axios"

import { BeatLoader, PacmanLoader } from "react-spinners"

import group from '../assets/Group.png'
import low from '../assets/Low.png'
import vector from '../assets/Vector.png'

import "../sass/styles/_add_task_list.scss"

function TasksList() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("https://momentum.redberryinternship.ge/api/tasks", {
                    headers: {
                        Authorization: "Bearer 9e6c74ed-7d82-4560-9511-89a0df985495",
                    },
                });
                setTasks(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);



    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "მაღალი":
                return <img src={vector} alt="" />;
            case "საშუალო":
                return <img src={group} alt="" />;
            case "დაბალი":
                return <img src={low} alt="" />
            default:
                return null;
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "დასრულებული":
                return "done";
            case "პროცესში":
                return "in-progress";
            case "ახალი დავალება":
                return "new";
            case "გაუქმებული":
                return "canceled";
            default:
                return "";
        }
    };


    if (loading) return <BeatLoader />
    if (error) return <PacmanLoader />

    const sortedTasks = [...tasks].sort((a, b) => {
        const order = ["დასრულებული", "პროცესში", "ახალი დავალება", "გაუქმებული"];
        return order.indexOf(a.status.name) - order.indexOf(b.status.name);
    });

    return (
        <div className="tasks_list">
            {sortedTasks.map(task => (
                <div key={task.id} className={`task_card ${getStatusClass(task.status.name)}`}>
                    <div className="task_header">
                        <span className="priority">{getPriorityIcon(task.priority.name)} {task.priority.name}</span>
                        <span className="department">{task.department.name}</span>
                        <span className="due_date">{new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="task_name">{task.name}</h3>
                    <p className="task_description">
                        {task.description.length > 150 ? `${task.description.slice(0, 150)}...` : task.description}
                    </p>
                    <div className="task_footer">
                        <img src={task.employee.avatar} alt={task.employee.name} className="assignee_img" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TasksList