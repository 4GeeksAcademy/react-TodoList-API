import React, { useState, useEffect } from "react";

const Prueba = () => {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const userId = "Lucas";
  const API_URL = "https://playground.4geeks.com/todo";
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}/tasks`);
        if (response.ok) {
          const data = await response.json();
          setTodo(data);
        }
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddList = async () => {
    if (task.trim() === "") return;

    try {
      const response = await fetch(`${API_URL}/todos/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: task, is_done: false }),
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log("Tarea agregada:", newTask);
        setTodo((prevTodo) => [...prevTodo, newTask]);
        setTask("");
      }
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddList();
    }
  };

  const handleDelete = async (taskToDelete) => {
    try {
      const response = await fetch(`${API_URL}/todos/${taskToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Tarea eliminada:", taskToDelete);
        const updatedTodo = todo.filter((task) => task.id !== taskToDelete.id);
        setTodo(updatedTodo);
      }
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="text-center mt-5 display-1">TODOS</h1>
      </div>

      <div className="container w-50">
        <ul className="list-group rounded-0 shadow">
          <li className="list-group-item">
            <input
              onKeyDown={handleKeyDown}
              onChange={(e) => setTask(e.target.value)}
              value={task}
              className="form-control"
              placeholder="Agregar Tarea"
            />
          </li>

          {todo.length === 0 ? (
            <li className="list-group-item text-center">
              <p>No tienes tareas pendientes</p>
            </li>
          ) : (
            todo.map((task) => (
              <li key={task.id} className="list-group-item d-flex justify-content-between task">
                {task.label}
                <button
                  onClick={() => handleDelete(task)}
                  className="btn btn-danger btn-sm deleteButton"
                >
                  X
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Prueba;
