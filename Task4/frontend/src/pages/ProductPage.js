import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import PriceInfoCard from '../components/PriceInfoCard';
import ProductCard from '../components/ProductCard';
import { getProductById, getSimilarProducts } from '../api/products';
import { formatNumber } from '../utils/utils';
import '../css/productDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);
      if (!productData) {
        navigate('/');
        return;
      }
      setProduct(productData);
      const similarProductsData = await getSimilarProducts(id);
      setSimilarProducts(similarProductsData);
    };
    fetchProduct();
  }, [id, navigate]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-container">
      <div className="product-main">
        <div className="product-image">
          <img 
            src={product.image} 
            alt={product.title} 
          />
        </div>

        <div className="product-details">
          <div className="product-title">
            {product.title}
          </div>

          <Link to={product.url} target="_blank">
            Visit Product
          </Link>

          <div className="product-info">
            <div className="product-price">
              <div>
                {product.currency} {formatNumber(product.currentPrice)}
              </div>
              <div>
                {product.currency} {formatNumber(product.originalPrice)}
              </div>
            </div>

            <div className="price-info-cards">
              <PriceInfoCard title="Current Price" iconSrc="/assets/icons/price-tag.svg" value={`${product.currency} ${formatNumber(product.currentPrice)}`} />
              <PriceInfoCard title="Average Price" iconSrc="/assets/icons/chart.svg" value={`${product.currency} ${formatNumber(product.averagePrice)}`} />
              <PriceInfoCard title="Highest Price" iconSrc="/assets/icons/arrow-up.svg" value={`${product.currency} ${formatNumber(product.highestPrice)}`} />
              <PriceInfoCard title="Lowest Price" iconSrc="/assets/icons/arrow-down.svg" value={`${product.currency} ${formatNumber(product.lowestPrice)}`} />
            </div>

            <div className="product-description">
              {product.description}
            </div>
          </div>
          <Modal className="track-button" productId={id} />
        </div>
      </div>

      <div className="similar-products">
        <div className="similar-products-title">
          Similar Products
        </div>
        <div className="similar-products-list">
          {similarProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default ProductDetails;
