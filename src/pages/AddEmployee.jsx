import { useState } from "react";
import "../sass/styles/_added_employee.scss"


function AddEmployee({ onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        avatar: "",
        department_id: "",

    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>თანამშრომლის დამატება</h2>
                <input
                    type="text"
                    name="firstName"
                    placeholder="სახელი"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="გვარი"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <textarea
                    name="about"
                    placeholder="აღწერა"
                    value={formData.about}
                    onChange={handleChange}
                ></textarea>
                <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                >
                    <option value="">დეპარტამენტი</option>
                    <option value="HR">HR</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                </select>
                <div className="button-group">
                    <button className="close-button" onClick={onClose}>გაუქმება</button>
                    <button className="submit-button">დამატება</button>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee