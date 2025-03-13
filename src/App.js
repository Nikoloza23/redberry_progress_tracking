import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import TasksPage from "./pages/TasksPage";


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

/*     https://momentum.redberryinternship.ge/api/tasks
 */ 