import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import axios from "axios"

import "../sass/styles/_added_employee.scss"

function AddEmployee({ onClose }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [imagePreview, setImagePreview] = useState("")

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm({
        mode: "onChange"
    })

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const deparmentResponse = await axios.get("https://momentum.redberryinternship.ge/api/departments");
                setDepartments(deparmentResponse.data)
            } catch (error) {
                setLoading(false)
            }
        }
        fetchDepartments()
    }, [])


    const onSubmit = async (data) => {
        const formdata = new FormData();
        formdata.append("department_id", data.department_id)
        formdata.append("name", data.name)
        formdata.append("surname", data.surname)
        formdata.append("avatar", data.avatar)
        try {
            const response = await axios.post("https://momentum.redberryinternship.ge/api/employees", formdata, {
                headers:
                {
                    Authorization: "Bearer 9e7c37bc-55b1-4468-b103-055c63e2a35e",
                    "Content-Type": "multipart/form-data"
                },
            });
            const employeeData = response.data;
            localStorage.setItem('employee', JSON.stringify(employeeData));
            alert("Employee added successfully");
            onClose()
            if (location.state?.from === 'addNewTask') {
                navigate(location.state.returnTo);
            } else {
                navigate("/newtask");
            }
        } catch (error) {
            alert(`Failed to add employee: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setValue("avatar", file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        setImagePreview(null);
        setValue("avatar", null);
    };

    if (loading)
        return <BeatLoader />
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>თანამშრომლის დამატება</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <div className="input-field">
                            <label>სახელი*</label>
                            <input
                                type="text"
                                {...register("name", {
                                    required: "გთხოვთ შეავსოთ",
                                    minLength: { value: 3, message: "მინიმუმ სამი სიმბოლო" },
                                    maxLength: { value: 255, message: "მაქსიმუმ 255" },
                                    pattern: {
                                        value: /^[a-zA-Zა-ჰ]+$/,
                                        message: "მხოლოდ ქართული და ლათინური ასოებია დაშვებული"
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="error_styles">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="input-field">
                            <label>გვარი*</label>
                            <input
                                type="text"
                                {...register("surname", {
                                    required: "გთხოვთ შეავსოთ",
                                    minLength: { value: 4, message: "მინიმუმ ოთხი სიმბოლო" },
                                    maxLength: { value: 255, message: "მაქსიმუმ 255" },
                                    pattern: {
                                        value: /^[a-zA-Zა-ჰ]+$/,
                                        message: "მხოლოდ ქართული და ლათინური ასოებია დაშვებული"
                                    }
                                })}
                            />
                        </div>
                    </div>
                    {errors.surname && (
                        <p className="error_styles">{errors.surname.message}</p>
                    )}
                    <div className="input-field">
                        <label>ავატარი*</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="upload_avatar"
                            onChange={handleImageUpload}
                        />
                        {imagePreview && (
                            <div className="image_preview_container">
                                <img src={imagePreview} alt="Uploaded" className="uploaded_avatar" />
                                <button onClick={handleImageDelete} className="delete-button">წაშლა</button>
                            </div>
                        )}
                        {errors.avatar && (
                            <p className="error_styles">{errors.avatar.message}</p>
                        )}
                    </div>
                    <div className="input-field">
                        <label>დეპარტამენტი*</label>
                        <select
                            {...register("department_id", { required: "გთხოვთ აირჩიოთ დეპარტამენტი" })}
                        >
                            {departments.map(department => (
                                <option key={department.id} value={department.id} >{department.name} </option>
                            ))}
                        </select>
                        {errors.department_id && (
                            <p className="error_styles">{errors.department_id.message}</p>
                        )}
                    </div>
                    <div className="button-group">
                        <button className="close-button" onClick={onClose}>გაუქმება</button>
                        <button className="submit-button" type="submit">დაამატე თანამშრომელი</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee