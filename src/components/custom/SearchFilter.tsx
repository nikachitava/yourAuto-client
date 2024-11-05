import { useContext } from "react";
import DropDown from "./Dropdown/DropDown";
import DropDownInputValues from "./Dropdown/PriceContent";
import BrandContent from "./Dropdown/BrandContent";
import { SearchFilterContext } from "@/context/SearchFilterContext";
import ModelsContent from "./Dropdown/ModelsContent";
import CarStatusContent from "./Dropdown/CarStatusContent";
import YearContent from "./Dropdown/YearContent";
import FuelTypeContent from "./Dropdown/FuelTypeContent";
import { carStatus, fuelTypes, vehicleBrands } from "@/data/VehiclesStaticData";

const SearchFilter = () => {
	const {
		brand,
		model,
		status,
		minYear,
		maxYear,
		minPrice,
		maxPrice,
		fuelType,
	} = useContext(SearchFilterContext);

	return (
		<div className="container mt-10 max-w-full">
			<div className="bg-white dark:bg-[var(--background)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 rounded-xl shadow-md dark:border-2 dark:border-white">
				<DropDown title={"Brand"}>
					<BrandContent content={vehicleBrands} />
				</DropDown>

				<DropDown title={"Model"}>
					<ModelsContent content={vehicleBrands} />
				</DropDown>

				<DropDown title="Status">
					<CarStatusContent content={carStatus} />
				</DropDown>

				<DropDown title="Fuel">
					<FuelTypeContent content={fuelTypes} />
				</DropDown>

				<DropDown title="Year">
					<YearContent />
				</DropDown>

				<DropDown title="Price">
					<DropDownInputValues />
				</DropDown>
			</div>
			<div>
				Selected Items: {brand}
				{model}
				{status}
				{minYear}
				{maxYear}
				{minPrice}
				{maxPrice}
				{fuelType}
			</div>
		</div>
	);
};

export default SearchFilter;
