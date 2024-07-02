// client/src/utils/actions.js

export const addUserEmailToProduct = async (productId, userEmail) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}/add-user-email`, {
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
  