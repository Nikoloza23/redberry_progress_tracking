import { useEffect, useState } from "react";
import { BeatLoader, PacmanLoader } from "react-spinners";

import TasksList from "../components/TasksList";

import "../sass/styles/_tasks_page.scss";

import axios from "axios";

import shape from "../assets/Shape.png";

function TasksPage() {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [dropDown, setDropDown] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statusesRes, tasksRes, departmentsRes] = await Promise.all([
                    axios.get('https://momentum.redberryinternship.ge/api/statuses'),
                    axios.get('https://momentum.redberryinternship.ge/api/tasks', {
                        headers: { Authorization: "Bearer 9e6fae93-3759-4a61-a38a-019d045d14e5" },
                    }),
                    axios.get('https://momentum.redberryinternship.ge/api/departments')
                ]);
                setStatuses(statusesRes.data);
                setTasks(tasksRes.data);
                setDepartments(departmentsRes.data);
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


    const toggleDepartment = (departmentName) => {
        setSelectedDepartments(prev =>
            prev.includes(departmentName)
                ? prev.filter(dep => dep !== departmentName)
                : [...prev, departmentName]
        );
    };


    const applyDepartmentFilter = () => {
        setSelectedDepartments([...selectedDepartments]);
        setDropDown(null);
    };



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
                            {departments.map(dep => (
                                <label key={dep.id}>
                                    <input type="checkbox" onChange={() => toggleDepartment(dep.name)} />
                                    {dep.name}
                                </label>
                            ))}
                            <button className="apply_button" onClick={applyDepartmentFilter}>არჩევა </button>
                        </div>
                    )}

                </div>
                <div className="filter_item">
                    <button className="bt2" onClick={() => dropMenu("priority")}>პრიორიტეტი <img src={shape} alt="" /></button>
                    {dropDown === "priority" && (
                        <div className="dropdown">
                            <label><input type="checkbox" /> დაბალი</label>
                            <label><input type="checkbox" /> საშუალო </label>
                            <label><input type="checkbox" /> მაღალი</label>
                            <button className="apply_button">არჩევა </button>
                        </div>
                    )}
                </div>
                <div className="filter_item">

                    <button className="bt3" onClick={() => dropMenu("employee")}>თანამშრომელი <img src={shape} alt="" /></button>
                    {dropDown === "employee" && (
                        <div className="dropdown">
                            <label><input type="checkbox" /> <img src={tasks.avatar} />{tasks.name}</label>

                            <button className="apply_button">არჩევა </button>
                        </div>
                    )}
                </div>
            </div>
            <TasksList
                statuses={statuses}
                tasks={tasks}
                getStatusColor={getStatusColor}
                getStatusClass={getStatusClass}
                selectedDepartments={selectedDepartments}
            />
        </div>
    );
}

export default TasksPage;
