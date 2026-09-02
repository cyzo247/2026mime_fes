import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "mime.auth";

const readAuth = () => {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch (error) {
		return null;
	}
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => readAuth());

	useEffect(() => {
		try {
			if (user) {
				window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
			} else {
				window.localStorage.removeItem(STORAGE_KEY);
			}
		} catch (error) {
			/* 저장 실패는 무시 (시크릿 모드 등) */
		}
	}, [user]);

	const login = (email) => setUser({ email });
	const logout = () => setUser(null);

	return (
		<AuthContext.Provider
			value={{ user, isLoggedIn: Boolean(user), login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
