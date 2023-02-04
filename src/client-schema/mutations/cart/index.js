import { gql } from "@apollo/client";

const ADD_TO_CART_QUERY = gql`
    mutation addToCart($product: Product) {
        addToCart(product: $product) @client {
            id
        }
    }
`;

const REMOVE_FROM_CART_QUERY = gql`
    mutation removeFromCart($product: Product) {
        removeFromCart(product: $product) @client {
            id
        }
    }
`;

export { ADD_TO_CART_QUERY, REMOVE_FROM_CART_QUERY }