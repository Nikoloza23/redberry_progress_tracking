import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

import TasksList from "../components/TasksList";
import Filters from "../components/Filters";

import axiosInstance from "../services/axios";

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

    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const statusesRes = await axiosInstance.get('/statuses');
                setStatuses(statusesRes.data);

                const tasksRes = await axiosInstance.get('/tasks');
                setTasks(tasksRes.data);

                const departmentsRes = await axiosInstance.get('/departments');
                setDepartments(departmentsRes.data);

                const prioritiesRes = await axiosInstance.get('/priorities');
                setPriorities(prioritiesRes.data);

                const employeesRes = await axiosInstance.get('/employees');
                setEmployees(employeesRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                console.log("Bad  Request");
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            const fetchComments = async () => {
                try {
                    const commentsData = await Promise.all(
                        tasks.map(async (task) => {
                            const response = await axiosInstance.get(`/tasks/${task.id}/comments`);
                            return { task_id: task.id, comments: response.data }
                        })
                    )
                    const commentsMap = commentsData.reduce((acc, { task_id, comments }) => {
                        acc[task_id] = comments;
                        return acc;
                    }, {})
                    setComments(commentsMap)
                } catch (error) {
                    console.error("Error fetching comments:", error)
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
