import { gql } from '@apollo/client/core';

export const GET_PRODUCTS = gql`
  query {
    listProducts {
    items {
      id
      price
      title
    }
  }
  }
`;

export const ADD_PRODUCT = gql`
  mutation ($id: String!, $title: String!, $price: Float!) {
    createProducts(input: { id: $id, title: $title, price: $price }) {
      id
      title
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation ($id: String!) {
    deleteProducts(input: { id: $id }) {
      id
      title
      price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation ($id: String!, $title: String!, $price: String!) {
    updateProducts(input: { id: $id, title: $title, price: $price }) {
      id
      title
      price
    }
  }
`;