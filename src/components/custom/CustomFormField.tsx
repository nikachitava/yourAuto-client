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
	onChange?: (e: any) => void;
}

const CustomFormField = ({
	control,
	label,
	name,
	description,
	type = "text",
	placeholder,
	onChange,
}: ICustomFormFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{type === "file" ? (
							<Input
								type="file"
								{...field}
								value={undefined}
								multiple
								accept="image/*"
								onChange={(e) => {
									if (e.target.files) {
										const filesArray = Array.from(
											e.target.files
										);
										field.onChange(filesArray);
										if (onChange) onChange(filesArray);
									} else {
										field.onChange(null);
									}
								}}
							/>
						) : (
							<Input
								placeholder={placeholder}
								{...field}
								type={type}
							/>
						)}
					</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default CustomFormField;
