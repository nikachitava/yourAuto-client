import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface ICustomFormFieldProps {
	control: Control<any>;
	name: string;
	label?: string;
	description?: string;
	placeholder?: string;
	type?: string;
}

const CustomFormField = ({
	control,
	label,
	name,
	description,
	type = "text",
	placeholder,
}: ICustomFormFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							type={type}
						/>
					</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
