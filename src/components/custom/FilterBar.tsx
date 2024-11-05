import { SearchFilterContext } from "@/context/SearchFilterContext";
import { useContext } from "react";
import FilterItem from "./FilterItem";

const FilterBar = () => {
	const {
		brand,
		model,
		status,
		minYear,
		maxYear,
		minPrice,
		maxPrice,
		fuelType,
		clearBrand,
		clearModel,
		clearStatus,
		clearYears,
		clearPrices,
		clearFuelType,
	} = useContext(SearchFilterContext);
	return (
		<div className="flex items-center gap-4">
			{brand && <FilterItem title={brand} onClick={clearBrand} />}
			{model && <FilterItem title={model} onClick={clearModel} />}
			{status && <FilterItem title={status} onClick={clearStatus} />}
			{fuelType && <FilterItem title={status} onClick={clearFuelType} />}
			{minYear && maxYear && (
				<FilterItem
					title={`${minYear} - ${maxYear}`}
					onClick={clearYears}
				/>
			)}
			{minPrice && maxPrice && (
				<FilterItem
					title={`${minPrice} - ${maxPrice}`}
					onClick={clearPrices}
				/>
			)}
		</div>
	);
};

export default FilterBar;
