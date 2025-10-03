import api from "../../lib/api";
import { Link } from "react-router-dom";
import { Pencil, Trash2, CheckCircle, Calendar, Flag } from "lucide-react";

const priorityColors: { [key: string]: string } = {
	low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800",
	medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800",
	high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border border-red-200 dark:border-red-800",
};

const statusColors: { [key: string]: string } = {
	todo: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600",
	"in-progress":
		"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
	done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800",
};

export default function TaskList({ tasks, onDeleted, onToggled }: any) {
	const deleteTask = async (id: string) => {
		if (!confirm("Are you sure you want to delete this task?")) return;
		try {
			await api.delete(`/tasks/${id}`);
			onDeleted();
		} catch (err) {
			alert("Failed to delete task.");
		}
	};

	const toggleComplete = async (task: any) => {
		try {
			await api.put(`/tasks/${task._id}`, {
				completed: !task.completed,
				status: task.completed ? "todo" : "done",
			});
			onToggled();
		} catch (err) {
			alert("Failed to update task status.");
		}
	};

	return (
		<div className="space-y-4">
			{tasks.map((t: any) => (
				<div
					key={t._id}
					className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
				>
					<div className="flex items-start justify-between">
						{/* Content */}
						<div className="flex items-start space-x-4 flex-1 min-w-0">
							{/* Checkbox */}
							<button
								onClick={() => toggleComplete(t)}
								className={`mt-1 h-5 w-5 flex items-center justify-center rounded-lg border hover:cursor-pointer transition-all duration-200 ${
									t.completed
										? "bg-blue-500 border-blue-500 text-white"
										: "border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-blue-500"
								}`}
							>
								{t.completed && (
									<CheckCircle className="w-3.5 h-3.5 z-10" />
								)}
							</button>

							{/* Task Details */}
							<div className="flex-1 min-w-0 space-y-3">
								{/* Title and Description */}
								<div>
									<h3
										className={`text-base font-semibold transition-colors break-words ${
											t.completed
												? "line-through text-gray-500 dark:text-gray-500"
												: "text-gray-900 dark:text-white"
										}`}
									>
										{t.title}
									</h3>
									{t.description && (
										<p className="text-sm text-gray-600 dark:text-gray-400 mt-1 break-words">
											{t.description}
										</p>
									)}
								</div>

								{/* Meta Info */}
								<div className="flex flex-wrap items-center gap-2">
									{/* Priority */}
									<span
										className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${
											priorityColors[t.priority]
										}`}
									>
										<Flag className="w-3 h-3 z-10" />
										<span>{t.priority}</span>
									</span>

									{/* Status */}
									<span
										className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${
											statusColors[t.status]
										}`}
									>
										<span>
											{t.status === "todo" && "📝"}
											{t.status === "in-progress" && "🚧"}
											{t.status === "done" && "✅"}
										</span>
										<span>
											{t.status.replace("-", " ")}
										</span>
									</span>

									{/* Due Date */}
									{t.dueDate && (
										<span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
											<Calendar className="w-3 h-3 z-10" />
											<span>
												{new Date(
													t.dueDate
												).toLocaleDateString()}
											</span>
										</span>
									)}
								</div>
							</div>
						</div>

						{/* Actions */}
						<div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							<Link
								to={`/tasks/${t._id}`}
								className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-colors duration-200"
								title="Edit Task"
							>
								<Pencil className="w-4 h-4 z-10" />
							</Link>
							<button
								onClick={() => deleteTask(t._id)}
								className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 hover:cursor-pointer dark:hover:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-200"
								title="Delete Task"
							>
								<Trash2 className="w-4 h-4 z-10" />
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
