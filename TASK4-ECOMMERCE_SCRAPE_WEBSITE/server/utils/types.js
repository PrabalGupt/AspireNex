 const PriceHistoryItem = {
    price: Number,
  };
  
   const User = {
    email: String,
  };
  
   const Product = {
    url: String,
    currency: String,
    image: String,
    title: String,
    currentPrice: Number,
    originalPrice: Number,
    priceHistory: [PriceHistoryItem] || [],
    highestPrice: Number,
    lowestPrice: Number,
    averagePrice: Number,
    discountRate: Number,
    description: String,
    category: String,
    reviewsCount: Number,
    stars: Number,
    isOutOfStock: Boolean,
    users: [User],
  };
  
   const NotificationType = [
    "WELCOME",
    "CHANGE_OF_STOCK",
    "LOWEST_PRICE",
    "THRESHOLD_MET",
  ];
  
   const EmailContent = {
    subject: String,
    body: String,
  };
  
   const EmailProductInfo = {
    title: String,
    url: String,
  };
  