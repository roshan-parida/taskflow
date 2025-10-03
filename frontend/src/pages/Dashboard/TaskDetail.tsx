import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import {
	Loader2,
	Save,
	X,
	Calendar,
	Flag,
	Circle,
	ArrowLeft,
} from "lucide-react";

type Task = {
	_id: string;
	title: string;
	description: string;
	priority: "low" | "medium" | "high";
	status: "todo" | "in-progress" | "done";
	completed: boolean;
	dueDate?: string;
	createdAt: string;
	updatedAt: string;
};

export default function TaskDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [task, setTask] = useState<Task | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { register, handleSubmit, reset } = useForm();

	const inputClass =
		"w-full px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm";

	const selectClass =
		"w-full text-sm px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white select-custom";

	const fetchTask = async () => {
		setIsLoading(true);
		try {
			const res = await api.get(`/tasks/${id}`);
			const fetchedTask = res.data;
			setTask(fetchedTask);

			reset({
				...fetchedTask,
				dueDate: fetchedTask.dueDate
					? dayjs(fetchedTask.dueDate).format("YYYY-MM-DD")
					: "",
			});
		} catch (err: any) {
			alert(
				err.response?.data?.message || "Task not found or unauthorized."
			);
			navigate("/");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (id) fetchTask();
	}, [id]);

	const onSubmit = async (data: any) => {
		setIsSubmitting(true);
		try {
			const res = await api.put(`/tasks/${id}`, data);
			setTask(res.data);
			alert("Task updated successfully.");
		} catch (err: any) {
			alert(err.response?.data?.message || "Failed to update task.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center py-20 text-gray-500 dark:text-gray-400">
				<Loader2 className="animate-spin h-6 w-6 mr-2 z-10" />
				Loading task details...
			</div>
		);
	}

	if (!task) return null;

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<button
					onClick={() => navigate("/")}
					className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:cursor-pointer transition-colors text-sm"
				>
					<ArrowLeft className="w-4 h-4 z-10" />
					<span>Back to Dashboard</span>
				</button>
			</div>

			{/* Task Card */}
			<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
				{/* Task Header */}
				<div className="flex items-start justify-between mb-6">
					<div className="flex-1">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
							{task.title}
						</h1>

						{/* Status and Priority Badges */}
						<div className="flex flex-wrap gap-2">
							<span
								className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium capitalize ${
									task.status === "todo"
										? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
										: task.status === "in-progress"
										? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
										: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800"
								}`}
							>
								<span>
									{task.status === "todo" && "📝"}
									{task.status === "in-progress" && "🚧"}
									{task.status === "done" && "✅"}
								</span>
								<span>{task.status.replace("-", " ")}</span>
							</span>

							<span
								className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium capitalize ${
									task.priority === "low"
										? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800"
										: task.priority === "medium"
										? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800"
										: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border border-red-200 dark:border-red-800"
								}`}
							>
								<Flag className="w-3 h-3 z-10" />
								<span>{task.priority}</span>
							</span>

							{task.dueDate && (
								<span className="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
									<Calendar className="w-3 h-3 z-10" />
									<span>
										Due{" "}
										{dayjs(task.dueDate).format(
											"MMM D, YYYY"
										)}
									</span>
								</span>
							)}
						</div>
					</div>
				</div>

				{/* Edit Form */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Title */}
					<div className="space-y-1.5">
						<label className="text-xs pl-1 space-x-1 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
							Task Title *
						</label>
						<input
							{...register("title", { required: true })}
							className={inputClass}
						/>
					</div>

					{/* Description */}
					<div className="space-y-1.5">
						<label className="text-xs pl-1 space-x-1 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
							Description
						</label>
						<textarea
							{...register("description")}
							rows={3}
							className={`${inputClass} resize-none`}
							placeholder="Add more details about this task..."
						/>
					</div>

					{/* Priority, Status, and Due Date */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
						<div className="space-y-1.5">
							<label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center space-x-1">
								<Flag className="w-3 h-3 z-10" />
								<span>Priority</span>
							</label>
							<select
								{...register("priority")}
								className={selectClass}
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>

						<div className="space-y-1.5">
							<label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center space-x-1">
								<Circle className="w-3 h-3 z-10" />
								<span>Status</span>
							</label>
							<select
								{...register("status")}
								className={selectClass}
							>
								<option value="todo">To Do</option>
								<option value="in-progress">In Progress</option>
								<option value="done">Done</option>
							</select>
						</div>

						<div className="space-y-1.5">
							<label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center space-x-1">
								<Calendar className="w-3 h-3 z-10" />
								<span>Due Date</span>
							</label>
							<input
								type="date"
								{...register("dueDate")}
								className={`${inputClass} date-custom`}
							/>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 pt-2">
						<button
							type="submit"
							disabled={isSubmitting}
							className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg transform hover:cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed text-sm"
						>
							<Save className="w-4 h-4 z-10" />
							<span>
								{isSubmitting ? "Saving..." : "Save Changes"}
							</span>
						</button>
						<button
							type="button"
							onClick={() => navigate("/")}
							className="flex items-center justify-center space-x-2 py-2.5 px-4 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-gray-600 transition-all duration-200 font-medium text-sm"
						>
							<X className="w-4 h-4 z-10" />
							<span>Cancel</span>
						</button>
					</div>
				</form>

				{/* Meta Information */}
				<div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 space-y-2 text-xs text-gray-500 dark:text-gray-400">
					<div className="flex flex-wrap gap-4 justify-between">
						<span>
							Created:{" "}
							{dayjs(task.createdAt).format("MMMM D, YYYY")}
						</span>
						<span>
							Updated:{" "}
							{dayjs(task.updatedAt).format("MMMM D, YYYY")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
