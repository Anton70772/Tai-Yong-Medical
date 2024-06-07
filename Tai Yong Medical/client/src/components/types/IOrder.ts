export interface IOrder {
    isOpen: boolean;
    onRequestClose: () => void;
    orderData: {
        order_name: string;
        price: string;
        count: number;
        date: string;
        status: string;
        doctors_id: string;
        prosthetics_id: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}