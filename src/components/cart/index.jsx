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
    Button,
    Divider
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdShoppingCart } from 'react-icons/md'
import { GET_PRODUCTS_FROM_CART_QUERY } from "../../client-schema/queries/cart";
import { REMOVE_FROM_CART_QUERY } from '../../client-schema/mutations/cart';

const Cart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    const { data } = useQuery(GET_PRODUCTS_FROM_CART_QUERY);
    const [removeFromCart] = useMutation(REMOVE_FROM_CART_QUERY);

    return (
        <>
            <Box
                display="flex"
                _after={{
                    content: `"${data?.cart?.products?.length}"`,
                    width: "25px",
                    height: "25px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    textAlign: "center",
                    position: "relative",
                    left: "-20px",
                    top: "-10px"
                }}
                cursor="pointer"
            >
                <Icon as={MdShoppingCart} w={9} h={9} ref={btnRef} onClick={onOpen} />
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
                                <>
                                    <Box boxSize={"inherit"} key={product.id} overflow='hidden'>
                                        <HStack align={"center"} justifyContent={"center"} padding="4">
                                            <Box>
                                                <Image w src={"https://www.ablazenation.com/produtos/emblem-tee-1.jpg"} />
                                            </Box>
                                            <VStack>
                                                <Text as='b'>{product.name}</Text>
                                                <Text as='b'>R$ {product.price}</Text>
                                                <Button
                                                    onClick={() => { removeFromCart({ variables: { product } }) }}
                                                    bg="black"
                                                    color="white"
                                                    borderRadius="0"
                                                >
                                                    Remover
                                                </Button>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                    <Divider />
                                </>
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