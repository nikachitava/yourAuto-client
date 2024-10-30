import { IAuthContextValues, IUser } from "@/Types/IAuthorization";
import { createContext, ReactNode, useState } from "react";

const AUTHORZATION_CONTEXT_DEFAULT_VALUES = {
	currentUser: null,
	setCurrentUser: () => {},
};

export const AuthorizationContext = createContext<IAuthContextValues>(
	AUTHORZATION_CONTEXT_DEFAULT_VALUES
);

export const AuthorizationContextProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);

	return (
		<AuthorizationContext.Provider value={{ currentUser }}>
			{children}
		</AuthorizationContext.Provider>
	);
};
