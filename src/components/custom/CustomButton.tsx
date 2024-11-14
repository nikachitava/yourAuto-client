interface ICustomButton {
	title: string;
	onClick: () => void;
	otherStyles?: string;
}

const CustomButton: React.FC<ICustomButton> = ({
	title,
	onClick,
	otherStyles,
}) => {
	return (
		<div
			className={`cursor-pointer text-center bg-black text-white py-4 px-8 rounded-md ${otherStyles}`}
			onClick={onClick}
		>
			{title}
		</div>
	);
};

export default CustomButton;
