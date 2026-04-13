import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ProductType } from './store/product.model';
import { AppState } from './store/product.reducer';
import { addProduct, deleteProduct, loadProducts, updateProduct } from './store/product.actions';
import { selectProducts, selectProductsError } from './store/product.selector';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('practice-ngrx');

  productForm = new FormGroup({
    id: new FormControl(""),
    title: new FormControl(""),
    price: new FormControl("")
  })

  constructor(private store: Store<AppState>){}
  products$!: Observable<ProductType[]>
  error$!: Observable<string>

  ngOnInit(){
    this.store.dispatch(loadProducts())
    this.products$ = this.store.select(selectProducts)
    this.error$ = this.store.select(selectProductsError)
  }
  currentProductId!: string

  formHandler(){
    const formValue = this.productForm.value;

    if(this.currentProductId){
      this.updateProduct(this.currentProductId, {
        title: formValue.title,
        price: formValue.price
      })
    }else{
      this.addProduct(formValue)
      this.productForm.reset()
    }
  }

  addProduct(product: any){
    console.log(product);
    this.store.dispatch(addProduct({product}))
    alert("Product Added Successfully")
  }

  updateProduct(id: string, product: any){
    this.store.dispatch(updateProduct({id, product}))
    alert("Product Updated Successfully")
    this.currentProductId = ""
    this.productForm.reset()
  }

  editProduct(product: ProductType){
    this.currentProductId = product.id
    this.productForm.patchValue({
      id: product.id,
      title: product.title,
      price: String(product.price)
    })
  }

  cancelEdit(){
    this.currentProductId = ""
    this.productForm.reset()
  }

  deleteProduct(id: string){
    this.store.dispatch(deleteProduct({id}))
    alert("Product Deleted Successfully")
  }
}
