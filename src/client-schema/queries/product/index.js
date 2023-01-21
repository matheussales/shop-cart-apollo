import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
    query getProducts {
        products @client {
            id
            name
            price
            isInCart @client
        }
    }
`;


export { GET_PRODUCTS }