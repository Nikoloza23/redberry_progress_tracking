import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_DATA } from '../redux/actions'
import { identity } from "../redux/selectors";

import axiosInstance from '../services/axios';

import group from '../assets/Group.png';
import low from '../assets/Low.png';
import vector from '../assets/Vector.png';

import "../sass/styles/_forms_module.scss";
import AddEmployee from "./AddEmployee";

//Add your own Task
const AddNewTask = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const identitySelectors = useSelector(identity)

    const [departments, setDepartments] = useState([])
    const [employees, setEmployees] = useState([])
    const [priorities, setPriorities] = useState([])
    const [statuses, setStatuses] = useState([])
    const [selectedPriority, setSelectedPriority] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const [showAddEmployee, setShowAddEmployee] = useState(false);

    const [loading, setLoading] = useState(true)

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropMenu, setDropMenu] = useState(false)

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: identitySelectors || {},
        mode: "onChange"
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deparmentResponse = await axiosInstance.get("/departments");
                const employeeResponse = await axiosInstance.get("/employees");
                const priorityResponse = await axiosInstance.get("/priorities")
                const statusResponse = await axiosInstance.get("/statuses")


                console.log("Fetched Employees:", employeeResponse.data);
                console.log("First Employee:", employeeResponse.data[0]);
                console.log("Fetched Departments:", deparmentResponse.data);

                setDepartments(deparmentResponse.data)
                setEmployees(employeeResponse.data)
                setPriorities(priorityResponse.data)
                setStatuses(statusResponse.data)
            } catch (error) {
                console.log("error")
                setLoading(false)
            }
        }
        fetchData()
    }, [])

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

    const handleSelect = (priority) => {
        setSelectedPriority(priority);
        setValue("priority_id", priority.id, { shouldValidate: true });
        setDropdownOpen(false);
    };

    const handleDepartmentSelect = (departmentId) => {
        setSelectedDepartment(departmentId);
        setValue("department", departmentId);

        if (selectedEmployee && selectedEmployee.department_id !== departmentId) {
            setSelectedEmployee(null);
            setValue("employee_id", null);
        }
    };
    const filteredEmployees = employees.filter(employee => {
        console.log("Employee:", employee);
        console.log("Employee Department ID:", employee.department.id);
        console.log("Selected Department ID:", selectedDepartment);
        return employee.department.id === Number(selectedDepartment);
    });


    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
        setValue("employee_id", employee.id, { shouldValidate: true });
        setDropMenu(false);
    };



    const handleAddEmployee = () => {
        setDropMenu(false);
        navigate('/add-employee', {
            state: {
                from: 'addNewTask',
                returnTo: '/newtask'
            }
        });
    };

    const onSubmit = async (data) => {
        console.log(data)
        try {
            await dispatch(UPLOAD_DATA(data));
            alert("Task added successfully!");
            navigate("/");
        } catch (error) {
            console.error("Failed to response data", error);
        }
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
                                className="text_type"
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
                            <select
                                {...register("department", { required: "გთხოვთ აირჩიოთ დეპარტამენტი" })}
                                onChange={(e) => handleDepartmentSelect(e.target.value)}
                                value={selectedDepartment}
                            >
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
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
                            <div className="custom_dropdown">
                                <button type="button" className="dropdown_button_employee" onClick={() => setDropMenu(prev => !prev)}>
                                    {selectedEmployee && (
                                        <div className="added_employee">
                                            <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="employee_icon" />
                                            {selectedEmployee.name} {selectedEmployee.surname}
                                        </div>
                                    )}
                                    <span className="dropdown_arrow">▼</span>
                                </button>
                                {dropMenu &&
                                    <ul className="dropdown_menu">
                                        {filteredEmployees.map(employee => (
                                            <li key={employee.id} onClick={() => handleEmployeeSelect(employee)}>
                                                <img src={employee.avatar} alt="" className="employee_avatar" />
                                                {employee.name}
                                                <div>{employee.surname}</div>
                                            </li>
                                        ))}
                                        <li onClick={handleAddEmployee} className="add_employee_option">
                                            <button type="button">

                                                <p>+ დაამატე თანამშრომელი</p>
                                            </button>
                                        </li>
                                    </ul>
                                }
                                {/*  {showAddEmployee && (
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <AddEmployee onClose={() => setShowAddEmployee(false)} />
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </div>
                        <div className="form_group">
                            <label>პრიორიტეტი*</label>
                            <div className="custom_dropdown">
                                <button type="button" className="dropdown_button" onClick={() => setDropdownOpen(prev => !prev)}>
                                    {selectedPriority && (
                                        <>
                                            <img src={selectedPriority.icon} alt={selectedPriority.name} className="priority_icon" />
                                            {selectedPriority.name}
                                        </>
                                    )}
                                    <span className="dropdown_arrow">▼</span>
                                </button>
                                {dropdownOpen && (
                                    <ul className="dropdown_menu">
                                        {priorities.map(priority => (
                                            <li key={priority.id} onClick={() => handleSelect(priority)}>
                                                <img src={getPriorityIcon(priority.name)} alt="" className="priority_icon" />
                                                {getPriorityIcon(priority.name)}<div>
                                                    {priority.name}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {errors.priority_id && <p className="error_styles">{errors.priority_id.message}</p>}
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
                                className="date_type"
                                defaultValue={identitySelectors?.due_date || ""}
                                {...register("due_date", {
                                    required: "გთხოვთ აირჩიოთ დედლაინი",
                                    validate: value => new Date(value) > new Date() || "გთხოვთ აირჩიოთ მომავალი თარიღი"
                                })} />
                            {errors.due_date && <p className="error_styles">{errors.due_date.message}</p>}
                        </div>
                        <button type="submit" className="submit_button">
                            დავალების შექმნა
                        </button>
                    </form >
                </div >
            </div >
        </>
    );
};

export default AddNewTask;