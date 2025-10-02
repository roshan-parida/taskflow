import { useForm } from "react-hook-form";
import api from "../../lib/api";

export default function TaskForm({ onCreated }: any) {
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = async (data: any) => {
		try {
			await api.post("/tasks", data);
			reset();
			onCreated();
		} catch (err: any) {
			alert(err.response?.data?.message || "Failed");
		}
	};

	return (
		<div className="bg-white p-4 rounded shadow">
			<h3 className="font-semibold mb-3">Create Task</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
				<input
					placeholder="Title"
					{...register("title")}
					className="w-full border rounded p-2"
				/>
				<textarea
					placeholder="Description"
					{...register("description")}
					className="w-full border rounded p-2"
				/>
				<div className="flex space-x-2">
					<select
						{...register("priority")}
						className="border rounded p-2"
					>
						<option value="medium">Medium</option>
						<option value="low">Low</option>
						<option value="high">High</option>
					</select>
					<select
						{...register("status")}
						className="border rounded p-2"
					>
						<option value="todo">Todo</option>
						<option value="in-progress">In Progress</option>
						<option value="done">Done</option>
					</select>
				</div>
				<button className="w-full bg-green-600 text-white py-2 rounded">
					Create
				</button>
			</form>
		</div>
	);
}
