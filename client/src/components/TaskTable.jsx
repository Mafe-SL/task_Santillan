import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

function TaskTable() {
  const [tasks, setTasks] = useState([]);


  //Consultar todas las tareas
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Eliminar tarea
  const handleDelete = (id) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    if (confirmed) {
      axios.delete(`http://localhost:5000/api/task/${id}`)
        .then(() => {
          setTasks(tasks.filter((task) => task._id !== id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Formato a fecha
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0]; // Extraer solo la parte de la fecha
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-5 p-4">Lista de Tareas</h2>
        <Link to="/create">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all">
            Agregar tarea
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Usuario</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Tarea</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Descripción</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Fecha de entrega</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item) => (
              <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 text-sm">{item.user}</td>
                <td className="px-6 py-4 text-gray-900 text-sm">{item.title}</td>
                <td className="px-6 py-4 text-gray-900 text-sm">{item.description}</td>
                <td className="px-6 py-4 text-gray-900 text-sm">{formatDate(item.dueDate)}</td> {/* Mostrar la fecha formateada */}
                <td className="px-6 py-4 space-x-2 flex">
                  <Link to={`/update/${item._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-all">
                      Editar
                    </button>
                  </Link>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all"
                    onClick={() => handleDelete(item._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable;
