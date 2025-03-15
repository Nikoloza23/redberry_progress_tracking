import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";
import TaskDetails from "./pages/TaskDetails";

import './app.scss'
import AddNewTask from "./pages/AddNewTask";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/newtask" element={<AddNewTask />} />
      </Routes>
    </>
  );
}

export default App;

