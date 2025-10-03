import { useEffect, useState, useCallback } from "react";
import { Search, Filter, Loader2, Plus } from "lucide-react";
import api from "../../lib/api";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

type TaskQuery = {
	search: string;
	status: string;
	priority: string;
	completed: string;
	page: number;
	limit: number;
};

const initialQuery: TaskQuery = {
	search: "",
	status: "",
	priority: "",
	completed: "",
	page: 1,
	limit: 10,
};

export default function Dashboard() {
	const [tasks, setTasks] = useState<any[]>([]);
	const [query, setQuery] = useState<TaskQuery>(initialQuery);
	const [totalTasks, setTotalTasks] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [showMobileForm, setShowMobileForm] = useState(false);

	const fetchTasks = useCallback(async () => {
		setIsLoading(true);
		try {
			const params: any = {};
			Object.keys(query).forEach((key) => {
				const value = query[key as keyof TaskQuery];
				if (value && value !== initialQuery[key as keyof TaskQuery]) {
					params[key] = value;
				}
			});

			const res = await api.get("/tasks", { params });
			setTasks(res.data.tasks);
			setTotalTasks(res.data.total);
			setTotalPages(Math.ceil(res.data.total / query.limit));
		} catch (err) {
			console.error("Failed to fetch tasks:", err);
			setTasks([]);
			setTotalTasks(0);
			setTotalPages(1);
			alert("Failed to load tasks. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}, [query]);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	const handleQueryChange = (
		key: keyof TaskQuery,
		value: string | number
	) => {
		setQuery((prev) => ({
			...prev,
			[key]: value,
			page: 1,
		}));
	};

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setQuery((prev) => ({ ...prev, page: newPage }));
		}
	};

	const refetchTasks = () => {
		fetchTasks();
		setShowMobileForm(false);
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Main Content - 2/3 width on lg screens */}
			<div className="lg:col-span-2 space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							Dashboard
						</h1>
						<p className="text-gray-600 dark:text-gray-400 mt-1">
							Manage your tasks and stay productive
						</p>
					</div>
					<div className="lg:hidden">
						<button
							onClick={() => setShowMobileForm(!showMobileForm)}
							className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-medium"
						>
							<Plus className="w-4 h-4" />
							<span>New Task</span>
						</button>
					</div>
				</div>

				{/* Mobile Task Form */}
				{showMobileForm && (
					<div className="lg:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
								Create New Task
							</h3>
							<button
								onClick={() => setShowMobileForm(false)}
								className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
							>
								✕
							</button>
						</div>
						<TaskForm onCreated={refetchTasks} />
					</div>
				)}

				{/* Search and Filters */}
				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-4">
					{/* Search Bar */}
					<div className="relative">
						<Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
						<input
							placeholder="Search tasks by title or description..."
							value={query.search}
							onChange={(e) =>
								handleQueryChange("search", e.target.value)
							}
							className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>

					{/* Filters */}
					<div className="flex flex-wrap items-center gap-4">
						<div className="flex items-center space-x-2 flex-shrink-0">
							<Filter className="text-gray-400 h-5 w-5" />
							<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Filter by:
							</span>
						</div>

						<select
							value={query.status}
							onChange={(e) =>
								handleQueryChange("status", e.target.value)
							}
							className="flex-1 min-w-[120px] text-sm px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white select-custom"
						>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value=""
							>
								All Status
							</option>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value="todo"
							>
								Todo
							</option>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value="in-progress"
							>
								In Progress
							</option>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value="done"
							>
								Done
							</option>
						</select>

						<select
							value={query.priority}
							onChange={(e) =>
								handleQueryChange("priority", e.target.value)
							}
							className="flex-1 min-w-[120px] text-sm px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white select-custom"
						>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value=""
							>
								All Priority
							</option>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value="low"
							>
								Low
							</option>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value="medium"
							>
								Medium
							</option>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value="high"
							>
								High
							</option>
						</select>

						<select
							value={query.completed}
							onChange={(e) =>
								handleQueryChange("completed", e.target.value)
							}
							className="flex-1 min-w-[120px] text-sm px-4 py-2.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white select-custom"
						>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value=""
							>
								All Tasks
							</option>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value="true"
							>
								Completed
							</option>
							<option
								className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
								value="false"
							>
								Not Completed
							</option>
						</select>
					</div>
				</div>

				{/* Task List */}
				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
					{/* Stats Header */}
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
							Your Tasks
						</h2>
						{!isLoading && tasks.length > 0 && (
							<span className="text-sm text-gray-600 dark:text-gray-400">
								{totalTasks} task{totalTasks !== 1 ? "s" : ""}{" "}
								total
							</span>
						)}
					</div>

					{isLoading ? (
						<div className="flex justify-center items-center py-12 text-gray-500 dark:text-gray-400">
							<Loader2 className="animate-spin h-6 w-6 mr-2" />
							Loading tasks...
						</div>
					) : tasks.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
							<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
								📭
							</div>
							<p className="text-lg font-medium mb-2">
								No tasks found
							</p>
							<p className="text-sm text-center">
								{query.search ||
								query.status ||
								query.priority ||
								query.completed
									? "Try adjusting your filters or search terms."
									: "Get started by creating your first task!"}
							</p>
						</div>
					) : (
						<>
							<TaskList
								tasks={tasks}
								onDeleted={refetchTasks}
								onToggled={refetchTasks}
								onEdited={refetchTasks}
							/>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-600 mt-6">
									<div className="text-sm text-gray-600 dark:text-gray-400">
										Page {query.page} of {totalPages}
									</div>
									<div className="flex items-center space-x-2">
										<button
											onClick={() =>
												handlePageChange(query.page - 1)
											}
											disabled={query.page === 1}
											className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
										>
											Previous
										</button>
										<button
											onClick={() =>
												handlePageChange(query.page + 1)
											}
											disabled={query.page === totalPages}
											className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
										>
											Next
										</button>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</div>

			{/* Task Form Sidebar - 1/3 width on lg screens */}
			<div className="hidden lg:block lg:col-span-1">
				<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50 sticky top-6">
					<div className="flex items-center space-x-3 mb-6">
						<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
							<Plus className="w-5 h-5 text-white" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
							Create New Task
						</h3>
					</div>
					<TaskForm onCreated={refetchTasks} />
				</div>
			</div>
		</div>
	);
}
