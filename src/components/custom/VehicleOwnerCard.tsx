import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "../ui/label";

interface IVehicleOwnerCardProps {
	name: string;
	surname: string;
	phone: string;
}

const VehicleOwnerCard: React.FC<IVehicleOwnerCardProps> = ({
	name,
	surname,
	phone,
}) => {
	const [isNumberHide, setIsNumberHide] = useState(true);

	const handleIsNumberHide = () => {
		setIsNumberHide((isNumberHide) => !isNumberHide);
	};
	return (
		<div className="bg-[#F2f2f2] text-darkblack px-4 py-2 min-w-[200px] max-w-[500px] rounded-md">
			<h1>
				Owner: {name} {surname}
			</h1>
			<div className="flex justify-between items-end">
				<h2>Phone: {isNumberHide ? "*** ** ** **" : phone}</h2>
				<div className="flex items-center space-x-2">
					<Switch
						id="hide-number"
						checked={isNumberHide}
						onClick={handleIsNumberHide}
					/>
					<Label htmlFor="hide-number">
						{isNumberHide
							? "Show phone number"
							: "Hide phone number"}
					</Label>
				</div>
			</div>
		</div>
	);
};

export default VehicleOwnerCard;
