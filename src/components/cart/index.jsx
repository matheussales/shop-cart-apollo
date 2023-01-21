import { useMutation, useQuery } from "@apollo/client";
import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Icon,
    useDisclosure,
    Box,
    HStack,
    Circle,
    Image,
    Flex,
    Text,
    VStack,
    Button
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdOutlineShoppingCart } from 'react-icons/md'
import { GET_PRODUCTS_FROM_CART_QUERY } from "../../client-schema/queries/cart";
import { REMOVE_FROM_CART_QUERY } from '../../client-schema/mutations/cart';

const Cart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const { data } = useQuery(GET_PRODUCTS_FROM_CART_QUERY);
    const [removeFromCart] = useMutation(REMOVE_FROM_CART_QUERY);

    return (
        <>
            <Box display="flex">
                <Icon as={MdOutlineShoppingCart} w={8} h={8} ref={btnRef} onClick={onOpen} />
                {data?.cart?.products?.length > 0 && (
                    <Circle size='40px' bg='tomato' color='white'>
                        {data?.cart?.products?.length}
                    </Circle>
                )}

            </Box>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Cart</DrawerHeader>

                    <DrawerFooter >
                        <VStack align={"flex-start"}>

                            {data?.cart?.products.map(product => (
                                <Box boxSize={"inherit"} key={product.id} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                    <HStack align={"center"} justifyContent={"center"}>
                                        <Box boxSize="200px">
                                            <Image w src={"https://www.ablazenation.com/produtos/emblem-tee-1.jpg"} />
                                        </Box>
                                        <VStack>
                                            <Text as='b'>{product.name}</Text>
                                            <Text as='b'>R$ {product.price}</Text>
                                            <Button onClick={() => { removeFromCart({ variables: { product } }) }}>Remover</Button>
                                        </VStack>

                                    </HStack>
                                </Box>
                            ))}

                            <Text as='b'>Total: R$ {data?.cart?.totalPrice}</Text>
                        </VStack>


                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Cart;