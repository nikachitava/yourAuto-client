import { Outlet } from "react-router-dom";
import { layoutProps } from "../Types/layoutProps";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

export const DefaultLayout: React.FC<layoutProps> = ({ children }) => {
	return (
		<section className="min-h-screen ">
			<NavBar />
			<Outlet />
			{children}
			<Footer />
		</section>
	);
};
