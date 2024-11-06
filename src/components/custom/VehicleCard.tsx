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
			className="w-full md:min-w-[400px] lg:max-w-[550px] bg-white p-4 rounded-md cursor-pointer  dark:bg-lightblack dark:text-greytext"
			onClick={handleCardClick}
		>
			<img
				src={`http://localhost:3000${image}`}
				alt=""
				className="rounded-sm transition-transform duration-300 ease-in-out transform hover:scale-125 w-full h-[300px]"
			/>
			<div className="mt-4">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-bold">{title}</h1>
					<p>{price}$</p>
				</div>
				<hr />
				<div className="flex items-center gap-4 mt-2">
					<p className="text-[12px] px-4 py-2 bg-slate-300  rounded-xl text-black dark:bg-darkblack dark:text-greytext font-bold">
						{brand}
					</p>
					<p className="text-[12px] px-4 py-2 bg-slate-300 rounded-xl text-black dark:bg-darkblack dark:text-greytext font-bold">
						{fuelType}
					</p>
					<p className="text-[12px] px-4 py-2 bg-slate-300 rounded-xl text-black dark:bg-darkblack dark:text-greytext font-bold">
						{gearBox}
					</p>
				</div>
			</div>
		</div>
	);
};

export default VehicleCard;
