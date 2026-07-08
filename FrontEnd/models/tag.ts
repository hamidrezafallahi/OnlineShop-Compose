export interface ITag {
    id: number
    name: string
}
export interface IProductTag {
    id: number
    tagName: string
    productId: number
    tagId: number
}