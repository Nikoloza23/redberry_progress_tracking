import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';


//Details Page
function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await axios.get(`https://momentum.redberryinternship.ge/api/tasks/${id}`, {
                    headers: {
                        Authorization: "Bearer 9e6ded0f-2306-4e47-af88-d688405ff8d0",
                    }
                });
                setTask(response.data);
            } catch (error) {
                console.error('Error fetching task details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskDetails();
    }, [id]);

    if (loading) {
        return <BeatLoader />;
    }

    if (!task) {
        return <div>No task found!</div>;
    }

    return (
        <div className="task_detail">
            <h2>{task.name}</h2>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Priority:</strong> {task.priority.name}</p>
            <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
            <p><strong>Department:</strong> {task.department.name}</p>
            <div>
                <h4>Assigned to:</h4>
                <img src={task.employee.avatar} alt={task.employee.name} className="assignee_img" />
                <p>{task.employee.name}</p>
            </div>
        </div>
    );
}

export default TaskDetail;
