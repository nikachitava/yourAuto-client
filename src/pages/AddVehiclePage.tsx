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
	title: z.string().min(2).max(50),
	brand: z.string().min(2).max(50),
	model: z.string().min(2).max(50),
	type: z.string().min(2).max(50),
	status: z.string().min(2).max(50),
	fuelType: z.string().min(2).max(50),
	year: z.string().min(1).max(4),
	price: z.string().min(2).max(50),
	mileage: z.string().min(2).max(50),
	engine: z.string().min(2).max(50),
	gearBox: z.string().min(2).max(50),
	description: z.string().min(2).max(500),
	image: z.instanceof(File).nullable().optional().default(null),
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
			image: null,
		},
	});

	const brandValue = form.watch("brand");
	const isSubmitting = form.formState.isSubmitting;

	const { currentUser } = useContext(AuthorizationContext);
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

	const navigate = useNavigate();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

			if (values.image) {
				const downloadUrl = await uploadImageToFirebase(values.image);
				newVehicleData.append("image", downloadUrl);
			}

			await useAxios.post("/vehicle", newVehicleData);
			navigate("/");
		} catch (error) {
			console.error("Error adding vehicle:", error);
		}
	};

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
					{isSubmitting ? <LoaderSpiiner /> : "Submit"}
				</Button>
			</form>
		</Form>
	);
};

export default AddVehiclePage;
