import axios from 'axios';
const { Box ,Flex, Button, Center} = require("@chakra-ui/react")

const AddView=({data})=>{
    console.log(data);
    const handleAdd=()=>{
     axios.post('http://localhost:5000/furnitures/add',data)
     .then((res)=>alert("Product is Added"))
     .catch((err)=>console.log(err))
    }
    return(
        <Box boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" p={5}>
            <h1>Name: {data.name}</h1>
            <h2>price: RS{data.price}</h2>
            <h3>stock:{data.stock} </h3>
            <h3>Category: {data.category}</h3>
            <h3>Company:{data.company}</h3>
            <p>description:{data.description}</p>
            <Flex>{
                data.image.map((el)=>{
                    return<img src={el} alt='img' width={100}/>
                    
                })
            }
          </Flex>
          <Center > <Button colorScheme='green' onClick={handleAdd}>Add to DataBase</Button></Center>
        </Box>
        
    )
}
export default AddView;