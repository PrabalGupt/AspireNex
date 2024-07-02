// client/src/utils/actions.js

export const addUserEmailToProduct = async (productId, userEmail) => {
    try {
      const response = await fetch(`https://ecommerce-website-wine-psi.vercel.app/api/products/${productId}/add-user-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add user email to product');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  