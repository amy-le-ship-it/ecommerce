import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loading from "../assets/Loading4.webm";
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CardContext';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cartItem, addToCart } = useCart();
  console.log(cartItem); // check if this shows the current cart


  // Fetch product
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (!product) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <video muted autoPlay loop>
          <source src={Loading} type='video/webm' />
        </video>
      </div>
    );
  }

  return (
    <div className='px-4 pb-4 md:px-0'>
      <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Product Image */}
        <div className='w-full'>
          <img
            src={product.image}
            alt={product.title}
            className='rounded-2xl w-full object-cover'
          />
        </div>

        {/* Product Details */}
        <div className='flex flex-col gap-6'>
          <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{product.title}</h1>
          <div className='text-gray-700'>{product.category?.toUpperCase() || "N/A"}</div>
          <p className='text-xl text-red-500 font-bold'>${product.price}</p>
          <p className='text-gray-600'>{product.description}</p>

          {/* Quantity fixed at 1 */}
          <div className='flex items-center gap-4'>
            <label className='text-sm font-medium text-gray-700'>Quantity:</label>
            <input
              type="number"
              min={1}
              value={1}
              readOnly
              className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500'
            />
          </div>

          {/* Add to Cart */}
          <div className='flex gap-4 mt-4'>
            <button
              onClick={() => addToCart(product)}
              className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'
            >
              <IoCartOutline className='w-6 h-6' /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
