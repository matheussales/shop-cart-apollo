import { Box, Divider, Flex, Heading, Icon } from "@chakra-ui/react"
import Cart from "../cart";


const Header = () => {
    return (
        <Box marginBottom={"10"}>
            <Box p={4}>
                <Flex h="20" alignItems={"center"} justifyContent={"space-around"}>
                    <Heading as="h3">ABLAZE - Shop</Heading>

                    <Cart />
                </Flex>
            </Box>
            <Divider />
        </Box>
    )
}

export default Header;