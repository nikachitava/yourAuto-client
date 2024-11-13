import VehicleOwnerCard from "@/components/custom/VehicleOwnerCard";
import { Button } from "@/components/ui/button";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import { deleteImage } from "@/firebase/deleteImage";
import { toast } from "@/hooks/use-toast";
import { useAxios } from "@/hooks/useAxios";
import { IVehicle } from "@/Types/IVehicle";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VehiclePage = () => {
	const [vehicle, setVehicle] = useState<IVehicle | null>(null);
	const { id } = useParams();
	const navigate = useNavigate();

	const { currentUser } = useContext(AuthorizationContext);

	const isOwner = currentUser?._id === vehicle?.owner._id;
	const imagePath = vehicle?.image;

	const deleteVehicle = async () => {
		if (!isOwner) return;

		try {
			await useAxios.delete(`/vehicle/${id}`);
			if (imagePath) await deleteImage(imagePath);
			navigate("/");
			toast({
				title: "Vehicle deleted successfully",
			});
		} catch (error) {
			console.log(error);
		}
	};

	const editVehicle = () => {
		if (!isOwner) return;
		navigate(`/editvehicle/${id}`);
	};

	useEffect(() => {
		const fetchVehicleData = async () => {
			try {
				const vehicleData = await useAxios.get(`/vehicle/${id}`);
				setVehicle(vehicleData.data);
			} catch (error) {
				console.log(error);
			}
		};

		if (id) fetchVehicleData();
		else navigate("/");
	}, []);

	if (!vehicle) return null;

	return (
		<div className="container mt-10">
			{isOwner && (
				<div className="my-10">
					<h1>It's your vehicle</h1>
					<div className="flex gap-4 items-center mt-2">
						<Button onClick={editVehicle}>EDIT</Button>
						<Button onClick={deleteVehicle}>DELETE</Button>
					</div>
				</div>
			)}

			<div className="flex flex-col gap-4 lg:flex-row">
				<img
					src={vehicle.image}
					alt=""
					className="rounded-sm flex-1 max-h-[400px] shadow-2xl"
				/>
				<div className="flex-1 flex flex-col space-y-2 justify-between">
					<h1 className="text-2xl font-bold text-white">
						{vehicle.title}
					</h1>

					<h1 className="text-3xl font-bold text-white">
						{vehicle.price}$
					</h1>

					<h1 className="text-white">
						Factory Year:{" "}
						<span className="text-lg font-bold text-white">
							{vehicle.year}
						</span>
					</h1>
					<h1 className="text-white">
						GearBox:{" "}
						<span className="text-lg font-bold text-white">
							{vehicle.gearBox}
						</span>
					</h1>
					<h1 className="text-white">
						Fuel Type:{" "}
						<span className="text-lg font-bold text-white">
							{vehicle.fuelType}
						</span>
					</h1>
					<h1 className="text-white">
						Mileage:{" "}
						<span className="text-lg font-bold text-white">
							{vehicle.mileage}
						</span>
					</h1>
					<h1 className="text-white">
						Engine:{" "}
						<span className="text-lg font-bold text-white">
							{vehicle.engine}
						</span>
					</h1>
					<VehicleOwnerCard
						userID={vehicle.owner._id}
						name={vehicle.owner.name}
						surname={vehicle.owner.surname}
						phone={vehicle.owner.phone}
					/>
				</div>
			</div>
			<div className="mt-8">
				<h1 className="text-white">
					Description: <span>{vehicle.description}</span>
				</h1>
			</div>
		</div>
	);
};

export default VehiclePage;
