import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth-slice"
import adminProductsSlice from './admin/product-slice'
import shoppingProductsSlice from './shop/products-slice'
import shoppingCartSlice from "./shop/cart-slice"
import userAddressSlice from "./shop/address-slice"
import searchSlice from "./shop/search-slice"
import commonFeatureSlice from  "./common-slice"
const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducuts : adminProductsSlice,
        shopProducuts : shoppingProductsSlice,
        shopCart : shoppingCartSlice,
        shopAddress : userAddressSlice,
        shopSearch : searchSlice,
        commonFeature : commonFeatureSlice,
    }
});

export default store;