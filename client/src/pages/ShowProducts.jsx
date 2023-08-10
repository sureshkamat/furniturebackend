// const ShowProducts=()=>{
//     return (
//         <div>
//             Show Products Here
            
//         </div>
//     )
// }

// export default ShowProducts;


import React, { useState } from 'react';

function ImageForm() {
  const [imageUrls, setImageUrls] = useState(['']); // Initial state with one empty input field

  const handleImageUrlChange = (index, imageUrl) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = imageUrl;
    setImageUrls(newImageUrls);
  };

  const handleAddImage = () => {
    setImageUrls([...imageUrls, '']);
  };
console.log(imageUrls)
  return (
    <div>
      {imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => handleImageUrlChange(index, e.target.value)}
            placeholder="Enter image URL"
          />
          <button onClick={handleAddImage}>+</button>
        </div>
      ))}
    </div>
  );
}


export default ImageForm;