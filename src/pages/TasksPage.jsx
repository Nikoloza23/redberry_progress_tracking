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
                        headers: { Authorization: "Bearer 9e74073a-b20c-4754-971b-13c4222c6ef8" },
                    }),
                    axios.get('https://momentum.redberryinternship.ge/api/departments'),
                    axios.get('https://momentum.redberryinternship.ge/api/priorities'),
                    axios.get('https://momentum.redberryinternship.ge/api/employees', {
                        headers: { Authorization: "Bearer 9e74073a-b20c-4754-971b-13c4222c6ef8" },
                    })

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
