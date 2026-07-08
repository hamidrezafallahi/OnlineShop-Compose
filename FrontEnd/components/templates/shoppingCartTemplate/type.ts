export interface IProps {
    locale: string;
}
export interface IAddress {
    id: number | undefined
    name: string
    phoneNumber: string
    city: string
    state:string
    postalCode:string
    fullAddress:string
    isDefault: boolean
    isEdit: boolean;
}