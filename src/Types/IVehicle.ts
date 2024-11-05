export interface IVehicle {
        _id: string;
        owner: IOwner;
        title: string;
        brand: string;
        model: string;
        type: string;
        status: string;
        fuelType: string;
        year: string;
        price: string;
        mileage: string;
        engine: string;
        gearBox: string;
        description: string;
        image?: string;
}


export interface IOwner {
        name: string;
        surname: string;
        phone: string;
        _id: string;
}

export interface IVehicleCardProps {
	owner: IOwner;
	title: string;
	brand: string;
	fuelType: string;
	price: string;
	gearBox: string;
	image?: string;
}

export type VehicleBrands =
		| "Toyota"
		| "Honda"
		| "Ford"
		| "Chevrolet"
		| "Nissan"
		| "BMW"
		| "MercedesBenz"
		| "Audi"
		| "Volkswagen"
		| "Hyundai"
		| "Kia"
		| "Mazda"
		| "Subaru"
		| "Lexus"
		| "Tesla"
		| "Volvo"
		| "Jeep"
		| "Porsche"
		| "Ferrari"
		| "Lamborghini"
		| "Jaguar"
		| "LandRover"
		| "Bentley"
		| "AstonMartin"
		| "Mitsubishi"
		| "Peugeot"
		| "Renault"
		| "Citroën"
		| "Fiat"
		| "AlfaRomeo"
		| "RollsRoyce"
		| "Bugatti"
		| "Maserati"
		| "McLaren"
		| "Genesis"
		| "Ram"
		| "GMC"
		| "Acura"
		| "Infiniti"
		| "Mini"
		| "Chrysler"
		| "Cadillac"
		| "Lincoln"
		| "Buick"
		| "Suzuki"
		| "Isuzu"
		| "Dodge"
		| "SEAT"
		| "Skoda"
		| "Opel";
		

