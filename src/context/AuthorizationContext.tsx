import { useAxios } from "@/hooks/useAxios";
import { IAuthContextValues, IUser } from "@/Types/IAuthorization";
import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

const AUTHORZATION_CONTEXT_DEFAULT_VALUES = {
	currentUser: null,
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
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);

	const navigate = useNavigate();

	const loginUser = async (data: { email: string; password: string }) => {
		try {
			const response = await useAxios.post("/auth/login", data, {
				withCredentials: true,
			});
			setCurrentUser(response.data.user._doc);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = async () => {
		try {
			await useAxios.post("/auth/logout");
			setCurrentUser(null);
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthorizationContext.Provider
			value={{ currentUser, loginUser, logOut }}
		>
			{children}
		</AuthorizationContext.Provider>
	);
};
