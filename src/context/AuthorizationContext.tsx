import { auth } from "@/firebase/config";
import { useAxios } from "@/hooks/useAxios";
import { IAuthContextValues, IUser } from "@/Types/IAuthorization";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTHORZATION_CONTEXT_DEFAULT_VALUES = {
	currentUser: null,
	googleAuthuser: null,
	setCurrentUser: () => {},
	loginUser: async () => {},
	logOut: async () => {},
};

export const AuthorizationContext = createContext<IAuthContextValues>(
	AUTHORZATION_CONTEXT_DEFAULT_VALUES
);

export const AuthorizationContextProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(
		JSON.parse(localStorage.getItem("user") || "null")
	);

	const [googleAuthuser, setGoogleAuthUser] = useState<any>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setGoogleAuthUser(user);
		});
		return () => unsubscribe();
	}, []);
	const navigate = useNavigate();

	const loginUser = async (data: { email: string; password: string }) => {
		try {
			const response = await useAxios.post("/auth/login", data, {
				withCredentials: true,
			});
			setCurrentUser(response.data.user._doc);
			localStorage.setItem(
				"user",
				JSON.stringify(response.data.user._doc)
			);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = async () => {
		try {
			await useAxios.post("/auth/logout");
			setCurrentUser(null);
			localStorage.removeItem("user");
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthorizationContext.Provider
			value={{ currentUser, loginUser, logOut, googleAuthuser }}
		>
			{children}
		</AuthorizationContext.Provider>
	);
};
