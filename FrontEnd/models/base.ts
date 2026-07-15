export interface PagedResponse<T> {
  isSuccess: boolean
  error: string | null
  data: DataResponse<T>
}
export interface DataResponse<T> {
    records: T[];
    columnsJson: string | null;
    actionsJson: string | null;
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
}
export interface Ids {
  id: number
}

export interface IListProps<T> {
  list: DataResponse<T>
  entity: string
}
export interface ApiResponse<T> {
  data: DataResponse<T>;
  isSuccess: boolean;
  error: string | null;
}

 export interface SimpleResponse<T> {
  data:T;
  isSuccess: boolean;
  error: string | null;
}


 
export type PageParams<
  P extends Record<string, string> = Record<string, string>,
  S extends Record<string, string | string[] | undefined> = Record<string, string | string[] | undefined>
> = {
  params: Promise<P>;
  searchParams?: Promise<S>;
};