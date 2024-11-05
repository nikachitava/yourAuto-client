import { IoClose } from "react-icons/io5";

interface IFilterItemProps {
	title: string | null | number;
}

const FilterItem: React.FC<IFilterItemProps> = ({ title }) => {
	return (
		<div className="bg-red-400 px-6 py-2 rounded-md flex items-center gap-3 max-w-[500px]">
			{title}
			<IoClose size={20} className="cursor-pointer" />
		</div>
	);
};

export default FilterItem;
