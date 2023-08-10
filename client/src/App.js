import { Box, Button, Center, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import './App.css';
import AddProducts from './pages/AddProduct';
import { default as ImageForm } from './pages/ShowProducts';
function App() {
  const [data,setData]=useState(false);
  return (
    <div className="App">
      <Box bg='tomato' w='100%' p={4} color='white'>
        <Center><Heading>Furniture Admin Page</Heading></Center>
        <Center><Button mt={5} onClick={()=>setData(!data)}>{data?"Show Products":"Add products"}</Button></Center>
      </Box>
      {data?<AddProducts />:<ImageForm/> }
      
    </div>
  );
}

export default App;
