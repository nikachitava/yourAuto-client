import { Outlet } from "react-router-dom";
import { layoutProps } from "../Types/layoutProps";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const AuthLayout: React.FC<layoutProps> = ({ children }) => {
	return (
		<div className="relative min-h-screen flex items-center justify-center">
			<Link to={"/"}>
				<IoMdArrowRoundBack
					size={24}
					color="white"
					className="absolute top-10 left-20"
				/>
			</Link>
			<Outlet />
			{children}
		</div>
	);
};

export default AuthLayout;
