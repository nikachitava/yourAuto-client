import DropDown from "./Dropdown/DropDown";
import DropDownInputValues from "./Dropdown/PriceContent";
import BrandContent from "./Dropdown/BrandContent";
import ModelsContent from "./Dropdown/ModelsContent";
import CarStatusContent from "./Dropdown/CarStatusContent";
import YearContent from "./Dropdown/YearContent";
import FuelTypeContent from "./Dropdown/FuelTypeContent";
import {
	carStatus,
	fuelTypes,
	vehicleBrands,
	vehicleModels,
} from "@/data/VehiclesStaticData";
import FilterBar from "./FilterBar";
import { useContext, useEffect, useState } from "react";
import { VehicleBrands } from "@/Types/IVehicle";
import { SearchFilterContext } from "@/context/SearchFilterContext";

const SearchFilter = () => {
	const [modelOptions, setModelOptions] = useState<string[]>([]);

	const { brand } = useContext(SearchFilterContext);

	useEffect(() => {
		if (brand) {
			setModelOptions(vehicleModels[brand as VehicleBrands]);
		} else {
			setModelOptions([]);
		}
	}, [brand]);

	return (
		<div className="container mt-10 max-w-full ">
			<div className="dark:border-2 dark:border-white p-10 rounded-xl shadow-md ">
				<div className="bg-white dark:bg-[var(--background)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
					<DropDown title={"Brand"}>
						<BrandContent content={vehicleBrands} />
					</DropDown>

					<DropDown title={"Model"} disabled={brand ? false : true}>
						<ModelsContent content={modelOptions} />
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
				<div className="mt-6">
					<FilterBar />
				</div>
			</div>
		</div>
	);
};

export default SearchFilter;
