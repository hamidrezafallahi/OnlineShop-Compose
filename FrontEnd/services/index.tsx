import { apiService } from './base';

const ServiceRootReducer = () => {
  return {
    serviceReducer: {
     
      [apiService.reducerPath]: apiService.reducer,
    },
    serviceMiddleware: [
      apiService.middleware,
    ],
  };
};

export default ServiceRootReducer;
