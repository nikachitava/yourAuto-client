export interface IUser {
	_id?: string;
	name: string;
	surname: string;
	email: string;
	password: string;
	phone: string;
}

export interface IAuthContextValues {
	currentUser: IUser | null;
	googleAuthuser: any;
	loginUser: (data: { email: string; password: string }) => Promise<void>;
	logOut: () => Promise<void>;
}
