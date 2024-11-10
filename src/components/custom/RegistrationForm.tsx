import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { useAxios } from "@/hooks/useAxios";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	surname: z.string().min(2).max(50),
	email: z.string(),
	password: z.string().min(8).max(50),
	phone: z.string().min(8).max(10),
});

interface IRegistrationFormProps {
	handleLoginPage: () => void;
}

const RegistrationForm: React.FC<IRegistrationFormProps> = ({
	handleLoginPage,
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			surname: "",
			email: "",
			password: "",
			phone: "",
		},
	});

	const { toast } = useToast();
	const navigator = useNavigate();

	const popUpToast = () =>
		toast({
			title: "You Register Successfully",
			action: (
				<ToastAction
					altText={"Login"}
					onClick={() => navigator("/login")}
				>
					Login
				</ToastAction>
			),
		});

	const navigate = useNavigate();

	const createUser = async (values: z.infer<typeof formSchema>) => {
		try {
			const newUser = await useAxios.post("/users", values);
			if (newUser) {
				popUpToast();
			}
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(createUser)}
				className="min-w-[600px] max-w-[1000px] space-y-8 bg-white shadow-lg px-4 py-6 rounded-md dark:bg-lightblack"
			>
				<h1 className="font-bold text-2xl text-center">
					your<span className="text-orange-500">A</span>uto
				</h1>
				<hr />

				<CustomFormField
					control={form.control}
					name="name"
					label="Name"
					placeholder="Your Name"
				/>

				<CustomFormField
					control={form.control}
					name="surname"
					label="Surname"
					placeholder="Your Surname"
				/>

				<CustomFormField
					control={form.control}
					name="phone"
					label="Phone Number"
					placeholder="123-123"
				/>

				<CustomFormField
					control={form.control}
					name="email"
					label="Email"
					placeholder="yourauto@gmail.com"
				/>

				<CustomFormField
					control={form.control}
					name="password"
					label="Password"
					placeholder="*******"
					type="password"
				/>

				<span
					className="text-[12px] cursor-pointer"
					onClick={handleLoginPage}
				>
					I already have an account
				</span>

				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default RegistrationForm;
