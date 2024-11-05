export interface ISearchFilterContext {
	brand: null | string;
	model: null | string;
	status: null | string;
	minYear: null | number;
	maxYear: null | number;
	minPrice: null | number;
	maxPrice: null | number;
	fuelType: null | string;

	setBrand: React.Dispatch<React.SetStateAction<string | null>>;
	setModel: React.Dispatch<React.SetStateAction<string | null>>;
	setStatus: React.Dispatch<React.SetStateAction<string | null>>;
	setFuelType: React.Dispatch<React.SetStateAction<string | null>>;
	handleMinMaxYear: (min: number, max: number) => void;
	handleMinMaxPrice: (min: number, max: number) => void;

	clearBrand: () => void;
	clearModel: () => void;
	clearStatus: () => void;
	clearYears: () => void;
	clearPrices: () => void;
	clearFuelType: () => void;
}
