import CustomFormField from "@/components/custom/CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	brand: z.string().min(2).max(50),
	model: z.string().min(2).max(50),
	type: z.string().min(2).max(50),
	status: z.string().min(2).max(50),
	fuelType: z.string().min(2).max(50),
	year: z.string().min(4).max(4),
	price: z.string().min(0),
	mileage: z.string().min(0),
	engine: z.string().min(2).max(50),
	gearbox: z.string().min(2).max(50),
	image: z.instanceof(File).optional(),
});

const AddVehiclePage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			brand: "",
			model: "",
			type: "",
			status: "",
			fuelType: "",
			year: "",
			price: "",
			mileage: "",
			engine: "",
			gearbox: "",
			image: undefined,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="min-h-screen m-auto min-w-[500px] max-w-[1000px] space-y-8  shadow-lg px-4 py-6 rounded-md "
			>
				<CustomFormField
					control={form.control}
					name="brand"
					label="Brand"
					placeholder="Vehicle Brand"
				/>

				<CustomFormField
					control={form.control}
					name="model"
					label="Model"
					placeholder="Vehicle Model"
				/>

				<CustomFormField
					control={form.control}
					name="type"
					label="Type"
					placeholder="Vehicle Type"
				/>

				<CustomFormField
					control={form.control}
					name="status"
					label="Status"
					placeholder="Vehicle Status"
				/>

				<CustomFormField
					control={form.control}
					name="fuelType"
					label="Fuel Type"
					placeholder="Fuel Type"
				/>

				<CustomFormField
					control={form.control}
					name="year"
					label="Factory Year"
					placeholder="Vehicle factory year"
				/>

				<CustomFormField
					control={form.control}
					name="price"
					label="Price"
					placeholder="Vehicle Price"
				/>

				<CustomFormField
					control={form.control}
					name="mileage"
					label="Mileage"
					placeholder="Vehicle Status"
				/>

				<CustomFormField
					control={form.control}
					name="engine"
					label="Engine"
					placeholder="Vehicle Engine"
				/>

				<CustomFormField
					control={form.control}
					name="gearbox"
					label="GearBox"
					placeholder="Vehicle Status"
				/>

				<CustomFormField
					control={form.control}
					name="image"
					label="Image"
					type="file"
					placeholder="Vehicle Status"
				/>

				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AddVehiclePage;
