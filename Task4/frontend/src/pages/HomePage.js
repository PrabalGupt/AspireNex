// client/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import Searchbar from '../components/Searchbar';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/products';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setAllProducts(products);
      } catch (error) {
        console.log("Error fetching All Products from frontend", error)
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center search-tagline">
            <h1 className="head-text">
              Track, Compare, Shop 
              <span className="text-primary"> ShopSpy</span>
            </h1>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
