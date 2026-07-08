

export interface IBaseQueryResponse<T> {
     isSuccess:boolean
     error: string
     data:T
}
 
 
export interface IBaseRequest<K> {
  
}

export interface IService<T, K = unknown> {
  url: string;
  body?: IBaseRequest<K>;
  method?: "GET" | "POST" | "DELETE" | "PUT"
  skip?: boolean;
  id?: string | number;
}

