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
import uploadImageToFirebase from "@/firebase/uploadImage";
import LoaderSpiiner from "@/components/custom/LoaderSpiiner";

const EditVehicleFormSchema = z.object({
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
	image: z.any().optional(),
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
					title: vehicleData.data.title || "",
					brand: vehicleData.data.brand || "",
					model: vehicleData.data.model || "",
					type: vehicleData.data.type || "",
					status: vehicleData.data.status || "",
					fuelType: vehicleData.data.fuelType || "",
					year: vehicleData.data.year || "",
					price: vehicleData.data.price || "",
					mileage: vehicleData.data.mileage || "",
					engine: vehicleData.data.engine || "",
					gearBox: vehicleData.data.gearBox || "",
					description: vehicleData.data.description || "",
					driveType: vehicleData.data.driveType || "",
					condition: vehicleData.data.condition || "",
					door: vehicleData.data.door || "",
					cylinder: vehicleData.data.cylinder || "",
					color: vehicleData.data.color || "",
					vin: vehicleData.data.vin || "",
					image: vehicleData.data.image,
				});
			} catch (error) {
				console.log(error);
			}
		};

		if (id) fetchVehicleData();
		else navigate("/");
	}, []);

	const form = useForm<z.infer<typeof EditVehicleFormSchema>>({
		resolver: zodResolver(EditVehicleFormSchema),
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

	const isSubmitting = form.formState.isSubmitting;
	const brandValue = form.watch("brand");

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

	const onSubmit = async (values: z.infer<typeof EditVehicleFormSchema>) => {
		try {
			const newVehicleData = new FormData();

			if (values.title) newVehicleData.append("title", values.title);
			if (values.brand) newVehicleData.append("brand", values.brand);
			if (values.model) newVehicleData.append("model", values.model);
			if (values.type) newVehicleData.append("type", values.type);
			if (values.status) newVehicleData.append("status", values.status);
			if (values.fuelType)
				newVehicleData.append("fuelType", values.fuelType);
			if (values.year) newVehicleData.append("year", values.year);
			if (values.price) newVehicleData.append("price", values.price);
			if (values.mileage)
				newVehicleData.append("mileage", values.mileage);
			if (values.engine) newVehicleData.append("engine", values.engine);
			if (values.gearBox)
				newVehicleData.append("gearBox", values.gearBox);
			if (values.description)
				newVehicleData.append("description", values.description);
			if (values.driveType)
				newVehicleData.append("driveType", values.driveType);
			if (values.condition)
				newVehicleData.append("condition", values.condition);
			if (values.door) newVehicleData.append("door", values.door);
			if (values.cylinder)
				newVehicleData.append("cylinder", values.cylinder);
			if (values.color) newVehicleData.append("color", values.color);
			if (values.vin) newVehicleData.append("vin", values.vin);

			const uploadedImageUrls: string[] = [];

			if (values.image && values.image.length > 0) {
				for (const file of values.image) {
					const downloadUrl = await uploadImageToFirebase(file);
					uploadedImageUrls.push(downloadUrl);
				}
			}

			const payload = {
				...values,
				image: uploadedImageUrls,
			};

			// for (let [key, value] of newVehicleData.entries()) {
			// 	console.log(`${key}:`, value);
			// }
			console.log(payload);

			await useAxios.patch(`/vehicle/${id}`, payload);
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
						{isSubmitting ? <LoaderSpiiner /> : "Edit"}
					</Button>
				</form>
			</Form>
		)
	);
};

export default EditVehicleData;
