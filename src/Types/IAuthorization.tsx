export interface IUser {
	name: string;
	surname: string;
	email: string;
	password: string;
	phone: string;
}

export interface IAuthContextValues {
	currentUser: IUser | null;
}
