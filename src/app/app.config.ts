import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './services/product.effects';
import { productReducer } from './services/product.reducer';
import { provideState } from '@ngrx/store';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideState({name: "products", reducer: productReducer}),
    provideStore(),
    provideEffects(ProductEffects),
  ],
};
