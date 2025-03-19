import { useEffect, useState } from "react";
import { BeatLoader, PacmanLoader } from "react-spinners";

import TasksList from "../components/TasksList";
import Filters from "../components/Filters";


import axios from "axios"

import "../sass/styles/_tasks_page.scss";

//Main Page 
function TasksPage() {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [comments, setComments] = useState({})
    const [selectedFilters, setSelectedFilters] = useState({
        selectedDepartments: [],
        selectedPriorities: [],
        selectedEmployees: [],

    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statusesRes, tasksRes, departmentsRes, prioritiesRes, employeesRes] = await Promise.all([
                    axios.get('https://momentum.redberryinternship.ge/api/statuses'),
                    axios.get('https://momentum.redberryinternship.ge/api/tasks', {
                        headers: { Authorization: "Bearer 9e78808b-acff-409b-acf0-5673454faeeb" },
                    }),
                    axios.get('https://momentum.redberryinternship.ge/api/departments'),
                    axios.get('https://momentum.redberryinternship.ge/api/priorities'),
                    axios.get('https://momentum.redberryinternship.ge/api/employees', {
                        headers: { Authorization: "Bearer 9e78808b-acff-409b-acf0-5673454faeeb" },
                    }),
                ]);
                setStatuses(statusesRes.data);
                setTasks(tasksRes.data);
                setDepartments(departmentsRes.data);
                setPriorities(prioritiesRes.data);
                setEmployees(employeesRes.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            const fetchComments = async () => {
                try {
                    const commentsData = await Promise.all(
                        tasks.map(async (task) => {
                            const response = await
                                axios.get(`https://momentum.redberryinternship.ge/api/tasks/${task.id}/comments`, {
                                    headers: { Authorization: "Bearer 9e78808b-acff-409b-acf0-5673454faeeb" },
                                })
                            return { task_id: task.id, comments: response.data }
                        })
                    )
                    const commentsMap = commentsData.reduce((acc, { task_id, comments }) => {
                        acc[task_id] = comments;
                        return acc;
                    }, {})
                    setComments(commentsMap)
                } catch (error) {
                    console.log("Error fetching comments", error)
                }
            }
            fetchComments()
        }
    }, [tasks])


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


    if (loading) return <BeatLoader />;
    if (error) return <PacmanLoader />;

    return (
        <div className="tasks_container">
            <h3>დავალებების გვერდი</h3>
            <Filters
                departments={departments}
                priorities={priorities}
                employees={employees}
                onFilterChange={setSelectedFilters}
            />
            <TasksList
                statuses={statuses}
                tasks={tasks}
                comments={comments}
                getStatusColor={getStatusColor}
                getStatusClass={getStatusClass}
                selectedDepartments={selectedFilters.selectedDepartments}
                selectedPriorities={selectedFilters.selectedPriorities}
                selectedEmployees={selectedFilters.selectedEmployees}
            />
        </div>
    );
}

export default TasksPage;
