import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE,
	headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
	(r) => r,
	(err) => {
		if (err.response && err.response.status === 401) {
			localStorage.removeItem("token");
			// optional: trigger page reload to force redirect
			window.location.href = "/login";
		}
		return Promise.reject(err);
	}
);

export default api;
