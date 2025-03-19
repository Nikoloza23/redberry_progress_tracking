import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { UPLOAD_EMPLOYEE } from "../redux/actions";

import { user } from "../redux/selectors";

import axios from "axios"

import "../sass/styles/_added_employee.scss"


function AddEmployee({ onClose }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const identityEmployee = useSelector(user)
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [imagePreview, setImagePreview] = useState(identityEmployee?.photo || "")

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: identityEmployee || {},
        mode: "onChange"
    })

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const deparmentResponse = await axios.get("https://momentum.redberryinternship.ge/api/departments");
                setDepartments(deparmentResponse.data)
                console.log(deparmentResponse.data)
            } catch (error) {
                console.log("error")
                setLoading(false)
            }
        }
        fetchDepartments()
    }, [])



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file");
                return;
            }
            if (file.size > 600 * 1024) {
                alert("Please select an image file with size less than 600KB");
                return;
            }
            const formData = new FormData();
            formData.append('file', file);

            axios.post("https://momentum.redberryinternship.ge/api/employees", formData, {
                headers: { Authorization: "Bearer 9e77a3d7-86e5-4b4b-9264-fc67efbac2af" }
            })
                .then((response) => {
                    const avatarUrl = response.data.avatar_url;
                    setImagePreview(avatarUrl);
                    setValue("avatar", avatarUrl);
                })
                .catch((error) => {
                    console.error("Error uploading avatar", error);
                    alert("Failed to upload image. Please try again.");
                });
        }
    };


    const handleImageDelete = () => {
        setImagePreview(null);
        setValue("photo", null);

    };



    const onSubmit = (data) => {
        dispatch(UPLOAD_EMPLOYEE({ ...data, avatar: imagePreview || "" }))
        console.log(data)
        navigate("/")
    }

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
                                defaultValue={identityEmployee?.name}
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
                                defaultValue={identityEmployee?.surname}
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
                            {...register("avatar", {
                                required: "გთხოვთ დაამატოთ სურათი",
                                validate: {
                                    fileSize: (value) => value?.[0]?.size <= 600000 || "მაქსიმუმ 600kb ზომა უნდა იყოს",
                                    fileType: (value) => value?.[0]?.type.startsWith("image/") || "უნდა იყოს სურათის ტიპი",
                                    fileExist: (value) => value?.length > 0 || "გთხოვთ აირჩიოთ სურათი",

                                }
                            })}
                        />
                        {imagePreview &&
                            <div className="image_preview_container">
                                <img src={imagePreview} alt="Uploaded" className="uploaded_avatar" />
                                <button onClick={handleImageDelete} className="delete-button">წაშლა</button>
                            </div>
                        }
                        {errors.avatar && (
                            <p className="error_styles">{errors.avatar.message}</p>
                        )}

                    </div>
                    <div className="input-field">
                        <label>დეპარტამენტი*</label>
                        <select
                            defaultValue={identityEmployee?.department_id}
                            {...register("department_id", { required: "გთხოვთ აირჩიოთ დეპარტამენტი" })}
                        >
                            {departments.map(department => (
                                <option key={department.id} >{department.name} </option>
                            ))}
                        </select>
                        {errors.department_id && (
                            <p className="error_styles">{errors.department_id.message}</p>
                        )}
                    </div>
                    <div className="button-group">
                        <button className="close-button" onClick={onClose}>გაუქმება</button>
                        <button className="submit-button">დაამატე თანამშრომელი</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee