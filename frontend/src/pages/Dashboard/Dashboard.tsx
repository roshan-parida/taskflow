import { useEffect, useState } from "react";
import api from "../../lib/api";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

export default function Dashboard() {
	const [tasks, setTasks] = useState<any[]>([]);
	const [query, setQuery] = useState("");
	const [filter, setFilter] = useState<{
		status?: string;
		priority?: string;
	}>({});

	const fetchTasks = async () => {
		try {
			const params: any = {};
			if (query) params.search = query;
			if (filter.status) params.status = filter.status;
			if (filter.priority) params.priority = filter.priority;

			const res = await api.get("/tasks", { params });
			setTasks(res.data.tasks);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div className="lg:col-span-2">
				<div className="flex items-center justify-between mb-4">
					<input
						placeholder="Search tasks..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="border rounded p-2 w-1/2"
					/>
					<div className="flex space-x-2">
						<select
							value={filter.status || ""}
							onChange={(e) =>
								setFilter((prev) => ({
									...prev,
									status: e.target.value || undefined,
								}))
							}
							className="border rounded p-2"
						>
							<option value="">All status</option>
							<option value="todo">Todo</option>
							<option value="in-progress">In Progress</option>
							<option value="done">Done</option>
						</select>
						<select
							value={filter.priority || ""}
							onChange={(e) =>
								setFilter((prev) => ({
									...prev,
									priority: e.target.value || undefined,
								}))
							}
							className="border rounded p-2"
						>
							<option value="">All priority</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
						<button
							onClick={fetchTasks}
							className="bg-indigo-600 text-white px-3 py-2 rounded"
						>
							Search
						</button>
					</div>
				</div>

				<TaskList
					tasks={tasks}
					onDeleted={fetchTasks}
					onToggled={fetchTasks}
					onEdited={fetchTasks}
				/>
			</div>

			<aside>
				<TaskForm onCreated={fetchTasks} />
			</aside>
		</div>
	);
}
