import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateLayout() {
	const { logout, user } = useAuth();

	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow">
				<div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<Link to="/" className="text-xl font-semibold">
							TaskFlow
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<Link to="/profile" className="text-sm">
							{user?.name || "Profile"}
						</Link>
						<button
							className="text-sm text-red-600"
							onClick={logout}
						>
							Logout
						</button>
					</div>
				</div>
			</header>
			<main className="max-w-6xl mx-auto p-4">
				<Outlet />
			</main>
		</div>
	);
}
