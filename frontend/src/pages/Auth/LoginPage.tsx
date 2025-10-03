import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

const schema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormType = z.infer<typeof schema>;

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormType>({ resolver: zodResolver(schema) });
	const { login } = useAuth();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = async (data: FormType) => {
		try {
			const res = await api.post("/auth/login", data);
			const token = res.data.token;
			login(token);
			navigate("/");
		} catch (err: any) {
			alert(err.response?.data?.message || "Sign in failed");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div className="space-y-5">
				{/* Email Field */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Email Address
					</label>
					<div className="relative">
						<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
						<input
							{...register("email")}
							type="email"
							placeholder="your@email.com"
							className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
					</div>
					{errors.email && (
						<p className="text-sm text-red-500 dark:text-red-400">
							{errors.email.message}
						</p>
					)}
				</div>

				{/* Password Field */}
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Password
					</label>
					<div className="relative">
						<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
						<input
							type={showPassword ? "text" : "password"}
							{...register("password")}
							placeholder="Enter your password"
							className="w-full pl-12 pr-12 py-3.5 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
						>
							{showPassword ? (
								<EyeOff className="h-5 w-5 z-10" />
							) : (
								<Eye className="h-5 w-5 z-10" />
							)}
						</button>
					</div>
					{errors.password && (
						<p className="text-sm text-red-500 dark:text-red-400">
							{errors.password.message}
						</p>
					)}
				</div>
			</div>

			{/* Submit Button */}
			<button
				disabled={isSubmitting}
				className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
			>
				<LogIn className="w-5 h-5 z-10" />
				<span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
			</button>

			{/* Sign Up Link */}
			<div className="text-center pt-4">
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
					>
						Create an account
					</Link>
				</p>
			</div>
		</form>
	);
}
