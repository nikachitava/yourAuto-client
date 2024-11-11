import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { useContext } from "react";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import GoogleSingIn from "./GoogleSingIn";

const formSchema = z.object({
	email: z.string().min(2).max(50),
	password: z.string().min(2).max(50),
});

interface ILoginFormProps {
	handleLoginPage: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ handleLoginPage }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { loginUser } = useContext(AuthorizationContext);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await loginUser(values);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="min-w-[500px] max-w-[1000px] space-y-8 bg-white shadow-lg px-4 py-6 rounded-md dark:bg-lightblack"
			>
				<h1 className="font-bold text-2xl text-center">
					your<span className="text-orange-500">A</span>uto
				</h1>
				<hr />
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
					I don't have an account
				</span>

				<GoogleSingIn />

				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default LoginForm;
