import api from "../../lib/api";

export default function TaskList({
	tasks,
	onDeleted,
	onToggled,
	onEdited,
}: any) {
	const deleteTask = async (id: string) => {
		if (!confirm("Delete task?")) return;
		await api.delete(`/tasks/${id}`);
		onDeleted();
	};

	const toggleComplete = async (task: any) => {
		await api.put(`/tasks/${task._id}`, {
			completed: !task.completed,
			status: task.completed ? "todo" : "done",
		});
		onToggled();
	};

	return (
		<div className="space-y-4">
			{tasks.length === 0 && (
				<div className="text-gray-500">No tasks</div>
			)}
			{tasks.map((t: any) => (
				<div
					key={t._id}
					className="bg-white p-4 rounded shadow flex justify-between items-start"
				>
					<div>
						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								checked={t.completed}
								onChange={() => toggleComplete(t)}
							/>
							<h3
								className={`font-semibold ${
									t.completed
										? "line-through text-gray-400"
										: ""
								}`}
							>
								{t.title}
							</h3>
						</div>
						<p className="text-sm text-gray-600">{t.description}</p>
						<div className="text-xs text-gray-500 mt-2">
							Priority: {t.priority} • Status: {t.status}
						</div>
					</div>
					<div className="flex flex-col space-y-2">
						<button
							onClick={() => deleteTask(t._id)}
							className="text-sm text-red-600"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
