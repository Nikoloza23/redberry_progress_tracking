import "../sass/styles/_forms_module.scss";

//Add your own Task
const AddNewTask = () => {
    return (
        <>
            <h2 className="section_title">შექმენი ახალი დავალება</h2>
            <div className="add_task_container">
                <div className="form-container">
                    <form>
                        <div className="form_group">
                            <label>სათაური*</label>
                            <input type="text" placeholder="შეიყვანე სახელი" maxLength="255" />
                        </div>
                        <div className="form_group">
                            <label>დეპარტამენტი*</label>
                            <select>
                                <option>აირჩიე დეპარტამენტი</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>აღწერა</label>
                            <textarea placeholder="შეიყვანე აღწერა" maxLength="255"></textarea>
                        </div>

                        <div className="form_group">
                            <label>პასუხისმგებელი თანამშრომელი*</label>
                            <select>
                                <option>აირჩიე თანამშრომელი</option>
                            </select>
                        </div>
                        <div className="form_group">
                            <label>პრიორიტეტი*</label>
                            <select className="form_statuses">
                                <option>საბაზისო</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>სტატუსი*</label>
                            <select className="form_statuses">
                                <option>გაშვებული</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>დედლაინი</label>
                            <input type="date" />
                        </div>

                        <button type="submit" className="submit-button">
                            დავალების შექმნა
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddNewTask;