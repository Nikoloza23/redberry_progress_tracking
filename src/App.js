import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";
import TaskDetails from "./pages/TaskDetails";

import './app.scss'
import AddNewTask from "./pages/AddNewTask";
import AddEmployee from "./pages/AddEmployee";

function App() {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/newtask" element={<AddNewTask />} />
        <Route path="/add-employee" element={<AddEmployee onClose={() => navigate(-1)} />} />
      </Routes>
    </>
  );
}

export default App;

