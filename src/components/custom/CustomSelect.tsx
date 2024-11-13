import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { FormField, FormLabel, FormMessage } from "../ui/form";

interface ICustomSelectProps {
	control: Control<any>;
	selectItems: string[];
	placeholder: string;
	name: string;
	disabled?: boolean;
	label?: string;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
	selectItems,
	placeholder,
	control,
	name,
	disabled,
	label,
}) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="flex flex-col gap-3 w-full">
					<FormLabel>{label}</FormLabel>
					<Select value={field.value} onValueChange={field.onChange}>
						<SelectTrigger disabled={disabled}>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent>
							{selectItems.map((item, index) => (
								<SelectItem key={index} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
						<FormMessage />
					</Select>
				</div>
			)}
		/>
	);
};

export default CustomSelect;
