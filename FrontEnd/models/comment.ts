export interface IComment {
    id: number
    targetId: number
    targetType: EnumTargetType
    userId: number
    userFullName: string
    content: string
    isApproved: true,
    createdAt: string
    parentId: null | number
    replies: IComment[]
    userImage:string
    userRate:number
}
export enum EnumTargetType {
    Blog = 1,
    Product = 2,
    Supplier = 3
}