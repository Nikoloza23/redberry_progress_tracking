import { FaExclamationCircle, FaExclamationTriangle, FaFlag } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader, PacmanLoader } from "react-spinners";
import "../sass/styles/_add_task_list.scss";

function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                return <FaExclamationCircle color="red" />;
            case "საშუალო":
                return <FaExclamationTriangle color="orange" />;
            case "დაბალი":
                return <FaFlag color="green" />;
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

    if (loading) return <BeatLoader />;
    if (error) return <PacmanLoader />;

    // დავალებების დალაგება ისე, რომ "დასრულებული" პირველზე იყოს
    const sortedTasks = [...tasks].sort((a, b) => {
        const order = ["დასრულებული", "პროცესში", "ახალი დავალება", "გაუქმებული"];
        return order.indexOf(a.status.name) - order.indexOf(b.status.name);
    });

    return (
        <div className="tasks_list">
            <div className="task_column">
                {sortedTasks.map(task => (
                    <div key={task.id} className={`task_card ${getStatusClass(task.status.name)}`}>
                        <h4>{task.status.name} - {task.priority.name}</h4>
                        <p>{task.description.length > 100 ? ${task.description.slice(0, 100)}... : task.description}</p>
                        <div className="task_footer">
                            <span className="department">{task.department.name}</span>
                            <img src={task.employee.avatar} alt={task.employee.name} className="assignee_img" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TasksList;