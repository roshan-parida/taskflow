import { Outlet } from "react-router-dom";
import { CheckSquare, Sparkles, Zap, Shield, Clock } from "lucide-react";

export default function PublicLayout() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-60 -right-60 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-60 -left-60 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
			</div>

			{/* Floating particles */}
			<div className="absolute inset-0">
				{Array.from({ length: 25 }).map((_, i) => (
					<div
						key={i}
						className="absolute w-2 h-2 bg-blue-300/30 dark:bg-blue-400/20 rounded-full"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							animation: `float ${
								Math.random() * 10 + 10
							}s infinite ease-in-out`,
							animationDelay: `${Math.random() * 5}s`,
						}}
					></div>
				))}
			</div>

			<div className="w-full max-w-6xl p-8 relative z-10 flex items-center justify-center min-h-screen">
				{/* Left Side - Branding & Features */}
				<div className="flex-1 max-w-2xl pr-12">
					<div className="flex items-center space-x-4 mb-8">
						<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
							<CheckSquare className="w-8 h-8 text-white" />
						</div>
						<div>
							<h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
								TaskFlow
							</h1>
							<p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
								Enterprise-grade task management
							</p>
						</div>
					</div>

					<div className="space-y-6 mb-12">
						<div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm">
							<Zap className="w-6 h-6 text-yellow-500" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">
									Lightning Fast
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Instant task updates and real-time sync
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm">
							<Shield className="w-6 h-6 text-green-500" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">
									Secure & Private
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Your data is encrypted and protected
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm">
							<Clock className="w-6 h-6 text-blue-500" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">
									Time Saving
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Automate workflows and save hours
								</p>
							</div>
						</div>
					</div>

					<div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
						<div className="flex items-center space-x-2">
							<Sparkles className="w-4 h-4 text-purple-500" />
							<span>Trusted by 10,000+ teams</span>
						</div>
						<div>•</div>
						<span>99.9% Uptime</span>
						<div>•</div>
						<span>24/7 Support</span>
					</div>
				</div>

				{/* Right Side - Auth Card */}
				<div className="flex-1 max-w-md">
					<div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20">
						{/* Header Section */}
						<div className="flex flex-col items-center p-8 pb-6">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
								Welcome Back
							</h2>
							<p className="text-sm text-gray-600 dark:text-gray-400 text-center">
								Sign in to your account to continue
							</p>
						</div>

						{/* Content Section */}
						<div className="px-8 pb-8">
							<Outlet />
						</div>
					</div>
				</div>
			</div>

			<style>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px) rotate(0deg);
					}
					50% {
						transform: translateY(-20px) rotate(180deg);
					}
				}
			`}</style>
		</div>
	);
}
