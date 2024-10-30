interface ICustomButton {
	title: string;
	onClick: () => void;
}

const CustomButton: React.FC<ICustomButton> = ({ title, onClick }) => {
	return (
		<div
			className="cursor-pointer text-center bg-black text-white py-4 px-8 rounded-md"
			onClick={onClick}
		>
			{title}
		</div>
	);
};

export default CustomButton;
