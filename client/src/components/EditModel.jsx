import {
    Box,
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
} from '@chakra-ui/react';

const EditModel = ({ isOpen, onClose, data }) => {
    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product Details Here</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex>
                        <Box  mr={5}>
                            <Input type='text' placeholder="Enter Product Name" value={data.name} mb={3} required /><br />
                            <Input type='number' placeholder="Enter Product Price"  value={data.price} mb={3} required /><br />
                            <Input type='number' placeholder="Enter Product Stock" value={data.stock} mb={3} required /><br />
                            <Select placeholder='Select Category' value={data.category} mb={3} ><br />
                                <option value="Office Chairs">Office Chairs</option>
                                <option value="Living Room">Living Room</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Bed Room">Bed Room</option>
                                <option value="Dining">Dining</option>
                                <option value="Kids">Kids</option>
                            </Select>
                            <Select placeholder='Select Company' value={data.company} mb={3} ><br />
                                <option value="Marcos" >Marcos</option>
                                <option value="Liddy">Liddy</option>
                                <option value="Ikea">Ikea</option>
                                <option value="Caressa">Caressa</option>
                                <option value="Kamal">Kamal</option>
                                <option value="NilKamal">NilKamal</option>
                            </Select>
                            <Textarea placeholder='Enter Product Description' value={data.description} mb={3} /><br />
                            {/* {
                                data.image.map((el)=>{
                                    return(
                                        <Input type='text' value={el} />
                                    )
                                })
                            } */}
                        </Box>
                        </Flex>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModel;