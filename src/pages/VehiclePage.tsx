import CarOverviewItem from "@/components/custom/CarOverviewItem";
import VehicleOwnerCard from "@/components/custom/VehicleOwnerCard";
import VehicleTagBar from "@/components/custom/VehicleTagBar";
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

	const imagePaths = vehicle?.image;

	const deleteVehicle = async () => {
		if (!isOwner) return;

		try {
			await useAxios.delete(`/vehicle/${id}`);

			if (imagePaths && imagePaths.length > 0) {
				await Promise.all(
					imagePaths.map((imagePath) => deleteImage(imagePath))
				);
			}

			navigate("/");
		} catch (error) {
			console.error("Error deleting vehicle or images:", error);
			toast({
				title: "Failed to delete vehicle",
				variant: "destructive",
			});
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

	const formatPrice = (price: string) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(Number(price));
	};

	if (!vehicle) return null;

	return (
		<div className="w-full bg-white rounded-3xl">
			<div className="container flex flex-col justify-center my-10 py-40 space-y-10">
				{isOwner && (
					<div className="bg-red-600 px-6 py-4 space-y-2 rounded-md shadow-md">
						<h3 className="text-white font-medium">
							It's your vehicle, you can edit or delete listing
						</h3>
						<div className="space-x-5">
							<Button onClick={editVehicle}>EDIT</Button>
							<Button onClick={deleteVehicle}>DELETE</Button>
						</div>
					</div>
				)}
				<div className="space-y-4 flex flex-col items-start justify-between xl:flex-row xl:items-center">
					<div className="space-y-4">
						<h1 className="text-mainColor font-bold text-5xl">
							{vehicle.title}
						</h1>
						<div className="space-x-3">
							<VehicleTagBar
								image="/images/icons/year.svg"
								title={vehicle.year}
							/>
							<VehicleTagBar
								image="/images/icons/mileage.svg"
								title={vehicle.mileage}
							/>
							<VehicleTagBar
								image="/images/icons/transmision.svg"
								title={vehicle.gearBox}
							/>
							<VehicleTagBar
								image="/images/icons/fuel.svg"
								title={vehicle.fuelType}
							/>
							<VehicleTagBar
								image="/images/icons/body.svg"
								title={vehicle.model}
							/>
						</div>
					</div>
					<h1 className="text-mainColor font-bold text-4xl">
						{formatPrice(vehicle.price)}
					</h1>
				</div>
				<div className="grid grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr] gap-4">
					{/* Main Image */}
					{vehicle.image && vehicle.image[0] && (
						<img
							src={vehicle.image[0]}
							alt="Main Vehicle"
							className="col-span-2 xl:col-span-2 row-span-2 object-cover size-full"
						/>
					)}

					{/* Additional Images */}
					{vehicle.image?.slice(1).map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Additional Image ${index + 1}`}
							className="object-cover size-full"
						/>
					))}
				</div>

				<div className="flex flex-col-reverse 2xl:flex-row gap-20">
					<div>
						<h1 className="text-mainColor font-medium text-2xl mb-8">
							Car Overview
						</h1>
						{/* <div className="max-w-[1000px] flex flex-col xl:flex-row xl:items-center justify-between gap-10 bg-green-500"> */}
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-10">
							{/* Left Column */}
							<div className="space-y-3">
								<CarOverviewItem
									image="/images/icons/body.svg"
									header="Body"
									title={vehicle.type}
								/>

								<CarOverviewItem
									image="/images/icons/mileage.svg"
									header="Mileage"
									title={vehicle.mileage}
								/>
								<CarOverviewItem
									image="/images/icons/fuel.svg"
									header="Fuel Type"
									title={vehicle.type}
								/>
								<CarOverviewItem
									image="/images/icons/year.svg"
									header="Year"
									title={vehicle.year}
								/>
								<CarOverviewItem
									image="/images/icons/transmision.svg"
									header="Transmision"
									title={vehicle.gearBox}
								/>
								<CarOverviewItem
									image="/images/icons/driveType.svg"
									header="Drive Type"
									title={vehicle.type}
								/>
							</div>

							{/* Middle Column */}
							<div className="space-y-3">
								<CarOverviewItem
									image="/images/icons/condition.svg"
									header="Condition"
									title={vehicle.condition}
								/>
								<CarOverviewItem
									image="/images/icons/engine.svg"
									header="Engine"
									title={vehicle.engine}
								/>
								<CarOverviewItem
									image="/images/icons/door.svg"
									header="Door"
									title={vehicle.door}
								/>
								<CarOverviewItem
									image="/images/icons/cylinder.svg"
									header="Cylinder"
									title={vehicle.cylinder}
								/>
								<CarOverviewItem
									image="/images/icons/color.svg"
									header="Color"
									title={vehicle.color}
								/>
								<CarOverviewItem
									image="/images/icons/vin.svg"
									header="VIN"
									title={vehicle.vin}
								/>
							</div>

							{/* Right Column */}
							<div className="flex flex-col items-center justify-between">
								<VehicleOwnerCard
									userID={vehicle.owner._id}
									name={vehicle.owner.name}
									surname={vehicle.owner.surname}
									phone={vehicle.owner.phone}
								/>
							</div>
						</div>

						<div className="mt-10 break-all">
							<h1 className="text-mainColor font-medium text-2xl mb-8">
								Description
							</h1>
							<p className="break-all">
								{vehicle.description}
								asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdjaksdkasjdajksdnajskdansjkdnaskjdansjkdnasjdnajsdasndjasnduib
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VehiclePage;
