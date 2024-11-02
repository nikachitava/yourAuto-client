import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { FormField, FormMessage } from "../ui/form";

interface ICustomSelectProps {
	control: Control<any>;
	selectItems: string[];
	placeholder: string;
	name: string;
	disabled?: boolean;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
	selectItems,
	placeholder,
	control,
	name,
	disabled,
}) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<div className="flex flex-col gap-3 w-full">
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
