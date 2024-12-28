import { AuthorizationContext } from "@/context/AuthorizationContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// interface ProtectedRouteProps {
// 	element: React.ComponentType;
// 	redirectTo?: string;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
// 	element: Component,
// 	redirectTo = "/",
// }) => {
// 	const { currentUser } = useContext(AuthorizationContext);
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		if (!currentUser) return navigate(redirectTo);
// 	}, [currentUser]);

// 	return <Component />;
// };

// export default ProtectedRoute;

const withAuth = ({ WrappedComponent }: any) => {
	const WithAuthComponent = () => {
		const { currentUser } = useContext(AuthorizationContext);
		const navigate = useNavigate();

		useEffect(() => {
			if (!currentUser) return navigate("/");
		}, [currentUser]);

		return currentUser ? <WrappedComponent /> : null;
	};
	return WithAuthComponent;
};

export default withAuth;
