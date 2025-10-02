import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
	const { user, setUser } = useAuth();
	const [name, setName] = useState(user?.name || "");
	const [bio, setBio] = useState(user?.bio || "");

	useEffect(() => {
		setName(user?.name || "");
		setBio(user?.bio || "");
	}, [user]);

	const save = async () => {
		try {
			const res = await api.put("/users/profile", { name, bio });
			setUser(res.data);
			alert("Saved");
		} catch (err: any) {
			alert(err.response?.data?.message || "Failed");
		}
	};

	return (
		<div className="bg-white p-6 rounded shadow max-w-2xl">
			<h2 className="text-lg font-semibold mb-4">Profile</h2>
			<label className="block mb-3">
				<span className="text-sm">Name</span>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="mt-1 block w-full rounded border-gray-300"
				/>
			</label>
			<label className="block mb-3">
				<span className="text-sm">Bio</span>
				<textarea
					value={bio}
					onChange={(e) => setBio(e.target.value)}
					className="mt-1 block w-full rounded border-gray-300"
				/>
			</label>
			<button
				onClick={save}
				className="bg-indigo-600 text-white px-4 py-2 rounded"
			>
				Save
			</button>
		</div>
	);
}
