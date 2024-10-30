import LoginForm from "@/components/custom/LoginForm";
import RegistrationForm from "@/components/custom/RegistrationForm";
import { useState } from "react";

const Auth = () => {
	const [isLoginPage, setIsLoginPage] = useState(true);

	const handleLoginPage = () => {
		setIsLoginPage((isLoginPage) => !isLoginPage);
	};

	return (
		<div>
			{isLoginPage ? (
				<LoginForm handleLoginPage={handleLoginPage} />
			) : (
				<RegistrationForm handleLoginPage={handleLoginPage} />
			)}
		</div>
	);
};

export default Auth;
