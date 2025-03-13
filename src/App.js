import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";

import { Routes, Route } from "react-router-dom";

import './app.scss'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TasksPage />} />
      </Routes>
    </>
  );
}

export default App;
