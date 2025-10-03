import { useForm } from "react-hook-form";
import api from "../../lib/api";
import { Plus, Calendar, Flag, Circle } from "lucide-react";

export default function TaskForm({ onCreated }: any) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm();

	const onSubmit = async (data: any) => {
		try {
			await api.post("/tasks", data);
			reset();
			onCreated();
		} catch (err: any) {
			alert(err.response?.data?.message || "Failed to create task");
		}
	};

	const inputClass =
		"w-full px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm";

	const selectClass =
		"w-full text-sm px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white select-custom";

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{/* Title */}
			<div className="space-y-1.5">
				<label className="text-xs pl-1 space-x-1 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
					Task Title *
				</label>
				<input
					{...register("title", { required: true })}
					placeholder="What needs to be done?"
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
					placeholder="Add more details about this task..."
					rows={3}
					className={`${inputClass} resize-none`}
				/>
			</div>

			{/* Priority & Status */}
			<div className="grid grid-cols-2 gap-3">
				<div className="space-y-1.5">
					<label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center space-x-1">
						<Flag className="w-3 h-3" />
						<span>Priority</span>
					</label>
					<select
						{...register("priority")}
						className={selectClass}
						defaultValue="medium"
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>

				<div className="space-y-1.5">
					<label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center space-x-1">
						<Circle className="w-3 h-3" />
						<span>Status</span>
					</label>
					<select
						{...register("status")}
						className={selectClass}
						defaultValue="todo"
					>
						<option value="todo">To Do</option>
						<option value="in-progress">In Progress</option>
						<option value="done">Done</option>
					</select>
				</div>
			</div>

			{/* Due Date */}
			<div className="space-y-1.5">
				<label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center space-x-1">
					<Calendar className="w-3 h-3" />
					<span>Due Date</span>
				</label>
				<input
					type="date"
					{...register("dueDate")}
					className={`${inputClass} date-custom`}
				/>
			</div>

			{/* Submit Button */}
			<div className="pt-2">
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg transform hover:cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed text-sm"
				>
					<Plus className="w-4 h-4" />
					<span>{isSubmitting ? "Creating..." : "Create Task"}</span>
				</button>
			</div>
		</form>
	);
}
