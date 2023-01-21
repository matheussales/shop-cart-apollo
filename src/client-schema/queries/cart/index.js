import { gql } from "@apollo/client";

const GET_PRODUCTS_FROM_CART_QUERY = gql`
    query getCart {
        cart @client {
            id
            totalPrice @client
            products {
                id
                name
                price
            }
        }
    }
`;

export { GET_PRODUCTS_FROM_CART_QUERY }