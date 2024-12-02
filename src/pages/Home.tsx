import SearchFilter from "@/components/custom/SearchFilter";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import { useAxios } from "@/hooks/useAxios";
import React, { Suspense, useEffect, useRef } from "react";
import { useContext } from "react";

const LazyVehiclesContent = React.lazy(
	() => import("@/components/custom/VehiclesContent")
);

const Home = () => {
	const { currentUser } = useContext(AuthorizationContext);

	const sendRequest = async () => {
		try {
			await useAxios.get("https://yourauto-server.onrender.com");
		} catch (error) {
			console.error("Error sending API request:", error);
		}
	};

	useEffect(() => {
		sendRequest();

		const intervalId = setInterval(sendRequest, 600000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		const sendApiRequest = async () => {
			try {
				await useAxios.get("https://yourauto-server.onrender.com");
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		sendApiRequest();

		const intervalId = setInterval(sendApiRequest, 10 * 60 * 1000);

		return () => clearInterval(intervalId);
	}, []);
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
