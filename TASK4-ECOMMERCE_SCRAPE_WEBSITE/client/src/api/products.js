// client/src/api/products.js
export const getAllProducts = async () => {
  try {
    const response = await fetch('https://ecommerce-website-wine-psi.vercel.app/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in function call", error)
  }
};
  
  export const getProductById = async (id) => {
    const response = await fetch(`https://ecommerce-website-wine-psi.vercel.app/api/products/${id}`);
    const data = await response.json();
    return data;
  };
  
  export const getSimilarProducts = async (id) => {
    const response = await fetch(`https://ecommerce-website-wine-psi.vercel.app/api/products/${id}/similar`)
    const data = await response.json();
    return data;
  }