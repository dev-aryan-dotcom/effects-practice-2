import { createEffect } from "@ngrx/effects";
import * as ProductActions from './product.actions'
import { ofType } from "@ngrx/effects";
import { catchError, of } from "rxjs";
import { inject } from "@angular/core";
import { switchMap } from "rxjs";
import { Actions } from "@ngrx/effects";
import { ProductService } from "./product-service";
import { map } from "rxjs";

export class ProductEffects{
    private $actions = inject(Actions)
    private productService = inject(ProductService)

    loadProducts$ = createEffect(()=> 
        this.$actions.pipe(
            ofType(ProductActions.loadProducts),
            switchMap(()=>
                this.productService.getProducts().pipe(
                    map((res:any)=> ProductActions.loadProductsSuccess({products:res.products})),
                    catchError(() => of(ProductActions.loadProductsFailure({error: "Failed to fetch Products"})))
                )
            )
        )
    )
    
}