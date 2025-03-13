import "../sass/styles/_tasks_page.scss"

import shape from "../assets/Shape.png"
function TasksPage() {
    return (
        <>

            <h3>დავალებების გვერდი</h3>
            <div className="tasks_container">
                <div className="filter_components">
                    <button className="bt1">დეპარტამენტი <img src={shape} /> </button>
                    <button className="bt2">პრიორიტეტი<img src={shape} /></button>
                    <button className="bt3">თანამშრომელი<img src={shape} /></button>
                </div>
            </div>
        </>
    )
}

export default TasksPage