import { useState } from "react"

import shape from '../assets/Shape.png'

//Filter Page
function Filters({ departments, priorities, employees, onFilterChange }) {
    const [dropDown, setDropDown] = useState(null)
    const [selectedDepartments, setSelectedDepartments] = useState([])
    const [selectedPriorities, setSelectedPriorities] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const dropMenu = (dropdown) => {
        setDropDown(prev => (prev === dropdown ? null : dropdown))
    }

    const toggleSelection = (setSelected, value) => {
        setSelected(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        )
    }

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee.name);
    }

    const applyFilters = () => {
        onFilterChange({
            selectedDepartments,
            selectedPriorities,
            selectedEmployees: selectedEmployee ? [selectedEmployee] : []
        });
        setDropDown(null)
    }

    return (
        <div className="filter_components">
            <div className="filter_item">
                <button className="bt1" onClick={() => dropMenu("department")}>
                    დეპარტამენტი <img src={shape} alt="" />
                </button>
                {dropDown === "department" && (
                    <div className="dropdown">
                        {departments.map(dep => (
                            <label key={dep.id}>
                                <input
                                    type="checkbox"
                                    onChange={() => toggleSelection(setSelectedDepartments, dep.name)}
                                    checked={selectedDepartments.includes(dep.name)}
                                />
                                {dep.name}
                            </label>
                        ))}
                        <button className="apply_button" onClick={applyFilters}>არჩევა</button>
                    </div>
                )}
            </div>
            <div className="filter_item">
                <button className="bt2" onClick={() => dropMenu("priority")}>
                    პრიორიტეტი <img src={shape} alt="" />
                </button>
                {dropDown === "priority" && (
                    <div className="dropdown">
                        {priorities.map(priority => (
                            <label key={priority.id}>
                                <input
                                    type="checkbox"
                                    onChange={() => toggleSelection(setSelectedPriorities, priority.name)}
                                    checked={selectedPriorities.includes(priority.name)}
                                />
                                {priority.name}
                            </label>
                        ))}
                        <button className="apply_button" onClick={applyFilters}>არჩევა</button>
                    </div>
                )}
            </div>
            <div className="filter_item">
                <button className="bt3" onClick={() => dropMenu("employee")}>თანამშრომელი <img src={shape} alt="" /></button>
                {dropDown === "employee" && (
                    <div className="dropdown">
                        {employees.map((employee) => (
                            <label key={employee.id} className="employee_item">
                                <input
                                    type="radio"
                                    onChange={() => handleEmployeeSelect(employee)}
                                    checked={selectedEmployee === employee.name}
                                    name="employee"
                                />
                                <img src={employee.avatar} alt={employee.name} className="employee_avatar" />
                                <div className="employee_info">{employee.name} {employee.surname}</div>
                            </label>
                        ))}
                        <button className="apply_button" onClick={applyFilters}>არჩევა</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Filters;