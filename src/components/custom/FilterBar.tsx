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
	} = useContext(SearchFilterContext);
	return (
		<div className="flex items-center gap-4">
			{brand && <FilterItem title={brand} />}
			{model && <FilterItem title={model} />}
			{status && <FilterItem title={status} />}
			{fuelType && <FilterItem title={status} />}
			{minYear && maxYear && (
				<FilterItem title={`${minYear} - ${maxYear}`} />
			)}
			{minPrice && maxPrice && (
				<FilterItem title={`${minPrice} - ${maxPrice}`} />
			)}
		</div>
	);
};

export default FilterBar;
