import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import { IVehicleCardProps } from "@/Types/IVehicle";

const VehicleCard: React.FC<IVehicleCardProps> = ({
	title,
	brand,
	fuelType,
	price,
	gearBox,
	mileage,
	image,
}) => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const { currentUser } = useContext(AuthorizationContext);

	const handleCardClick = () => {
		if (!currentUser) {
			toast({
				title: "You need to login first",
				action: (
					<ToastAction
						altText={"Login"}
						onClick={() => navigate("/login")}
					>
						Login
					</ToastAction>
				),
			});
		}
	};

	return (
		<div
			className="w-[327px] rounded-md overflow-hidden"
			onClick={handleCardClick}
		>
			<img
				src={image}
				alt={image}
				className="w-full h-[218px] object-fill"
			/>
			<div className="flex flex-col gap-4 px-8 py-4 border-[1px] border-[#E9E9E9]">
				<h1 className="text-lg font-medium ">
					{title.substring(0, 25)}
				</h1>
				<h3>{brand}</h3>
				<div className="flex h-[1px] bg-[#E9E9E9]"></div>
				<div className="flex items-center justify-between">
					<div className="flex flex-col items-center gap-2 justify-center">
						<img src="/images/icons/mileage.svg" />
						<h4>{mileage.slice(0, mileage.indexOf("(")).trim()}</h4>
					</div>
					<div className="flex flex-col items-center gap-2 justify-center">
						<img src="/images/icons/fuel.svg" />
						<h4>
							{fuelType.slice(0, fuelType.indexOf("(")).trim()}
						</h4>
					</div>
					<div className="flex flex-col items-center gap-2 justify-center">
						<img src="/images/icons/transmision.svg" />
						<h4>{gearBox.slice(0, gearBox.indexOf("(")).trim()}</h4>
					</div>
				</div>
				<div className="flex h-[1px] bg-[#E9E9E9]"></div>
				<div className="flex items-center justify-between">
					<h2 className="font-bold text-xl">${price}</h2>
					<div className="flex items-center gap-2">
						<span className="text-[#405FF2] font-medium">
							View Details
						</span>
						<img src="/images/icons/arrow.svg" alt="arrow.svg" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default VehicleCard;
