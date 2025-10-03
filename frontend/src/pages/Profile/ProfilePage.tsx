import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, FileText, Save, Calendar } from "lucide-react";

export default function ProfilePage() {
	const { user, setUser } = useAuth();
	const [name, setName] = useState(user?.name || "");
	const [bio, setBio] = useState(user?.bio || "");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setName(user?.name || "");
		setBio(user?.bio || "");
	}, [user]);

	const save = async () => {
		setIsSubmitting(true);
		try {
			const res = await api.put("/users/profile", { name, bio });
			setUser(res.data);
			alert("Profile updated successfully!");
		} catch (err: any) {
			alert(err.response?.data?.message || "Failed to save profile.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto space-y-6">
			{/* Header */}
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
					Profile Settings
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					Manage your account information and preferences
				</p>
			</div>

			{/* Profile Card */}
			<div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
				{/* Avatar and Basic Info */}
				<div className="flex items-center space-x-4 mb-8">
					<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800">
						<span className="text-white font-bold text-2xl">
							{user?.name?.charAt(0).toUpperCase() || "U"}
						</span>
					</div>
					<div className="flex-1">
						<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
							{user?.name || "User"}
						</h2>

						{user?.createdAt && (
							<p className="text-gray-500 dark:text-gray-500 text-xs mt-1 flex items-center space-x-1">
								<Calendar className="w-3 h-3 z-10" />
								<span>
									Joined{" "}
									{new Date(
										user.createdAt
									).toLocaleDateString()}
								</span>
							</p>
						)}
					</div>
				</div>

				{/* Form */}
				<div className="space-y-6">
					{/* Name Field */}
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
							<User className="w-4 h-4 z-10" />
							<span>Full Name</span>
						</label>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							disabled={isSubmitting}
							className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
							placeholder="Enter your full name"
						/>
					</div>

					{/* Email Field (Read-only) */}
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
							<Mail className="w-4 h-4 z-10" />
							<span>Email Address</span>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								( Email address cannot be changed )
							</p>
						</label>
						<input
							value={user?.email || ""}
							readOnly
							className="w-full px-4 py-3 bg-gray-100/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 cursor-not-allowed backdrop-blur-sm"
						/>
					</div>

					{/* Bio Field */}
					<div className="space-y-2">
						<label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
							<FileText className="w-4 h-4 z-10" />
							<span>Bio</span>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								( Brief description for your profile )
							</p>
						</label>
						<textarea
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							disabled={isSubmitting}
							rows={4}
							className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none disabled:opacity-50"
							placeholder="Tell us a bit about yourself..."
						/>
					</div>

					{/* Save Button */}
					<button
						onClick={save}
						disabled={isSubmitting}
						className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
					>
						<Save className="w-5 h-5 z-10" />
						<span>
							{isSubmitting ? "Saving..." : "Save Changes"}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
