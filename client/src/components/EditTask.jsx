import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const [tasks, setTask] = useState({ user: "", title: "", description: "", dueDate: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/task/${id}`)
      .then((response) => {
        const taskData = response.data;
        // Fecha en formato 'YYYY-MM-DD'
        if (taskData.dueDate) {
          taskData.dueDate = new Date(taskData.dueDate).toISOString().split('T')[0];
        }
        setTask(taskData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (event) => {
    setTask({ ...tasks, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/task/${id}`, tasks)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error actualizando la tarea:", error));
  };

  const handleCancel = () => {
    navigate("/"); // Redirigir a la lista de tareas
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h1 className="text-3xl font-semibold mb-4 text-gray-700">Actualizar tarea</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <label htmlFor="user" className="text-gray-600">Usuario</label>
          <input 
            type="text" 
            name="user" 
            value={tasks.user} 
            onChange={handleChange} 
            className="text-black border border-gray-300 rounded p-2" 
          />
          
          <label htmlFor="title" className="text-gray-600">Tarea</label>
          <input 
            type="text" 
            name="title" 
            value={tasks.title} 
            onChange={handleChange} 
            className="text-gray border border-gray-300 rounded p-2" 
          />
          
          <label htmlFor="description" className="text-gray-600">Descripción</label>
          <input 
            type="text" 
            name="description" 
            value={tasks.description} 
            onChange={handleChange} 
            className="text-gray border border-gray-300 rounded p-2" 
          />

          <label htmlFor="dueDate" className="text-gray-600">Fecha de entrega</label>
          <input 
            type="date" 
            name="dueDate" 
            value={tasks.dueDate} 
            onChange={handleChange} 
            className="text-gray border border-gray-300 rounded p-2" 
          />
          
          <div className="flex space-x-4 mt-4 items-center justify-center">
            <button
              className="text-white rounded bg-blue-500 border border-blue-500 px-4 py-2 hover:bg-white hover:text-blue-500 transition-all"
              type="submit"
            >
              Actualizar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-red-500 rounded border border-red-500 px-4 py-2 hover:bg-red-500 hover:text-white transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
