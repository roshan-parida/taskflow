import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CheckSquare, LogOut } from "lucide-react";

export default function PrivateLayout() {
	const { logout, user } = useAuth();

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
			{/* Header */}
			<header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						{/* Left: Logo and Navigation */}
						<div className="flex items-center space-x-8">
							<Link
								to="/"
								className="flex items-center space-x-3 group"
							>
								<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
									<CheckSquare className="w-5 h-5 text-white" />
								</div>
								<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									TaskFlow
								</span>
							</Link>
						</div>

						{/* Right: User Actions */}
						<div className="flex items-center space-x-4">
							{/* User Profile */}
							<Link
								to="/profile"
								className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group min-h-[40px]"
							>
								<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
									<span className="text-white font-bold text-sm">
										{user?.name?.[0]?.toUpperCase() || "U"}
									</span>
								</div>
								<div className="hidden sm:block text-left">
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{user?.name || "User"}
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										{user?.email}
									</p>
								</div>
							</Link>

							{/* Logout */}
							<button
								onClick={logout}
								className="flex items-center justify-center space-x-3 px-4 py-4 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 hover:cursor-pointer dark:hover:bg-red-900/50 rounded-lg transition-all duration-200"
							>
								<LogOut className="w-4 h-4" />
								<span className="hidden sm:inline">Logout</span>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto p-6">
				<Outlet />
			</main>
		</div>
	);
}
