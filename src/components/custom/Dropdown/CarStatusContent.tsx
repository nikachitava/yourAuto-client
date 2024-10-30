import { SearchFilterContext } from "@/context/SearchFilterContext";
import { useContext } from "react";

interface IDropDownRatioItemProps {
	content: string[];
}

const CarStatusContent: React.FC<IDropDownRatioItemProps> = ({ content }) => {
	const { setStatus } = useContext(SearchFilterContext);

	const handleStatus = (status: string) => {
		setStatus(status);
	};

	return (
		<div className="absolute min-h-20 max-h-60  bg-[#ffffff] w-full top-[60px] left-0 flex flex-col gap-4 z-10 dark:bg-[#353535] ">
			<div className="overflow-auto">
				{content &&
					content.map((item, index) => (
						<div
							key={index}
							className="p-2 cursor-pointer"
							onClick={() => handleStatus(item)}
						>
							{item}
						</div>
					))}
			</div>
		</div>
	);
};

export default CarStatusContent;
