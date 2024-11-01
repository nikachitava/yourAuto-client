import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthorizationContext } from "@/context/AuthorizationContext";

const VehicleCard = () => {
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
				src="/images/bmw428.jpg"
				alt=""
				className="rounded-sm transition-transform duration-300 ease-in-out transform hover:scale-125"
			/>
			<div className="mt-4">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-bold">BMW 428</h1>
					<p>12.500$</p>
				</div>
				<hr />
				<div className="flex items-center gap-4 mt-2">
					<p className="text-[12px] px-4 py-2 bg-slate-300 rounded-xl text-black dark:bg-darkblack dark:text-greytext font-bold">
						CUV
					</p>
					<p className="text-[12px] px-4 py-2 bg-slate-300 rounded-xl text-black dark:bg-darkblack dark:text-greytext font-bold">
						Fuel
					</p>
					<p className="text-[12px] px-4 py-2 bg-slate-300 rounded-xl text-black dark:bg-darkblack dark:text-greytext font-bold">
						2018
					</p>
				</div>
			</div>
		</div>
	);
};

export default VehicleCard;
