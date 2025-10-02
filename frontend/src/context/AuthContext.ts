import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

type AuthContextType = {
	token: string | null;
	user: any | null;
	login: (token: string) => void;
	logout: () => void;
	setUser: (u: any) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [token, setToken] = useState<string | null>(() =>
		localStorage.getItem("token")
	);
	const [user, setUser] = useState<any | null>(null);

	useEffect(() => {
		if (token) {
			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			// fetch profile
			api.get("/users/profile")
				.then((res) => setUser(res.data))
				.catch(() => {
					// invalid token
					setToken(null);
					localStorage.removeItem("token");
					delete api.defaults.headers.common["Authorization"];
				});
		} else {
			delete api.defaults.headers.common["Authorization"];
		}
	}, [token]);

	const login = (t: string) => {
		setToken(t);
		localStorage.setItem("token", t);
	};
	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
		delete api.defaults.headers.common["Authorization"];
	};

	return React.createElement(
		AuthContext.Provider,
		{ value: { token, user, login, logout, setUser } },
		children
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
};
