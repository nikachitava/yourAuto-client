import { IoClose } from "react-icons/io5";

interface IFilterItemProps {
	title: string | null | number;
	onClick?: () => void;
}

const FilterItem: React.FC<IFilterItemProps> = ({ title, onClick }) => {
	return (
		<div className="bg-slate-800 text-white px-6 py-2 rounded-md flex items-center gap-3 max-w-[500px]">
			{title}
			<IoClose size={20} className="cursor-pointer" onClick={onClick} />
		</div>
	);
};

export default FilterItem;
