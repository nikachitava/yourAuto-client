import { AuthorizationContext } from "@/context/AuthorizationContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
	element: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	element: Component,
}) => {
	const { currentUser } = useContext(AuthorizationContext);

	return currentUser ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
