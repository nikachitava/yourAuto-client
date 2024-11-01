import CustomFormField from "@/components/custom/CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/custom/CustomSelect";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
	title: z.string().min(2).max(50),
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
	description: z.string().min(2).max(500),
	image: z.instanceof(File).optional(),
});

const AddVehiclePage = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
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
			description: "",
			image: undefined,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	const vehicleTypes = [
		"Convertible (CV)",
		"Coupe",
		"Sedan",
		"Hatchback",
		"SUV (Sport Utility Vehicle)",
		"Truck",
		"Minivan",
		"Pickup Truck",
		"Wagon",
		"Crossover",
		"Roadster",
		"Van",
		"Motorcycle",
		"Electric Vehicle (EV)",
		"Hybrid",
	];

	const fuelTypes = [
		"Petrol",
		"Diesel",
		"Electric",
		"Hybrid (Petrol/Electric)",
		"Hybrid (Diesel/Electric)",
		"CNG (Compressed Natural Gas)",
		"LPG (Liquefied Petroleum Gas)",
		"Hydrogen Fuel Cell",
		"Biofuel",
		"Ethanol",
		"Biodiesel",
		"Flex Fuel",
	];

	const gearboxTypes = [
		"Manual",
		"Automatic",
		"Semi-Automatic",
		"CVT (Continuously Variable Transmission)",
		"Dual-Clutch",
		"Tiptronic",
		"AMT (Automated Manual Transmission)",
		"DSG (Direct-Shift Gearbox)",
		"Torque Converter",
		"Sequential",
		"Electric Drive",
	];

	const vehicleBrands = [
		"Toyota",
		"Honda",
		"Ford",
		"Chevrolet",
		"Nissan",
		"BMW",
		"Mercedes-Benz",
		"Audi",
		"Volkswagen",
		"Hyundai",
		"Kia",
		"Mazda",
		"Subaru",
		"Lexus",
		"Tesla",
		"Volvo",
		"Jeep",
		"Porsche",
		"Ferrari",
		"Lamborghini",
		"Jaguar",
		"Land Rover",
		"Bentley",
		"Aston Martin",
		"Mitsubishi",
		"Peugeot",
		"Renault",
		"Citroën",
		"Fiat",
		"Alfa Romeo",
		"Rolls-Royce",
		"Bugatti",
		"Maserati",
		"McLaren",
		"Genesis",
		"Ram",
		"GMC",
		"Acura",
		"Infiniti",
		"Mini",
		"Chrysler",
		"Cadillac",
		"Lincoln",
		"Buick",
		"Suzuki",
		"Isuzu",
		"Dodge",
		"SEAT",
		"Skoda",
		"Opel",
	];

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="min-h-screen m-auto min-w-[500px] max-w-[1000px] space-y-8  shadow-lg px-4 py-6 rounded-md "
			>
				<CustomFormField
					control={form.control}
					name="title"
					label="Title"
					placeholder=""
				/>

				<CustomSelect
					control={form.control}
					selectItems={vehicleBrands}
					placeholder={"Brand"}
					name={"brand"}
				/>

				<CustomSelect
					control={form.control}
					selectItems={[]}
					placeholder={"Model"}
					name={"model"}
					disabled
				/>

				<div className="flex items-center justify-between gap-8">
					<CustomSelect
						control={form.control}
						selectItems={vehicleTypes}
						placeholder={"Type"}
						name={"type"}
					/>

					<CustomSelect
						control={form.control}
						selectItems={["განბაჟებული", "განუბაჟებელი"]}
						placeholder={"Status"}
						name={"status"}
					/>

					<CustomSelect
						control={form.control}
						selectItems={fuelTypes}
						placeholder={"Fuel Type"}
						name={"fuelType"}
					/>
				</div>

				<div className="grid grid-cols-3 gap-8">
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
						placeholder="Mileage"
					/>
				</div>

				<CustomFormField
					control={form.control}
					name="engine"
					label="Engine"
					placeholder="Engine"
				/>

				<CustomSelect
					control={form.control}
					selectItems={gearboxTypes}
					placeholder={"Gearbox"}
					name={"gearbox"}
				/>

				<div className="grid w-full gap-1.5">
					<Label htmlFor="message">Description</Label>
					<Textarea
						className="resize-none h-40"
						placeholder="Type your vehicle description here."
					/>
				</div>

				<CustomFormField
					control={form.control}
					name="image"
					label="Image"
					type="file"
					placeholder="Vehicle Images"
				/>

				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AddVehiclePage;
