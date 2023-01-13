import { Box, Divider, Flex, Heading, Icon } from "@chakra-ui/react"
import { MdOutlineShoppingCart } from 'react-icons/md'


const Header = () => {
    return (
        <Box marginBottom={"10"}>
            <Box p={4}>
                <Flex h="20" alignItems={"center"} justifyContent={"space-around"}>
                    <Heading as="h3">ABLAZE - Shop</Heading>

                    <Icon as={MdOutlineShoppingCart} w={8} h={8}></Icon>
                </Flex>
            </Box>
            <Divider />
        </Box>
    )
}

export default Header;