import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, makeVar } from '@apollo/client';
import { GET_PRODUCTS } from './client-schema/queries/product';
import { GET_PRODUCTS_FROM_CART_QUERY } from './client-schema/queries/cart';


const typeDefs = gql`
    type Query {
        cart: Cart @client
        products: [Product] @client
    }

    type Mutation {
        addToCart(product: Product): Product @client 
        removeFromCart(product: Product): Cart @client 
    }

    type Product {
        id: ID!
        name: String
        price: Int
        isInCart: boolean @client
    }

    type Cart {
        id: ID!
        totalPrice: Int @client
        products: [Product]
    }
`;

const resolvers = {
    Query: {
        cart: (obj, args, { cache }, info) => {
            const query = gql`
                query getCart {
                    cart @client { 
                        id
                        products {
                            id
                            name
                            price
                        }
                    }
            }`;

            const { cart } = cache.readQuery({ query })
            return cart;
        },
        products: (obj, args, { cache }, info) => {
            const query = gql`
                query getProducts {
                    products @client {
                        id 
                        name
                        price
                    }
            }`;

            const { products } = cache.readQuery({ query })

            return products;
        }
    },
    Cart: {
        totalPrice: (cart, _args, { cache }) => {
            return cart.products.reduce((total, product) => total + product.price, 0);
        }
    },
    Product: {
        isInCart: (product, _args, { cache }) => {
            const GET_CART = gql`
                query getCart {
                    cart @client {
                        id
                        products {
                            id
                            name
                            price
                        }
                    }
                }
            `;

            const { cart } = cache.readQuery({ query: GET_CART })

            return Boolean(cart.products.find(item => product.id === item.id));
        }
    },
    Mutation: {
        addToCart: (_root, { product }, { cache }) => {
            cache.modify({
                id: cache.identify({
                    __typename: 'Product',
                    id: product.id,
                }),
                fields: {
                    isInCart: value => !value,
                },
            });

            const { cart } = cache.readQuery({ query: GET_PRODUCTS_FROM_CART_QUERY });

            const newProductCart = [...cart.products, { ...product }];

            const data = {
                cart: {
                    ...cart,
                    totalPrice: newProductCart.reduce((total, product) => total + product.price, 0),
                    products: newProductCart

                }
            };

            cache.writeQuery({ query: GET_PRODUCTS_FROM_CART_QUERY, data })

            return { ...data.cart };;
        },
        removeFromCart: (_root, { product: removedProduct }, { cache }) => {
            cache.modify({
                id: cache.identify({
                    __typename: 'Product',
                    id: removedProduct.id,
                }),
                fields: {
                    isInCart: value => !value,
                },
            });

            const { cart } = cache.readQuery({ query: GET_PRODUCTS_FROM_CART_QUERY });

            const products = cart.products.filter(product => product.id !== removedProduct.id);

            const data = {
                cart: {
                    ...cart,
                    totalPrice: products.reduce((total, product) => total + product.price, 0),
                    products: products
                }
            };

            cache.writeQuery({ query: GET_PRODUCTS_FROM_CART_QUERY, data })

            return { ...data.cart };
        }
    }
}

const inMemoryCache = new InMemoryCache();

const client = new ApolloClient({
    cache: inMemoryCache,
    typeDefs,
    resolvers
});


// Inicializar o Cache
const products = [
    {
        id: 1,
        name: 'Ablaze Tee 1',
        price: 60,
        __typename: 'Product'
    },
    {
        id: 2,
        name: 'Ablaze Tee 2',
        price: 60,
        __typename: 'Product'
    },
    {
        id: 3,
        name: 'Ablaze Tee 3',
        price: 60,
        __typename: 'Product'
    },
    {
        id: 4,
        name: 'Ablaze Tee 4',
        price: 60,
        __typename: 'Product'
    },
    {
        id: 5,
        name: 'Ablaze Tee 5',
        price: 60,
        __typename: 'Product'
    },
    {
        id: 6,
        name: 'Ablaze Tee 6',
        price: 60,
        __typename: 'Product'
    }
];

inMemoryCache.writeQuery({
    query: GET_PRODUCTS,
    data: {
        products
    }
})

inMemoryCache.writeQuery({
    query: GET_PRODUCTS_FROM_CART_QUERY,
    data: {
        cart: {
            id: 'Matheus:1',
            products: [{
                id: 1,
                name: 'Ablaze Tee 1',
                price: 60,
                __typename: 'Product'
            },
            {
                id: 2,
                name: 'Ablaze Tee 2',
                price: 60,
                __typename: 'Product'
            }],
            __typename: 'Cart'
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </ApolloProvider>
    </React.StrictMode>,
)
