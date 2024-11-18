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
import { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import { VehicleBrands } from "@/Types/IVehicle";
import { useNavigate } from "react-router-dom";

import uploadImageToFirebase from "@/firebase/uploadImage";
import LoaderSpiiner from "@/components/custom/LoaderSpiiner";

const formSchema = z.object({
	title: z
		.string()
		.min(10, "Title must contain at least 10 character")
		.max(30),
	brand: z.string().min(1, "Brand is required").max(50),
	model: z.string().min(1, "Model is required").max(50),
	type: z.string().min(1, "Type is required").max(50),
	status: z.string().min(1, "Status is required").max(50),
	fuelType: z.string().min(1, "Fuel type is required").max(50),
	year: z.string().min(1).max(4),
	price: z.string().min(2).max(50),
	mileage: z.string().min(2).max(50),
	engine: z.string().min(2).max(50),
	gearBox: z.string().min(1, "gearBox is required").max(500),
	description: z
		.string()
		.min(10, "Description minimum lenght 10 symbol")
		.max(1500),
	driveType: z.string().min(2, "Drivetype minimum lenght 2 symbol").max(50),
	condition: z.string().min(2, "Condition minimum lenght 2 symbol").max(50),
	door: z.string().min(1, "Door is required").max(50),
	cylinder: z.string().min(2, "Cylinder minimum lenght 2 symbol").max(50),
	color: z.string().min(2, "Color minimum lenght 2 symbol").max(50),
	vin: z.string().min(2, "Vincode minimum lenght 2 symbol").max(50),
	image: z.any(),
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
	const isSubmitting = form.formState.isSubmitting;

	const { currentUser } = useContext(AuthorizationContext);
	const [modelOptions, setModelOptions] = useState<string[]>([]);
	const [imagesPreview, setImagesPreview] = useState<string[] | null>(null);

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

	const navigate = useNavigate();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log("asd");
		try {
			const newVehicleData = new FormData();

			newVehicleData.append("owner", currentUser?._id || "");
			newVehicleData.append("title", values.title);
			newVehicleData.append("brand", values.brand);
			newVehicleData.append("model", values.model);
			newVehicleData.append("type", values.type);
			newVehicleData.append("status", values.status);
			newVehicleData.append("fuelType", values.fuelType);
			newVehicleData.append("year", values.year);
			newVehicleData.append("price", values.price);
			newVehicleData.append("mileage", values.mileage);
			newVehicleData.append("engine", values.engine);
			newVehicleData.append("gearBox", values.gearBox);
			newVehicleData.append("description", values.description);
			newVehicleData.append("driveType", values.driveType);
			newVehicleData.append("condition", values.condition);
			newVehicleData.append("door", values.door);
			newVehicleData.append("cylinder", values.cylinder);
			newVehicleData.append("color", values.color);
			newVehicleData.append("vin", values.vin);

			for (const file of values.image) {
				const downloadUrl = await uploadImageToFirebase(file);
				newVehicleData.append("image[]", downloadUrl);
			}

			for (let [key, value] of newVehicleData.entries()) {
				console.log(`${key}:`, value);
			}

			await useAxios.post("/vehicle", newVehicleData);
			navigate("/");
		} catch (error) {
			console.error("Error adding vehicle:", error);
		}
	};

	const handleImagesChange = (files: FileList | null) => {
		if (files) {
			const fileArray = Array.from(files).slice(0, 5);
			const previews = fileArray.map((file) => URL.createObjectURL(file));
			setImagesPreview(previews);
		} else {
			setImagesPreview([]);
		}
	};

	return (
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
					label="GearBox"
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

				<div>
					<CustomFormField
						control={form.control}
						name="image"
						label="Image"
						type="file"
						placeholder="Vehicle Images"
						onChange={handleImagesChange}
					/>

					{imagesPreview && (
						<div className="border border-dotted p-10 flex items-center gap-10">
							{imagesPreview.map((preview, index) => (
								<img
									key={index}
									src={preview}
									alt={`Preview ${index + 1}`}
									className="h-20 w-20 object-cover rounded"
								/>
							))}
						</div>
					)}
				</div>

				<Button type="submit" className="w-full bg-buttonColor">
					{isSubmitting ? <LoaderSpiiner /> : "Submit"}
				</Button>
			</form>
		</Form>
	);
};

export default AddVehiclePage;
