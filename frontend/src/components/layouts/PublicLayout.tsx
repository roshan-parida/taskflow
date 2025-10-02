import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md p-6">
				<div className="flex justify-center mb-6">
					<h1 className="text-2xl font-semibold">TaskFlow</h1>
				</div>
				<Outlet />
				<div className="text-center text-sm text-gray-500 mt-6">
					<Link to="/signup" className="text-indigo-600">
						Create an account
					</Link>
				</div>
			</div>
		</div>
	);
}
