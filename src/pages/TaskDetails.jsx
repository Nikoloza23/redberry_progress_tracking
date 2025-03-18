import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import SplitLayout from '../components/SplitLayout';

import axios from 'axios';

import group from '../assets/Group.png';
import low from '../assets/Low.png';
import vector from '../assets/Vector.png';
import piechart from '../assets/pie-chart.png'
import person from '../assets/person.png'
import hour from '../assets/Hourglass.png'

import '../sass/styles/_task_details.scss'

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
                        Authorization: "Bearer 9e76b2fe-c8f2-4f67-9d3f-1a89badc9d76",
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

    return (
        <SplitLayout
            leftContent={
                <div className="task_details">
                    <div className="task_details_header">
                        <div className="task_priority_department">
                            {getPriorityIcon(task.priority.name)} {task.priority.name}
                            <p>{task.department.name}</p>
                        </div>
                        <h2>{task.name}</h2>
                    </div>
                    <p>{task.description}</p>
                    <h3>დავალების დეტალები</h3>
                    <div className="added_status">
                        <div className="task_status">
                            <p><img src={piechart} alt="status" />სტატუსი <span>{task.status.name}</span></p>
                        </div>
                        <div className="task_assignee">
                            <p><img src={person} alt='person' />თანამშრომელი<img src={task.employee.avatar} alt={task.employee.name} className="assignee_img" /></p>
                        </div>
                        <div className="task_due_date">
                            <p><img src={hour} alt='hour' />დავალების ვადა {new Date(task.due_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            }
            rightContent={
                <div className="task_detail">
                    dasda
                </div>
            }
        />
    );
}

export default TaskDetail;
