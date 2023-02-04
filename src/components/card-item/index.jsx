import { useMutation } from "@apollo/client"
import { Box, Icon, Image, HStack, Text, VStack, Button } from "@chakra-ui/react"
import { MdOutlineAddCircle, MdOutlineRemoveCircle } from 'react-icons/md'
import { ADD_TO_CART_QUERY, REMOVE_FROM_CART_QUERY } from '../../client-schema/mutations/cart';

const CardItem = ({ product }) => {
    const [addToCart, { loading }] = useMutation(ADD_TO_CART_QUERY)
    const [removeFromCart] = useMutation(REMOVE_FROM_CART_QUERY)

    const handleCart = (product) => {
        if (product.isInCart) {
            removeFromCart({ variables: { product } })
        } else {
            addToCart({ variables: { product } })
        }
    }

    return (
        <Box >
            <Image
                src="https://www.ablazenation.com/produtos/emblem-tee-1.jpg"
                title="Ablaze tee"
            />
            <HStack p='6' justifyContent={"space-between"}>
                <VStack align="start">
                    <Text as='b' fontSize='lg'>{product.name}</Text>
                </VStack>
                <Icon
                    as={product.isInCart ? MdOutlineRemoveCircle : MdOutlineAddCircle}
                    w={8}
                    h={8}
                    color="black"
                    onClick={() => handleCart(product)}
                    cursor="pointer"
                />
            </HStack>

        </Box>
    )
}

export default CardItem;