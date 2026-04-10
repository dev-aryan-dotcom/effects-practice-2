import { Component, signal } from '@angular/core';
import { ProductService } from './services/product-service';
import { ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from './services/product.model';
import { AppState } from './services/product.reducer';
import { Store } from '@ngrx/store';
import { loadProducts } from './services/product.actions';
import { selectProducts } from './services/product.selector';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('practice-ngrx');

  constructor(private store: Store<AppState>){}
  products$!: Observable<ProductType[]>

  ngOnInit(){
    this.store.dispatch(loadProducts())
    this.products$ = this.store.select(selectProducts)
    console.log(this.products$);
    
  }
}
