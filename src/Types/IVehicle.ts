export interface IVehicle {
        _id?: string;
        owner: IOwner;
        title?: string;
        brand?: string;
        model?: string;
        type?: string;
        status?: string;
        fuelType?: string;
        year?: string;
        price?: string;
        mileage?: number;
        engine?: number;
        gearBox?: string;
        description?: string;
        image?: string;
    
}

export interface IOwner {
        name: string;
        surname: string;
        phone: string;
        _id: string;
}