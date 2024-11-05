import { useContext, useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import { IVehicle } from "@/Types/IVehicle";
import { useAxios } from "@/hooks/useAxios";
import { Link } from "react-router-dom";
import { SearchFilterContext } from "@/context/SearchFilterContext";

const VehiclesContent = () => {
	const [vehicles, setVehicles] = useState<IVehicle[]>([]);

	useEffect(() => {
		const fetchVehicleData = async () => {
			try {
				const vehicleData = await useAxios.get("/vehicle");
				setVehicles(vehicleData.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchVehicleData();
	}, []);

	const {
		brand,
		model,
		status,
		minYear,
		maxYear,
		minPrice,
		maxPrice,
		fuelType,
	} = useContext(SearchFilterContext);

	const [filteredVehicles, setFilteredVehicles] = useState<IVehicle[]>([]);

	const filterVehicles = () => {
		let filtered = vehicles;

		if (brand) {
			filtered = filtered.filter((vehicle) => brand === vehicle.brand);
		}

		if (status) {
			filtered = filtered.filter((vehicle) => status === vehicle.status);
		}

		if (minYear != null && maxYear != null) {
			filtered = filtered.filter(
				(vehicle) =>
					Number(vehicle.year) >= minYear &&
					Number(vehicle.year) <= maxYear
			);
		}

		if (minPrice != null && maxPrice != null) {
			filtered = filtered.filter(
				(vehicle) =>
					Number(vehicle.price) >= minPrice &&
					Number(vehicle.price) <= maxPrice
			);
		}

		if (fuelType) {
			filtered = filtered.filter(
				(vehicle) => fuelType === vehicle.fuelType
			);
		}

		setFilteredVehicles(filtered);
	};

	useEffect(() => {
		filterVehicles();
	}, [
		brand,
		model,
		status,
		minYear,
		maxYear,
		minPrice,
		maxPrice,
		fuelType,
		vehicles,
	]);

	return (
		<div className="container my-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10">
			{filteredVehicles.length !== 0 ? (
				filteredVehicles.map((vehicle, index) => (
					<Link to={`/vehicle/${vehicle._id}`} key={index}>
						<VehicleCard
							owner={vehicle.owner}
							title={vehicle.title}
							brand={vehicle.brand}
							fuelType={vehicle.fuelType}
							price={vehicle.price}
							gearBox={vehicle.gearBox}
							image={vehicle.image}
						/>
					</Link>
				))
			) : (
				<h1>No vehicles founded for those filters!!!</h1>
			)}
		</div>
	);
};

export default VehiclesContent;
