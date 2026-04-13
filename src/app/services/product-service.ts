import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductType } from '../store/product.model';
import { Apollo } from 'apollo-angular';
import { ADD_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT } from '../product.graphql';

type ProductInput = Partial<ProductType> & { id?: string | number };

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apollo: Apollo) { }

  private buildProductVariables(product: ProductInput) {
    return {
      id: String(product?.id ?? ''),
      title: String(product?.title ?? ''),
      price: Number(product?.price ?? 0)
    };
  }
``
  // ✅ GET PRODUCTS
  getProducts() {
    return this.apollo.query<any>({ query: GET_PRODUCTS }).pipe(
      map((result) => {
        const items = result?.data?.listProducts?.items ?? [];

        return items
          .filter((item: ProductType | null) => item !== null)
          .map((item: ProductType) => ({
            ...item,
            price: Number(item.price)
          }));
      })
    );
  }

  // ✅ ADD PRODUCT
  addProduct(product: ProductInput) {
    return this.apollo.mutate<any>({
      mutation: ADD_PRODUCT,
      variables: this.buildProductVariables(product)
    });
  }

  // ✅ DELETE PRODUCT
  deleteProduct(id: string) {
    return this.apollo.mutate<any>({
      mutation: DELETE_PRODUCT,
      variables: { id }
    });
  }

  // ✅ UPDATE PRODUCT
  updateProduct(id: string, product: ProductInput) {
    const variables = this.buildProductVariables({
      ...product,
      id
    });

    return this.apollo.mutate<any>({
      mutation: UPDATE_PRODUCT,
      variables: {
        id: variables.id,
        title: variables.title,
        price: String(variables.price)
      }
    });
  }
}