import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
	email: z.email(),
	password: z.string().min(6),
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

	const onSubmit = async (data: FormType) => {
		try {
			const res = await api.post("/auth/login", data);
			const token = res.data.token;
			login(token);
			navigate("/");
		} catch (err: any) {
			alert(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-white shadow rounded p-6"
		>
			<h2 className="text-lg font-medium mb-4">Sign in to TaskFlow</h2>
			<label className="block mb-3">
				<span className="text-sm">Email</span>
				<input
					className="mt-1 block w-full rounded border-gray-300"
					{...register("email")}
				/>
				<p className="text-xs text-red-500">
					{errors.email?.message as string}
				</p>
			</label>

			<label className="block mb-3">
				<span className="text-sm">Password</span>
				<input
					type="password"
					className="mt-1 block w-full rounded border-gray-300"
					{...register("password")}
				/>
				<p className="text-xs text-red-500">
					{errors.password?.message as string}
				</p>
			</label>

			<button
				disabled={isSubmitting}
				className="w-full bg-indigo-600 text-white py-2 rounded"
			>
				Sign in
			</button>

			<div className="mt-3 text-sm text-gray-500">
				No account?{" "}
				<Link to="/signup" className="text-indigo-600">
					Sign up
				</Link>
			</div>
		</form>
	);
}
