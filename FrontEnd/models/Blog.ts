import { ITag } from './tag';

export interface IBlog {
  titleFa: string
  introFa: string
  contentFa: string
  conclusionFa: string
  excerptFa: string;
  metaDescriptionFa: string;
  metaKeywordsFa: string;
  titleEn: string
  introEn: string
  contentEn: string
  conclusionEn: string
  excerptEn: string;
  metaDescriptionEn: string;
  metaKeywordsEn: string;
  slug: string;
  authorName: string
  thumbnailFile: string;
  blogTags: ITag[];
  authorId: number
  createdAt:Date
  updatedAt:Date
}

export interface BlogsResponse {
  actionsJson: string
  columnsJson: string
  pageNumber: number
  pageSize: number
  records: IBlog[]
  totalCount: number
  totalPages: number
  data: IBlog[];
}
export interface BlogResponse {
  data: IBlog;
}
