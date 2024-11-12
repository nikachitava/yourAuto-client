import SearchFilter from "@/components/custom/SearchFilter";
import VehiclesContent from "@/components/custom/VehiclesContent";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import { useContext } from "react";

const Home = () => {
	const { currentUser } = useContext(AuthorizationContext);
	return (
		<div>
			<div className="container my-8">
				{currentUser && (
					<h1 className="text-white text-2xl  font-bold">
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
