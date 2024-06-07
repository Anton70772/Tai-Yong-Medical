export interface IClient {
    id: number;
    Name: string;
    surName: string;
    lastName: string;

    client: IClient;
    onClose: () => void;
}