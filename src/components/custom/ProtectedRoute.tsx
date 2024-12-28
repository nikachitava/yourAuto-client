import { AuthorizationContext } from "@/context/AuthorizationContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
	element: React.ComponentType;
	redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	element: Component,
	redirectTo = "/",
}) => {
	const { currentUser } = useContext(AuthorizationContext);

	if (currentUser === undefined) {
		return <div>Loading...</div>;
	}
	return currentUser ? <Component /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
