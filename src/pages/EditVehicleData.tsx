import CustomFormField from "@/components/custom/CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/custom/CustomSelect";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	fuelTypes,
	gearboxTypes,
	vehicleBrands,
	vehicleTypes,
	vehicleModels,
} from "@/data/VehiclesStaticData";
import { useAxios } from "@/hooks/useAxios";
import { useEffect, useState } from "react";
import { IVehicle, VehicleBrands } from "@/Types/IVehicle";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
	title: z.string().min(2).max(50).optional(),
	brand: z.string().min(2).max(50).optional(),
	model: z.string().min(2).max(50).optional(),
	type: z.string().min(2).max(50).optional(),
	status: z.string().min(2).max(50).optional(),
	fuelType: z.string().min(2).max(50).optional(),
	year: z.string().min(1).max(4).optional(),
	price: z.string().min(2).max(50).optional(),
	mileage: z.string().min(2).max(50).optional(),
	engine: z.string().min(2).max(50).optional(),
	gearBox: z.string().min(2).max(50).optional(),
	description: z.string().min(2).max(500).optional(),
	driveType: z.string().min(2).max(50).optional(),
	condition: z.string().min(2).max(50).optional(),
	door: z.string().min(2).max(50).optional(),
	cylinder: z.string().min(2).max(50).optional(),
	color: z.string().min(2).max(50).optional(),
	vin: z.string().min(2).max(50).optional(),
	image: z.instanceof(File).nullable().optional().default(null),
});

const EditVehicleData = () => {
	const [vehicle, setVehicle] = useState<IVehicle | null>(null);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchVehicleData = async () => {
			try {
				const vehicleData = await useAxios.get(`/vehicle/${id}`);
				setVehicle(vehicleData.data);
				form.reset({
					title: vehicleData.data.title,
					brand: vehicleData.data.brand,
					model: vehicleData.data.model,
					type: vehicleData.data.type,
					status: vehicleData.data.status,
					fuelType: vehicleData.data.fuelType,
					year: vehicleData.data.year,
					price: vehicleData.data.price,
					mileage: vehicleData.data.mileage,
					engine: vehicleData.data.engine,
					gearBox: vehicleData.data.gearBox,
					description: vehicleData.data.description,
					driveType: vehicleData.data.driveType,
					condition: vehicleData.data.condition,
					door: vehicleData.data.door,
					cylinder: vehicleData.data.cylinder,
					color: vehicleData.data.color,
					vin: vehicleData.data.vin,
					image: null,
				});
			} catch (error) {
				console.log(error);
			}
		};

		if (id) fetchVehicleData();
		else navigate("/");
	}, []);

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
			gearBox: "",
			description: "",
			driveType: "",
			condition: "",
			door: "",
			cylinder: "",
			color: "",
			vin: "",
			image: null,
		},
	});

	const brandValue = form.watch("brand");

	const [modelOptions, setModelOptions] = useState<string[]>([]);

	useEffect(() => {
		if (
			brandValue &&
			vehicleModels.hasOwnProperty(brandValue as VehicleBrands)
		) {
			setModelOptions(vehicleModels[brandValue as VehicleBrands]);
		} else {
			setModelOptions([]);
		}
	}, [brandValue]);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await useAxios.patch(`/vehicle/${id}`, values);
			console.log(values);
		} catch (error) {
			console.error("Error adding vehicle:", error);
		}
	};

	return (
		vehicle && (
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="min-h-screen m-auto min-w-[500px] max-w-[1000px] space-y-8  shadow-lg px-4 py-6 rounded-md text-white"
				>
					<CustomFormField
						control={form.control}
						name="title"
						label="Title"
						placeholder="Title"
					/>

					<CustomSelect
						control={form.control}
						selectItems={vehicleBrands}
						placeholder={"Brand"}
						name={"brand"}
					/>

					<CustomSelect
						control={form.control}
						selectItems={modelOptions}
						placeholder={"Model"}
						name={"model"}
						disabled={brandValue ? false : true}
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

					<div className="grid grid-cols-3 gap-8">
						<CustomFormField
							control={form.control}
							name="driveType"
							label="Drive type"
							placeholder="Vehicle drive type"
						/>

						<CustomFormField
							control={form.control}
							name="condition"
							label="Condtion"
							placeholder="Vehicle condtion"
						/>

						<CustomFormField
							control={form.control}
							name="door"
							label="Door"
							placeholder="Door"
						/>
					</div>

					<div className="grid grid-cols-3 gap-8">
						<CustomFormField
							control={form.control}
							name="cylinder"
							label="Cylinder"
							placeholder="Vehicle cylinder"
						/>

						<CustomFormField
							control={form.control}
							name="color"
							label="Color"
							placeholder="Vehicle color"
						/>

						<CustomFormField
							control={form.control}
							name="vin"
							label="Vin Code"
							placeholder="Vehicle vin code"
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
						name="gearBox"
					/>

					<div className="grid w-full gap-1.5">
						<Label htmlFor="message">Description</Label>
						<Textarea
							{...form.register("description")}
							className="resize-none h-40"
							placeholder="Type your vehicle description here."
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
						name="gearBox"
					/>

					<div className="grid w-full gap-1.5">
						<Label htmlFor="message">Description</Label>
						<Textarea
							{...form.register("description")}
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
						Edit
					</Button>
				</form>
			</Form>
		)
	);
};

export default EditVehicleData;
