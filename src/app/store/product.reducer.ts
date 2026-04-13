import { createReducer, on } from "@ngrx/store";
import * as ProductActions from './product.actions';
import { ProductType } from "./product.model";

export interface AppState {
  products: ProductType[];
  loading: boolean;
  error: string;
}

export const initialState: AppState = {
  products: [],
  loading: false,
  error: ''
};

export const productReducer = createReducer(
  initialState,

  // ✅ LOAD START
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: ''
  })),

  // ✅ LOAD SUCCESS
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),

  // ❌ LOAD FAIL
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // ✅ ADD START
  on(ProductActions.addProduct, (state) => ({
    ...state,
    loading: true
  })),

  // ✅ ADD SUCCESS
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    loading: false
  })),

  // ❌ ADD FAIL
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // ✅ DELETE START
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true
  })),

  // ✅ DELETE SUCCESS
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter(
      product => String(product.id) !== String(id)
    ),
    loading: false
  })),

  // ❌ DELETE FAIL
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // ✅ UPDATE START
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true
  })),

  // ✅ UPDATE SUCCESS
  on(ProductActions.updateProductSuccess, (state, { id, product }) => ({
    ...state,
    products: state.products.map(p =>
      String(p.id) === String(id) ? product : p
    ),
    loading: false
  })),

  // ❌ UPDATE FAIL
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);