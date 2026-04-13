import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductActions from './product.actions';
import { ProductService } from "../services/product-service";
import { of } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";

@Injectable()
export class ProductEffects {

  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  // ✅ LOAD
loadProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.loadProducts),
    switchMap(() =>
      this.productService.getProducts().pipe(
        map(products =>
          ProductActions.loadProductsSuccess({ products }) // ✅ FIXED
        ),
        catchError(() =>
          of(ProductActions.loadProductsFailure({
            error: "Failed to fetch Products"
          }))
        )
      )
    )
  )
);

 // ADD
addProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.addProduct),
    switchMap(action =>
      this.productService.addProduct(action.product).pipe(
        map((res: any) =>
          ProductActions.addProductSuccess({
            product: res.data.createProducts
          })
        ),
        catchError(() =>
          of(ProductActions.addProductFailure({
            error: "Failed to add Product"
          }))
        )
      )
    )
  )
);

// UPDATE
updateProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.updateProduct),
    switchMap(action =>
      this.productService.updateProduct(action.id, action.product).pipe(
        map((res: any) => {
          const updatedProduct = res?.data?.updateProducts;

          if (!updatedProduct) {
            const errorMessage = res?.errors?.[0]?.message ?? 'Failed to update Product';
            throw new Error(errorMessage);
          }

          return ProductActions.updateProductSuccess({
            id: action.id,
            product: {
              ...updatedProduct,
              price: Number(updatedProduct.price)
            }
          });
        }),
        catchError((err: Error) =>
          of(ProductActions.updateProductFailure({
            error: err?.message || 'Failed to update Product'
          }))
        )
      )
    )
  )
);

// DELETE (safe version)
deleteProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.deleteProduct),
    switchMap(action =>
      this.productService.deleteProduct(action.id).pipe(
        map((res: any) => {
          const deletedProduct = res?.data?.deleteProducts;

          if (!deletedProduct) {
            const errorMessage = res?.errors?.[0]?.message ?? 'Failed to delete Product';
            throw new Error(errorMessage);
          }

          return ProductActions.deleteProductSuccess({ id: action.id });
        }),
        catchError((err: Error) =>
          of(ProductActions.deleteProductFailure({
            error: err?.message || 'Failed to delete Product'
          }))
        )
      )
    )
  )
);
}