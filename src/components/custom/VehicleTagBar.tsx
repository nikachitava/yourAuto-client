interface IVehicleTagBarProps {
	image: string;
	title: string;
	onClick?: () => void;
}

const VehicleTagBar: React.FC<IVehicleTagBarProps> = ({
	image,
	title,
	onClick,
}) => {
	return (
		<div
			className="inline-flex items-center gap-2 bg-[#E9F2FF] px-5 py-3 rounded-3xl cursor-pointer"
			onClick={onClick}
		>
			<img src={image} alt={image} className="filter-blue" />
			<span className="text-[#405FF2] font-medium">{title}</span>
		</div>
	);
};

export default VehicleTagBar;
