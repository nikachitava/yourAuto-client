import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import { IVehicle } from "@/Types/IVehicle";
import { useAxios } from "@/hooks/useAxios";

const VehiclesContent = () => {
	const [vehicles, setVehicles] = useState<IVehicle[] | null>(null);

	useEffect(() => {
		const fetchVehicleData = async () => {
			try {
				const vehicleData = await useAxios.get("/vehicle");
				setVehicles(vehicleData.data);
				console.log(vehicleData.data);
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
					<VehicleCard
						key={index}
						title={vehicle.title}
						brand={vehicle.brand}
						fuelType={vehicle.fuelType}
						price={vehicle.price}
						gearBox={vehicle.gearBox}
						image={vehicle.image}
					/>
				))}
		</div>
	);
};

export default VehiclesContent;
