import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UPLOAD_DATA } from '../redux/actions'

import { identity } from "../redux/selectors";

import axios from "axios";

import "../sass/styles/_forms_module.scss";
//Add your own Task
const AddNewTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const identitySelectors = useSelector(identity)

    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])


    const [loading, setLoading] = useState(true)

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: identitySelectors || {},
        mode: "onChange"
    })

    const departmentSelected = watch("department")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deparmentResponse = await axios.get("https://momentum.redberryinternship.ge/api/departments");
                const employeeResponse = await axios.get("https://momentum.redberryinternship.ge/api/employees", {
                    headers: {
                        Authorization: "Bearer 9e71ddaa-7093-454d-b912-57f0f85e7fb8"
                    }
                });
                const priorityResponse = await axios.get("https://momentum.redberryinternship.ge/api/priorities")
                const statusResponse = await axios.get("https://momentum.redberryinternship.ge/api/statuses")

                setDepartments(deparmentResponse.data)
                setEmployees(employeeResponse.data)
                setPriorities(priorityResponse.data)
                setStatuses(statusResponse.data)

                console.log(employeeResponse.data)
            } catch (error) {
                console.log("error")
                setLoading(false)
            }
        }
        fetchData()
    }, [])


    const onSubmit = (data) => {
        UPLOAD_DATA(data).then(res => {
            console.log("Server Response", res.data)
            alert("New Task Added Successfully!")
            navigate("/")
        })
    }

    return (
        <>
            <h2 className="section_title">შექმენი ახალი დავალება</h2>
            <div className="add_task_container">
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form_group">
                            <label>სათაური*</label>
                            <input type="text"
                                placeholder="შეიყვანე სათაური"
                                defaultValue={identitySelectors?.name}
                                {...register("name", {
                                    required: "გთხოვთ შეავსოთ",
                                    minLength: { value: 3, message: "მინიმუმ სამი სიმბოლო" },
                                    maxLength: { value: 255, message: "მაქსიმუმ 255" }
                                })}
                            />
                            {errors.name && (
                                <p className="error_styles">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="form_group">
                            <label>დეპარტამენტი*</label>
                            <select {...register("department", { required: "გთხოვთ აირჩიოთ დეპარტამენტი" })}>
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                ))}
                            </select>
                            {errors.department && <p className="error_styles">{errors.department.message}</p>}
                        </div>

                        <div className="form_group">
                            <label>აღწერა</label>
                            <textarea
                                placeholder="შეიყვანე აღწერა"
                                defaultValue={identitySelectors?.description}
                                {...register("description", {
                                    minLength: { value: 3, message: "მინიმუმ სამი სიმბოლო" },
                                    maxLength: { value: 255, message: "მაქსიმუმ 255" }
                                })}
                            />
                            {errors.description && (
                                <p className="error_styles">{errors.description.message}</p>
                            )}
                        </div>
                        <div className="form_group">
                            <label>პასუხისმგებელი თანამშრომელი*</label>
                            <select
                                defaultValue={identitySelectors?.employee_id}
                                {...register("employee_id",
                                    { required: "გთხოვთ აირჩიოთ პასუხისმგებელი თანამშრომელი" })}>
                                {employees
                                    /* .filter(employee => employee.departmentId === departmentSelected) */
                                    .map(employee => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name} {employee.surname}
                                        </option>
                                    ))}
                            </select>
                            {errors.employee_id && (
                                <p className="error_styles">{errors.employee_id.message}</p>
                            )}
                        </div>
                        <div className="form_group">
                            <label>პრიორიტეტი*</label>
                            <select className="form_statuses"
                                defaultValue={identitySelectors?.priority_id}
                                {...register("priority_id", { required: "გთხოვთ აირჩიოთ პრიორიტეტი" })}>
                                {priorities.map(priority => (
                                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                                ))}
                            </select>
                            {errors.priority_id && (
                                <p className="error_styles">{errors.priority_id.message}</p>
                            )}
                        </div>
                        <div className="form_group">
                            <label>სტატუსი*</label>
                            <select
                                className="form_statuses"
                                {...register("status_id", { required: "გთხოვთ აირჩიოთ სტატუსი" })}
                                defaultValue={identitySelectors?.status_id}>
                                {statuses.map(status => (
                                    <option key={status.id} value={status.id}>{status.name}</option>
                                ))}
                            </select>
                            {errors.status_id && (
                                <p className="error_styles">{errors.status_id.message}</p>
                            )}
                        </div>
                        <div className="form_group">
                            <label>დედლაინი</label>
                            <input type="date"
                                defaultValue={identitySelectors?.due_date || ""}
                                {...register("due_date", {
                                    required: "გთხოვთ აირჩიოთ დედლაინი",
                                    validate: value => new Date(value) > new Date() || "გთხოვთ აირჩიოთ მომავალი თარიღი"
                                })} />
                            {errors.due_date && <p className="error_styles">{errors.due_date.message}</p>}
                        </div>

                        <button type="submit" className="submit-button">
                            დავალების შექმნა
                        </button>
                    </form>
                </div>
            </div >
        </>
    );
};

export default AddNewTask;