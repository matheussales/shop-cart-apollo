import { useQuery } from "@apollo/client";
import { Container, Grid, HStack, Skeleton, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { GET_PRODUCTS } from "../../client-schema/queries/product";
import CardItem from "../card-item";

const ProductList = () => {
    const { data: productsData, loading, error: productsError } = useQuery(GET_PRODUCTS);

    return (
        <Container maxW='80%' centerContent={true}>
            <Grid templateColumns='repeat(6, 1fr)' gap="1">
                {loading && (
                    <VStack>
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                        <Skeleton height='20px' />
                    </VStack>
                )}

                {productsData?.products?.map(item => (
                    <CardItem product={item} key={item.id} />
                ))}
            </Grid>
        </Container >
    )
}

export default ProductList;