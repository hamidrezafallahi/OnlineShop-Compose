export interface ITag {
    id: number
    name: string
    slug?: string | null
}
export interface IProductTag {
    id: number
    tagName: string
    productId: number
    tagId: number
}