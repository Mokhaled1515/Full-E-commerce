// import React from 'react'
// import { useSelector } from 'react-redux'

// const MyOrders = () => {
//   const order = useSelector(state => state.orders.order)
//   console.log("order Items", order)
//   return (
//     <div>MyOrders</div>
//   )
// }

// export default MyOrders






import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  // console.log("order Items",orders)
  return (
    <div>
      <div className='bg-white dark:bg-black shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
                  <p>Order No : {order?.orderId}</p>
                  <div className='flex gap-3'>
                    <img
                      src={order.product_details.image[0]}
                      className='w-14 h-14 object-cover hover:scale-125 hover:cursor-pointer transition-all'
                    />  
                    <p className='font-medium'>{order.product_details.name}</p>
                    
                  </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default MyOrders












// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { setOrder } from '../store/orderSlice';
// import NoData from '../components/NoData';

// const MyOrders = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector(state => state.orders.order);
//   const userId = useSelector(state => state.user._id); // تأكد أن لديك userId في Redux

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.post('/api/orders', { userId }); // تأكد من مسار الـ API الصحيح
//         if (res.data.success) {
//           dispatch(setOrder(res.data.data));
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, [dispatch, userId]);

//   console.log('order Items', orders);

//   return (
//     <div>
//       <div className='bg-white shadow-md p-3 font-semibold'>
//         <h1>Order</h1>
//       </div>
//       {!orders.length && <NoData />}
//       {orders.map((order, index) => (
//         <div key={order._id + index + "order"} className='order rounded p-4 text-sm'>
//           <p>Order No : {order?.orderId}</p>
//           <div className='flex gap-3'>
//             <img src={order.product_details.image[0]} className='w-14 h-14' />
//             <p className='font-medium'>{order.product_details.name}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyOrders;