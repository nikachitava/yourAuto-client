import { ISearchFilterContext } from "@/Types/ISearchFilterContext";
import { createContext, ReactNode, useEffect, useState } from "react";

const CONTEXT_DEFAULT_VALUE: ISearchFilterContext = {
	brand: null,
	model: null,
	status: null,
	minYear: null,
	maxYear: null,
	minPrice: null,
	maxPrice: null,
	fuelType: null,
	setBrand: () => {},
	setModel: () => {},
	setStatus: () => {},
	setFuelType: () => {},
	handleMinMaxYear: () => {},
	handleMinMaxPrice: () => {},
};

export const SearchFilterContext = createContext<ISearchFilterContext>(
	CONTEXT_DEFAULT_VALUE
);

export const SearchFilterProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [brand, setBrand] = useState<null | string>(null);
	const [model, setModel] = useState<null | string>(null);
	const [status, setStatus] = useState<null | string>(null);
	const [minYear, setMinYear] = useState<null | number>(null);
	const [maxYear, setMaxYear] = useState<null | number>(null);
	const [minPrice, setMinPrice] = useState<null | number>(null);
	const [maxPrice, setMaxPrice] = useState<null | number>(null);
	const [fuelType, setFuelType] = useState<null | string>(null);

	const handleMinMaxYear = (min: number, max: number) => {
		setMinYear(min);
		setMaxYear(max);
	};

	const handleMinMaxPrice = (min: number, max: number) => {
		setMinPrice(min);
		setMaxPrice(max);
	};

	useEffect(() => {
		setBrand(null);
		setModel(null);
		setStatus(null);
		setMinYear(null);
		setMaxYear(null);
		setMinPrice(null);
		setMaxPrice(null);
		setFuelType(null);
	}, []);

	return (
		<SearchFilterContext.Provider
			value={{
				brand,
				model,
				status,
				minYear,
				maxYear,
				minPrice,
				maxPrice,
				fuelType,
				setBrand,
				setModel,
				setStatus,
				setFuelType,
				handleMinMaxYear,
				handleMinMaxPrice,
			}}
		>
			{children}
		</SearchFilterContext.Provider>
	);
};
