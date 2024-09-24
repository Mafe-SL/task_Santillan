import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskTable from "./components/TaskTable.jsx";
import TaskForm from "./components/TaskForm.jsx";
import EditTask from "./components/EditTask.jsx";


function App() {
  return (
    <div className="h-screen font-bold p-5 al text-center font-poppins">
      <h1 className="text-5xl">Gestor de tareas</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/update/:id" element={<EditTask/>} />
            <Route path="/"  element={<TaskTable/>} />
            <Route path="/create" element={<TaskForm/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
