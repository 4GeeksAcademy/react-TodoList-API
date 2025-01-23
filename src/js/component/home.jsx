import React, { useEffect } from "react";
import { useState } from "react";


const Home = () => {

	const [todo, setTodo] = useState([])
	const [Task, setTask] = useState("")


	const handleAddList = () => {
		const newList = [...todo, Task]
		setTodo(newList)
		setTask("")
	}
	
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleAddList();
		}
	};

	const handleDelete = (taskToDelete) => {
		const newList = todo.filter((task) => task !== taskToDelete);
		setTodo(newList);
	};


		

	return (
		<div className="container">
			<div className="text-center"><h1 className="text-center mt-5 display-1">TODOS</h1></div>

			<div className="container w-50">
				<ul className="list-group rounded-0 shadow">
					<li className="list-group-item">
						<input
							onKeyDown={handleKeyDown}
							value={Task}
							onChange={(e) => setTask(e.target.value)}
							className="form-control"
							placeholder="Agregar Tarea"
						/>
					</li>
					
					{todo.length === 0 ? (
						<li className="list-group-item text-center">
							<p>No tienes tareas pendientes</p>
						</li>
					) : (
						todo.map((task, index) => (
							<li key={index} className="list-group-item d-flex justify-content-between task">
								{task}
								<button onClick={() => handleDelete(task)} className="btn btn-danger btn-sm deleteButton"> X </button>
							</li>
						))
					)}
				</ul>
			</div>
		</div>
	);
};



export default Home;