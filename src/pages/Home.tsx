import SearchFilter from "@/components/custom/SearchFilter";
import VehiclesContent from "@/components/custom/VehiclesContent";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import { useContext } from "react";

const Home = () => {
	const { currentUser } = useContext(AuthorizationContext);
	return (
		<div>
			{currentUser && (
				<h1 className="text-white">Hello, {currentUser.name}</h1>
			)}
			<SearchFilter />
			<VehiclesContent />
		</div>
	);
};

export default Home;
