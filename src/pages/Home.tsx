import SearchFilter from "@/components/custom/SearchFilter";
import VehiclesContent from "@/components/custom/VehiclesContent";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import { useContext } from "react";

const Home = () => {
	const { currentUser } = useContext(AuthorizationContext);
	return (
		<div>
			<div className="container mt-8">
				{currentUser && (
					<h1 className="dark:text-white text-2xl text-darktext font-bold">
						Welcome back, {currentUser.name}
					</h1>
				)}
			</div>
			<SearchFilter />
			<VehiclesContent />
		</div>
	);
};

export default Home;
