import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from "./store/product.effects"
import { productReducer } from "./store/product.reducer"
import { provideState } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { apolloProvider } from './apollo.config';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    apolloProvider,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideState({name: "products", reducer: productReducer}),
    provideEffects(ProductEffects),
  ],
};
