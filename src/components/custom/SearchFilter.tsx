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
		<div className="container flex flex-col items-center  justify-center">
			<div className="max-w-[1170px] grid grid-cols-2 w-full gap-10 p-6 xl:flex xl:items-center xl:justify-between xl:gap-0 xl:p-3 bg-white rounded-[80px]">
				<DropDown title={"Brand"}>
					<BrandContent content={vehicleBrands} />
				</DropDown>
				<div className="h-[50px] w-[1px] bg-[#E9E9E9] hidden xl:block"></div>
				<DropDown title={"Model"} disabled={brand ? false : true}>
					<ModelsContent content={modelOptions} />
				</DropDown>
				<div className="h-[50px] w-[1px] bg-[#E9E9E9] hidden xl:block"></div>
				<DropDown title="Status">
					<CarStatusContent content={carStatus} />
				</DropDown>
				<div className="h-[50px] w-[1px] bg-[#E9E9E9] hidden xl:block"></div>
				<DropDown title="Fuel">
					<FuelTypeContent content={fuelTypes} />
				</DropDown>
				<div className="h-[50px] w-[1px] bg-[#E9E9E9] hidden xl:block"></div>
				<DropDown title="Year">
					<YearContent />
				</DropDown>
				<div className="h-[50px] w-[1px] bg-[#E9E9E9] hidden xl:block"></div>
				<DropDown title="Price">
					<DropDownInputValues />
				</DropDown>
			</div>
			<div className="mt-2 px-4">
				<FilterBar />
			</div>
		</div>
	);
};

export default SearchFilter;
