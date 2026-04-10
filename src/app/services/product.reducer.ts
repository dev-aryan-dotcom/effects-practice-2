import { createReducer, on } from "@ngrx/store";
import * as ProductActions from './product.actions'
import { ProductType } from "./product.model";

export interface AppState{
    products: ProductType[],
    loading: Boolean,
    error: String
}

export const initialState: AppState = {
    products: [],
    loading: false,
    error: ''
}

export const productReducer = createReducer(
    initialState,

    on(ProductActions.loadProductsSuccess, (state, {products}) => ({
        ...state,
        products: products,
        loading: false
    })),
       on(ProductActions.loadProductsFailure, (state, {error}) => ({
        ...state,
        error: error,
        loading: false
    }))
)