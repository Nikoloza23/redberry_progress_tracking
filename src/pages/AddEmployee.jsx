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
                <div className="input-group">
                    <div className="input-field">
                        <label>სახელი*</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-field">
                        <label>გვარი*</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="input-field">
                    <label>ავატარი*</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="input-field">
                    <label>დეპარტამენტი*</label>
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
                </div>
                <div className="button-group">
                    <button className="close-button" onClick={onClose}>გაუქმება</button>
                    <button className="submit-button">დაამატე თანამშრომელი</button>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee