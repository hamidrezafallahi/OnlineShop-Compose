export interface IPaymentMethod {
    id: number
    title:string
    code:string
    isOnline:boolean
    isActive:boolean
    displayOrder:number
    configJson: string
}