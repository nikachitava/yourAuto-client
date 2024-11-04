import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import { IVehicle } from "@/Types/IVehicle";
import { useAxios } from "@/hooks/useAxios";
import { Link } from "react-router-dom";

const VehiclesContent = () => {
	const [vehicles, setVehicles] = useState<IVehicle[] | null>(null);

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

	return (
		<div className="container my-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10">
			{vehicles &&
				vehicles.map((vehicle, index) => (
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
				))}
		</div>
	);
};

export default VehiclesContent;
