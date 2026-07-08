export interface IShippingMethod {
    description: string;
    estimatedDeliveryTime: number;
    id: number;
    isDefault: boolean;
    price: number;
    title: string
}