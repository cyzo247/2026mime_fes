import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, newSession) => {
			setSession(newSession);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signup = (email, password) =>
		supabase.auth.signUp({ email, password });

	const login = (email, password) =>
		supabase.auth.signInWithPassword({ email, password });

	const logout = () => supabase.auth.signOut();

	return (
		<AuthContext.Provider
			value={{
				session,
				user: session?.user ?? null,
				isLoggedIn: Boolean(session),
				loading,
				signup,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
