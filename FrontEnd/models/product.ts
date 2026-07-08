import { IBrand } from './brand';
import { ICategory } from './category';
import { ITag } from './tag';

export type TDimensions = { width: number, height: number, depth: number, weight: number }
export interface ISpecification {
    key: string;
    value: string;
}
export interface ISpecificationResponse {
    id: number;
    name: string;
    specifications: Record<string, string>[]
}
export interface IDetailedProduct {
    // activeDiscounts
    // basePrice
    // createdAt
    // finalPrice
    // isActive
    // productId
    // productName
    // supplierDesc
    // supplierId
    // supplierImage
    // supplierName
    // tags

    name: string;
    description: string;
    id: number;
    productOfferId: number;
    mainImage: string;
    categoryId: number,
    brandId: number,
    imageUrls: string[],
    dimensions: TDimensions
}
export interface IDetailedProductOffer {
    id: number;
    basePrice: number
    createdAt: string
    finalPrice: number
    isActive: boolean
    productId: number
    productName: string
    productImage: string
    productDescription: string
    supplierDesc: string
    supplierId: number
    supplierImage: string
    supplierName: string
}
export interface ILandingProduct {
    id: number
    bestOfferId: number
    name: string
    description: string
    price: number
    inventory: number
    persianCategoryName: string
    englishCategoryName: string
    brand: string
    discountIsPercent: boolean
    discountAmount: number
    finalPrice: number
    mainImage: string
    averageRate: number
    rateCount: number
}
export interface DBCartItems {
    cartItemId: number
    productId: number
    productOfferId: number
    name: string
    description: string;
    basePrice: number
    discountAmount: number
    finalPrice: number
    quantity: number
    mainImage: string
}




export interface SynchronousResponse {
    id: number
    userId: number
    items: DBCartItems[];
    finalTotal: number;
    totalDiscount: number;
    totalPrice: number;
}
export type TUserProduct = {
    brandId: number
    categoryId: number
    description: string
    id: number
    inventory: number
    mainImage: string
    name: string
    price: number
}


export interface IRelatedProduct {
    brand: IBrand;
    category: ICategory
    description: string
    finalPrice: number
    id: number
    mainImage: string
    name: string
    price: number
    tags: ITag[]

}


export interface ICartProduct {
    id: number;
    productOfferId: number;
    cartItemId?: number;
    name: string;
    description: string;
    price: number;
    discountAmount: number;
    discountIsPercent: boolean;
    finalPrice: number;
    quantity: number;
    mainImage: string;
}

export interface IProductTags {
    id: number
    productId: number
    tagId: number
    tagName: string
}

// @models/product.ts
export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  finalPrice: number;
  inventory: number;
  categoryId: number;
  brandId: number;
  mainImage: string | null;
 
}
 

// برای پاسخ صفحه‌بندی شده
export interface ProductResponse {
  records: IProduct[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}