







import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummaryApi from './Common/SummerCommon';
import AxiosToastError from '../utils/AxiosToatsError';
import toast from 'react-hot-toast';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);

  const [isInCart, setIsInCart] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemDetails] = useState(null);

  useEffect(() => {
    const foundItem = cartItem.find((item) => item.productId._id === data._id);
    setIsInCart(!!foundItem);
    setQty(foundItem?.quantity || 0);
    setCartItemDetails(foundItem || null);
  }, [data, cartItem]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('accesstoken');
    if (!token) {
      toast.error('Please login to shop.');
      return;
    }

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addTocart,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          productId: data?._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem?.();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails) return;

    const response = await updateCartItem(cartItemDetails._id, qty + 1);
    if (response.success) {
      toast.success('Item added');
    }
  };

  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cartItemDetails) return;

    if (qty === 1) {
      deleteCartItem(cartItemDetails._id);
    } else {
      const response = await updateCartItem(cartItemDetails._id, qty - 1);
      if (response.success) {
        toast.success('Item removed');
      }
    }
  };

  return (
    <div className="w-full max-w-[150px]">
      {isInCart ? (
        <div className="flex w-full h-full">
          <button
            className="cursor-pointer bg-green-500 hover:bg-green-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white flex-1 p-1 rounded"
            onClick={decreaseQty}
          >
            <FaMinus />
          </button>
          <p className="flex-1 text-center font-semibold px-1 dark:text-white flex justify-center items-center">
            {qty}
          </p>
          <button
            className="cursor-pointer bg-green-500 hover:bg-green-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white flex-1 p-1 rounded"
            onClick={increaseQty}
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-600 dark:bg-blue-600 hover:bg-green-700 dark:hover:bg-blue-700 text-white px-2 lg:px-4 py-1 rounded w-full"
        >
          {loading ? <Loading /> : 'Add'}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
