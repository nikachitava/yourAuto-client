import SearchFilter from "@/components/custom/SearchFilter";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import React, { Suspense } from "react";
import { useContext } from "react";

const LazyVehiclesContent = React.lazy(
	() => import("@/components/custom/VehiclesContent")
);

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
			<Suspense fallback={<div>Loading Vehicles...</div>}>
				<LazyVehiclesContent />
			</Suspense>
		</div>
	);
};

export default Home;
