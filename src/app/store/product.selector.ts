import { createSelector } from "@ngrx/store";
import { createFeatureSelector } from "@ngrx/store";
import { AppState } from "./product.reducer";
import { App } from "../app";

export const productSelector = createFeatureSelector<AppState>("products")

export const selectProducts = createSelector(
    productSelector,

    (state) => state.products
)

export const selectProductsError = createSelector(
    productSelector,

    (state) => state.error
)