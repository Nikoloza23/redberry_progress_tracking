import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";
import TaskDetails from "./pages/TaskDetails";

import './app.scss'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
      </Routes>
    </>
  );
}

export default App;

