export interface IBrand {
    description: string
    id: number
    slug?: string | null
    isActive: boolean
    logoFile: string
    name: string
    seoTitleFa?: string | null
    seoTitleEn?: string | null
    metaDescriptionFa?: string | null
    metaDescriptionEn?: string | null
}