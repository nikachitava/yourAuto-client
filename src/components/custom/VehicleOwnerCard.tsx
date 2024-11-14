import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import VehicleTagBar from "./VehicleTagBar";
import CustomButton from "./CustomButton";

interface IVehicleOwnerCardProps {
	userID: string;
	name: string;
	surname: string;
	phone: string;
}

const VehicleOwnerCard: React.FC<IVehicleOwnerCardProps> = ({
	userID,
	name,
	surname,
	phone,
}) => {
	const [isNumberHide, setIsNumberHide] = useState(true);

	const handleIsNumberHide = () => {
		setIsNumberHide((isNumberHide) => !isNumberHide);
	};

	const maskPhoneNumber = (phoneNumber: string) =>
		"*".repeat(phoneNumber.length);

	return (
		<div className="max-w-[400px] bg-white rounded-2xl border-[1px] border-[#E9E9E9] p-8 space-y-4">
			<div>
				<img src="/images/icon.svg" />
			</div>
			<h1 className="text-mainColor font-medium">
				{name} {surname}
			</h1>
			<div className="grid grid-cols-2 gap-1">
				<VehicleTagBar
					image="/images/icons/location.svg"
					title={"Get Direction"}
					otherStyles="!px-4 !py-2"
				/>

				<VehicleTagBar
					image="/images/icons/phone.svg"
					title={isNumberHide ? maskPhoneNumber(phone) : phone}
					otherStyles="!px-4 !py-2"
				/>
			</div>
			<div className="flex items-center justify-end gap-2">
				<Switch
					id="hide-number"
					checked={isNumberHide}
					onClick={handleIsNumberHide}
				/>
				<Label htmlFor="hide-number" className="text-mainColor">
					{isNumberHide ? "Show phone number" : "Hide phone number"}
				</Label>
			</div>
			<CustomButton
				title={"Message Dealer"}
				onClick={() => console.log("Asd")}
				otherStyles="bg-buttonColor"
			/>
			<Link to={`/profile/${userID}`}>
				<p className="text-mainColor text-center mt-4 underline">
					View all stocks at this dealer
				</p>
			</Link>
		</div>
	);
};

export default VehicleOwnerCard;
