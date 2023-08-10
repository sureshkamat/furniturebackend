import { Box, Button, Flex, Input, Select, Textarea } from "@chakra-ui/react";
import React, { useState } from 'react';
import AddView from "../components/AddsingleView";
const AddProducts = () => {
    const [imageUrls, setImageUrls] = useState(['']);
    const [data,setData]=useState({
        name:"",
        price:"",
        stock:"",
        company:"",
        category:"",
        description:"",
        image:imageUrls
    })

    const [viewMode,setViewMode]=useState(false);
    const handleAddImage = () => {
        setImageUrls([...imageUrls, '']);
      };
      const handleImageUrlChange = (index, imageUrl) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = imageUrl;
        setImageUrls(newImageUrls);
      };
      console.log(imageUrls);
      const handleSubmit=(e)=>{
        e.preventDefault();
        data.image=imageUrls;
        console.log(data);
        alert('Data Sent')
        setViewMode(true);
      }
    return (
        <Flex p={5}>
            <Box w='60%' margin='auto' >
                <form onSubmit={handleSubmit}>
                    <Flex>
                        <Box w='40%' mr={5}>
                            <Input type='text' placeholder="Enter Product Name" mb={3} required onChange={(e)=>setData({...data,name:e.target.value})}/><br />
                            <Input type='number' placeholder="Enter Product Price" mb={3} required onChange={(e)=>setData({...data,price:e.target.value})}/><br />
                            <Input type='number' placeholder="Enter Product Stock" mb={3} required onChange={(e)=>setData({...data,stock:e.target.value})}/><br />
                            <Select placeholder='Select Category' mb={3} onChange={(e)=>setData({...data,category:e.target.value})}><br />
                                <option value="Office Chairs">Office Chairs</option>
                                <option value="Living Room">Living Room</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Bed Room">Bed Room</option>
                                <option value="Dining">Dining</option>
                                <option value="Kids">Kids</option>
                            </Select>
                            <Select placeholder='Select Company' mb={3} onChange={(e)=>setData({...data,company:e.target.value})}><br />
                                <option value="Marcos" >Marcos</option>
                                <option value="Liddy">Liddy</option>
                                <option value="Ikea">Ikea</option>
                                <option value="Caressa">Caressa</option>
                                <option value="Kamal">Kamal</option>
                                <option value="NilKamal">NilKamal</option>
                            </Select>
                            <Textarea placeholder='Enter Product Description' mb={3} onChange={(e)=>setData({...data,description:e.target.value})}/><br />
                        </Box>
                        <Box w='55%'>
                                {imageUrls.map((imageUrl, index) => (
                                    <Flex key={index}>
                                        <Input
                                            type="text"
                                            value={imageUrl}
                                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                            placeholder="Enter image URL"
                                            mb={3} required
                                        />
                                        <Button onClick={handleAddImage}>+</Button>
                                    </Flex>
                                ))}
                            <Input type='submit' value="Add" bg='green'></Input>
                        </Box>
                    </Flex>
                </form>
            </Box>

            <Box w='40%' >
                {viewMode?<AddView data={data}/>:""}
            </Box>
        </Flex>
    )
}

export default AddProducts;