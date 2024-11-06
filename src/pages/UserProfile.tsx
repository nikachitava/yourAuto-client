import VehicleCard from "@/components/custom/VehicleCard";
import { useAxios } from "@/hooks/useAxios";
import { IVehicle } from "@/Types/IVehicle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
	const [vehicles, setVehicles] = useState<IVehicle[]>([]);

	const { id } = useParams();

	useEffect(() => {
		const fetchUservehicles = async () => {
			try {
				const vehicles = await useAxios.get(`/vehicle/owner/${id}`);
				setVehicles(vehicles.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUservehicles();
	}, [id]);

	return (
		<section className="container grid grid-cols-3 gap-8 mt-20">
			{vehicles.length === 0 ? (
				<h1>This user don't have any vehicle</h1>
			) : (
				vehicles.map((vehicle, index) => (
					<VehicleCard
						key={index}
						owner={vehicle.owner}
						title={vehicle.title}
						brand={vehicle.brand}
						fuelType={vehicle.fuelType}
						price={vehicle.price}
						gearBox={vehicle.gearBox}
						image={vehicle.image}
					/>
				))
			)}
		</section>
	);
};

export default UserProfile;
