import { combineReducers } from '@reduxjs/toolkit';

import config from './config';
import config2 from './config2';
import ShoppingCart from './shoppingCartSlice';

const withoutPersist = combineReducers({ config2 });

const withPersist = combineReducers({
  config,
  ShoppingCart
});

const sliceRootReducer = {
  withPersist,
  withoutPersist,
};

export default sliceRootReducer;
