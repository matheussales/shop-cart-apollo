import { Box, Icon, Heading, Image, HStack } from "@chakra-ui/react"
import { MdOutlineAddCircle } from 'react-icons/md'

const CardItem = ({ product }) => {
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image
                src="https://www.ablazenation.com/produtos/emblem-tee-1.jpg"
            />
            <HStack p='6' justifyContent={"space-between"}>
                <Heading as='h6'>{product.name}</Heading>
                <Icon as={MdOutlineAddCircle} w={8} h={8} />
            </HStack>
        </Box>
    )
}

export default CardItem;