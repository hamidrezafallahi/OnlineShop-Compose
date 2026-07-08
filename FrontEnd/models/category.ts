export interface CategoryResponse {
  records: ICategory[];
  columnsJson: string | null;
  actionsJson: string | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ICategory {
  id: number;
  persianName: string;
  englishName: string;
  categoryCover: string;
  categoryPersianDesc: string;
  categoryEnglishDesc: string;
  isShowInLanding: boolean;
  parentCategoryId: number | null;
  subCategories: ICategory[] ;
}
export interface CategoryRequestQueries {
    queries: {
        Page?: number,
        PageSize?: number,
        ByConfig?: boolean
        IsShowInLanding?: boolean

    }
}