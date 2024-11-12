import { IoClose } from "react-icons/io5";

interface IFilterItemProps {
	title: string | null | number;
	onClick?: () => void;
}

const FilterItem: React.FC<IFilterItemProps> = ({ title, onClick }) => {
	return (
		<div className="bg-white text-mainColor px-2 rounded-3xl flex items-center gap-1 text-[12]">
			{title}
			<IoClose size={15} className="cursor-pointer" onClick={onClick} />
		</div>
	);
};

export default FilterItem;
