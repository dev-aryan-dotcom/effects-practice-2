import { createAction, createFeature } from "@ngrx/store";
import { props } from "@ngrx/store";
import { ProductType } from "./product.model";

export const loadProducts = createAction(
    '[Products] Load Products'
)

export const loadProductsSuccess = createAction(
    '[Products] Load Products Success',
    props<{products: ProductType[]}>()
)

export const loadProductsFailure = createAction(
    '[Products] Load Products Failure',
    props<{error: string}>()
)

export const addProduct = createAction(
    '[Products] Add Product',
    props<{product: ProductType}>()
)

export const addProductSuccess = createAction(
    '[Products] Add Product Success',
    props<{product: ProductType}>()
)

export const addProductFailure = createAction(
    '[Products] Add Product Failure',
    props<{error: string}>()
)
export const deleteProduct = createAction(
    '[Products] Delete Product',
    props<{id: string}>()
)

export const deleteProductSuccess = createAction(
    '[Products] Delete Product Success',
    props<{id: string}>()
)

export const deleteProductFailure = createAction(
    '[Products] Delete Product Failure',
    props<{error: string}>()
)

export const updateProduct = createAction(
    '[Products] Update Product',
    props<{id: string, product: ProductType}>()
)

export const updateProductSuccess = createAction(
    '[Products] Update Product Success',
    props<{id: string, product: ProductType}>()
)

export const updateProductFailure = createAction(
    '[Products] Update Product Failure',
    props<{error: string}>()
)