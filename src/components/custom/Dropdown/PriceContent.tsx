import { Button } from "@/components/ui/button";
import { SearchFilterContext } from "@/context/SearchFilterContext";
import { useContext, useState } from "react";

const PriceContent = () => {
	const [minValue, setMinValue] = useState<number | "">("");
	const [maxValue, setMaxValue] = useState<number | "">("");
	const [error, setError] = useState("");

	const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === "" ? "" : Number(e.target.value);
		setMinValue(value);
		if (value !== "" && typeof maxValue === "number" && value > maxValue) {
			setError("შეიყვანეთ ვალიდური მონაცემები.");
		} else {
			setError("");
		}
	};

	const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value === "" ? "" : Number(e.target.value);
		setMaxValue(value);
		if (value !== "" && typeof minValue === "number" && minValue > value) {
			setError("შეიყვანეთ ვალიდური მონაცემები.");
		} else {
			setError("");
		}
	};

	const { handleMinMaxPrice } = useContext(SearchFilterContext);

	const handlePriceSelection = () => {
		if (!error) {
			handleMinMaxPrice(
				minValue === "" ? 0 : minValue,
				maxValue === "" ? 0 : maxValue
			);
		}
	};

	return (
		<div className="min-h-20 max-h-60  bg-[#ffffff] absolute w-full top-[60px] left-0 flex flex-col gap-4 z-10 p-4 dark:bg-[#353535] ">
			<h1 className="text-darktext font-bold dark:text-white">
				Choose vehicle price
			</h1>
			<div className="flex items-center justify-between gap-[15px]">
				<div
					className={`flex justify-between items-center w-[155px] border-[1px] p-[10px] rounded-md ${
						error ? "border-[#F93B1D]" : "border-[#808A93]"
					}`}
				>
					<input
						placeholder="დან"
						className="border-none outline-none w-[80%] bg-transparent"
						type="number"
						value={minValue}
						onChange={handleMinChange}
					/>
				</div>
				<div
					className={`flex justify-between items-center w-[155px] border-[1px] p-[10px] rounded-md ${
						error ? "border-[#F93B1D]" : "border-[#808A93]"
					}`}
				>
					<input
						placeholder="მდე"
						className="border-none outline-none w-[80%] bg-transparent"
						type="number"
						value={maxValue}
						onChange={handleMaxChange}
					/>
				</div>
			</div>
			{error && <p className="text-[#F93B1D] text-[12px]">{error}</p>}
			<Button onClick={handlePriceSelection}>Filter</Button>
		</div>
	);
};

export default PriceContent;
