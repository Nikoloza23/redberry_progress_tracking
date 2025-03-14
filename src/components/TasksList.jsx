import { useNavigate } from 'react-router-dom';

import group from '../assets/Group.png';
import low from '../assets/Low.png';
import vector from '../assets/Vector.png';

import "../sass/styles/_add_task_list.scss";

function TasksList({ statuses, tasks, getStatusColor, getStatusClass }) {
    const navigate = useNavigate()

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "მაღალი":
                return <img src={vector} alt="" />;
            case "საშუალო":
                return <img src={group} alt="" />;
            case "დაბალი":
                return <img src={low} alt="" />;
            default:
                return null;
        }
    };

    const handleTaskClick = (taskId) => {
        navigate(`/tasks/${taskId}`);
    }

    return (
        <div className="tasks_list">
            {statuses.map((status) => {
                const filteredTasks = tasks.filter(task => task.status.name === status.name);

                return (
                    <div key={status.id} className="status_section">
                        <h4 className="status_header" style={{ backgroundColor: getStatusColor(status.name), color: "#fff", padding: "8px", borderRadius: "5px" }}>
                            {status.name}
                        </h4>
                        <ul>
                            {filteredTasks.length > 0 ? (
                                filteredTasks.map(task => (
                                    <li key={task.id}
                                        className={`task_card ${getStatusClass(task.status.name)}`}
                                        onClick={() => handleTaskClick(task.id)}
                                    >
                                        <div className="task_header">
                                            <span className="priority">
                                                {getPriorityIcon(task.priority.name)} {task.priority.name}
                                            </span>
                                            <span className="department">{task.department.name}</span>
                                            <span className="due_date">{new Date(task.due_date).toLocaleDateString()}</span>
                                        </div>
                                        <h3 className="task_name">{task.name}</h3>
                                        <p className="task_description">
                                            {task.description.length > 150
                                                ? `${task.description.slice(0, 150)}...`
                                                : task.description}
                                        </p>
                                        <div className="task_footer">
                                            <img src={task.employee.avatar} alt={task.employee.name} className="assignee_img" />
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p className="no_tasks">ამ სტატუსში დავალებები არ არის.</p>
                            )}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

export default TasksList;
