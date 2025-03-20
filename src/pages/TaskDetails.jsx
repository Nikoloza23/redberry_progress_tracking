import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import axiosInstance from '../services/axios';

import SplitLayout from '../components/SplitLayout';

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
    const [task, setTask] = useState(null);
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [replyTo, setReplyTo] = useState(null)
    const [statuses, setStatuses] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [taskResponse, commentsResponse, statusResponse] = await Promise.all([
                    axiosInstance.get(`/tasks/${id}`),
                    axiosInstance.get(`/tasks/${id}/comments`),
                    axiosInstance.get("/statuses")
                ]);
                setTask(taskResponse.data);
                setComments(commentsResponse.data);
                setStatuses(statusResponse.data);
            } catch (error) {
                setError("Failed to fetch task details");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    const handleStatusChange = async (e) => {
        const newStatusId = e.target.value;
        try {
            await axiosInstance.put(`/tasks/${id}`, {
                status_id: newStatusId
            });

            setTask(prevTask => ({
                ...prevTask,
                status: statuses.find(status => status.id === Number(newStatusId))
            }));
            alert("Status updated successfully!");
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status. Please try again.");
        }
    };


    const handleSubmitComment = async () => {
        if (!commentText.trim()) return;
        try {
            const commentData = {
                text: commentText,
                ...(replyTo && { parent_id: replyTo })
            };
            const response = await axiosInstance.post(`/tasks/${id}/comments`, commentData);

            setComments(prevComments => [...prevComments, response.data]);

            setCommentText('');

            if (replyTo) {
                setReplyTo(null);
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Failed to post comment. Please try again.");
        }
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


    if (loading) {
        return <BeatLoader />;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!task) {
        return <div>Task not found</div>;
    }

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
                            <p><img src={piechart} alt="status" />სტატუსი </p>
                        </div>
                        <select
                            defaultValue={task.status.id}
                            onChange={handleStatusChange}
                        >
                            {statuses.map(status => (
                                <option key={status.id} value={status.id}>{status.name}</option>
                            ))}
                        </select>
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
                <div className="task_comments">
                    <div className="comment_input">
                        {replyTo && (
                            <div className="reply-indicator">
                                პასუხი კომენტარზე #{replyTo}
                                <button
                                    onClick={() => {
                                        setReplyTo(null);
                                        setCommentText('');
                                    }}
                                    className="cancel-reply"
                                >
                                    გაუქმება
                                </button>
                            </div>
                        )}
                        <textarea
                            placeholder={replyTo ? 'დაწერე პასუხი...' : 'დაწერე კომენტარი...'}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            onClick={handleSubmitComment}
                            className="submit-comment"
                            disabled={!commentText.trim()}
                        >
                            {replyTo ? 'პასუხის გაგზავნა' : 'კომენტარის დამატება'}
                        </button>
                    </div>
                    <h3>კომენტარები</h3>
                    {comments.length > 0 ? (
                        <ul className="comments-list">
                            {comments
                                .filter(comment => !comment.parent_id)
                                .map((comment) => (
                                    <li key={comment.id} className="comment-item">
                                        <div className="comment_header">
                                            <img
                                                src={comment.author_avatar}
                                                alt={comment.author_nickname}
                                                className="comment_author_img"
                                            />
                                            <span className="comment_author">
                                                {comment.author_nickname}
                                            </span>
                                        </div>
                                        <p className="comment_text">{comment.text}</p>
                                        <button
                                            onClick={() => setReplyTo(comment.id)}
                                            className="reply-button"
                                        >
                                            პასუხი
                                        </button>

                                        {comments
                                            .filter(reply => reply.parent_id === comment.id)
                                            .map(reply => (
                                                <div key={reply.id} className="reply-item">
                                                    <div className="comment_header">
                                                        <img
                                                            src={reply.author_avatar}
                                                            alt={reply.author_nickname}
                                                            className="comment_author_img"
                                                        />
                                                        <span className="comment_author">
                                                            {reply.author_nickname}
                                                        </span>
                                                    </div>
                                                    <p className="comment_text">{reply.text}</p>
                                                    <button
                                                        onClick={() => setReplyTo(comment.id)}
                                                        className="reply-button"
                                                    >
                                                        პასუხი
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p>კომენტარის გარეშე</p>
                    )}
                </div>
            }
        />
    );
}

export default TaskDetail;
