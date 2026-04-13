import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

export const apolloProvider = provideApollo(() => {
  const httpLink = inject(HttpLink);
  const uri = 'https://qpoxdmu6gzfgnapdecamtdmzsi.appsync-api.eu-north-1.amazonaws.com/graphql';
  const apiKey = 'da2-vxx4zhwhnjfuthrchsmtcc42ja';

  return {
    link: httpLink.create({
      uri,
      headers: new HttpHeaders().set('x-api-key', apiKey)
    }),
    cache: new InMemoryCache()
  };
});
