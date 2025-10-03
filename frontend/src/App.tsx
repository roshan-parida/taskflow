import type { JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import PublicLayout from "./components/layouts/PublicLayout";
import PrivateLayout from "./components/layouts/PrivateLayout";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProfilePage from "./pages/Profile/ProfilePage";
import TaskDetail from "./pages/Dashboard/TaskDetail";

function ProtectedRoute({ children }: { children: JSX.Element }) {
	const { token } = useAuth();
	if (!token) return <Navigate to="/login" replace />;
	return children;
}

export default function App() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route element={<PublicLayout />}>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
			</Route>

			{/* Protected Routes */}
			<Route element={<PrivateLayout />}>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/tasks/:id"
					element={
						<ProtectedRoute>
							<TaskDetail />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
			</Route>

			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
