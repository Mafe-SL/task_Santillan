import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

function TaskForm({ onTaskAdded }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); // Inicializar useNavigate

  const onSubmit = (data) => {
    axios.post("http://localhost:5000/api/tasks", data)
      .then((response) => {
        console.log(response);
        if (onTaskAdded) onTaskAdded(); // Notificar cuando se agrega una nueva tarea
        navigate("/"); // Redirigir a la tabla de tareas
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate("/"); // Redirigir a la tabla de tareas
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h1 className="text-3xl font-semibold mb-4  text-gray-700">Agregar tarea</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
          <label htmlFor="user" className="text-gray-600">Usuario</label>
          <input type="text" {...register("user")} className="text-black border border-gray-300 rounded p-2" />
          
          <label htmlFor="title" className="text-gray-600">Tarea</label>
          <input type="text" {...register("title")} className="text-black border border-gray-300 rounded p-2" />
          
          <label htmlFor="description" className="text-gray-600">Descripción</label>
          <input type="text" {...register("description")} className="text-black border border-gray-300 rounded p-2" />
          
          <label htmlFor="dueDate" className="text-gray-600">Fecha de entrega</label>
          <input type="date" {...register("dueDate")} className="text-black border border-gray-300 rounded p-2" />
          
          <div className="space-x-4 mt-4 align-middle flex items-center justify-center">
            <button
              type="submit"
              className="text-white rounded bg-blue-500 border border-blue-500 px-4 py-2 hover:bg-white hover:text-blue-500 transition-all"
            >
              Enviar
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

export default TaskForm;
