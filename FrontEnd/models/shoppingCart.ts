export interface IPromo {
    id: number
    code: string
    amount: number
    isPercent: boolean
    startDate:string
    endDate:string
    usageLimit: number
    usedCount: number
    userId: number
    isValid: boolean
}