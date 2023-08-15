import {
    Box, Button, Center, Flex, Grid, Input, Select, Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditModel from "../components/EditModel";
const ShowProducts = () => {
    const [data, setData] = useState([])
    const [page,setPage]=useState(1);
    const [totalPAge,setTotalPage]=useState(1);
    const [limit,setLimit]=useState();
    const [sort,setSort]=useState();
    const [company,setCompany]=useState();
    const [category,setCategory]=useState();
    const [search,setSearch]=useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const getData = () => {
        const params = {
            page,
            limit,
            sort,
            company,
            category,
            search
          };
        try {
            axios.get('http://localhost:5000/furnitures',{params})
                .then((res) => {
                    setData(res.data.data);
                    {limit && setTotalPage(Math.ceil(res.data.total/limit))}
                    console.log(res)
                })
                .catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [page,limit,sort,category,company,search])

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:5000/furnitures/delete/${id}`)
        .then((res)=>{
            if(res.data.data){
                getData();
                console.log("Deleted");
            }
        })
        .catch((err)=>console.log(err));
    }
    return (
        <Box   mt={10}>
            <Flex>
                <Input type="text" placeholder="Search Products" onChange={(e)=>setSearch(e.target.value)}/>
                <Select placeholder='Select Category' onChange={(e)=>setCategory(e.target.value)}>
                    <option value="Office Chairs">Office Chairs</option>
                    <option value="Living Room">Living Room</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Bed Room">Bed Room</option>
                    <option value="Dining">Dining</option>
                    <option value="Kids">Kids</option>
                </Select>
                <Select placeholder='Select Company'  onChange={(e)=>setCompany(e.target.value)}>
                    <option value="Marcos" >Marcos</option>
                    <option value="Liddy">Liddy</option>
                    <option value="Ikea">Ikea</option>
                    <option value="Caressa">Caressa</option>
                    <option value="Kamal">Kamal</option>
                    <option value="NilKamal">NilKamal</option>
                </Select>
                <Select placeholder='Sort By Price'  onChange={(e)=>setSort(e.target.value)}>
                    <option value="asc" >Lowest First</option>
                    <option value="desc">Highest First</option>
                </Select>
                <Select placeholder='Limit Per Page'  onChange={(e)=>setLimit(e.target.value)}>
                    <option value="5" >5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </Select>
            </Flex>
            <Box mt={10}>
                <Table variant='striped'>
                    <Thead>
                        <Tr>
                            <Th>S.No</Th>
                            <Th>Name</Th>
                            <Th>Price</Th>
                            <Th>Category</Th>
                            <Th>Company</Th>
                            <Th>Stock</Th>
                            <Th>Description</Th>
                            <Th>Images</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((el, i) => {
                                return (
                                    <Tr key={i + 1}>
                                        <Td>{i + 1}</Td>
                                        <Td>{el.name}</Td>
                                        <Td>{el.price}</Td>
                                        <Td>{el.category}</Td>
                                        <Td>{el.company}</Td>
                                        <Td>{el.stock}</Td>
                                        <Td>{el.description.slice(0, 50)}...</Td>
                                        <Td><Grid templateColumns="repeat(2, 1fr)">
                                            {el.image.map((ell)=>{
                                            return (
                                                <a href={ell} target="_blank">
                                                    <img src={ell} href={ell} width={100}/>
                                                </a>
                                            )
                                        })}
                                        </Grid>
                                        </Td>
                                        <Td><Button colorScheme='yellow' onClick={onOpen}>Edit</Button></Td>
                                        <EditModel
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        data={el}
                                        />
                                        <Td><Button colorScheme="red" onClick={()=>handleDelete(el._id)}>Delete</Button></Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Box>
            <Box mt={10}>
                <Center>
                    <Button onClick={()=>setPage(page-1)} isDisabled={page===1}>Prev</Button>
                    <Button>{page}</Button>
                    <Button onClick={()=>setPage(page+1)} isDisabled={page===totalPAge}>Next</Button>
                </Center>
            </Box>
        </Box>
    )
}

export default ShowProducts;


