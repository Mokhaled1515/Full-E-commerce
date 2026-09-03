import React, { useEffect, useState } from "react";
import SummaryApi from "../components/Common/SummerCommon";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToatsError";
import Loading from "../components/Loading";

const OrderAdmin = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getAllOrders,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setOrderData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <section className="p-4 bg-blue-50 dark:bg-slate-700 min-h-screen">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold dark:text-white mb-4">
          Orders
        </h2>

        {loading && <Loading />}

        {!loading && orderData.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No orders found
          </p>
        )}

        <div className="grid gap-4">
          {orderData.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-slate-900"
            >
              {/* Order information */}
              <div className="flex flex-col gap-2 mb-4">
                <p className="font-semibold dark:text-white">
                  Order ID:
                  <span className="font-normal ml-2">
                    {order.orderId}
                  </span>
                </p>

                <p className="dark:text-white">
                  Customer:
                  <span className="ml-2">
                    {order.userId?.name || "Unknown"}
                  </span>
                </p>

                <p className="dark:text-white">
                  Email:
                  <span className="ml-2">
                    {order.userId?.email || "-"}
                  </span>
                </p>

                <p className="dark:text-white">
                  Mobile:
                  <span className="ml-2">
                    {order.userId?.mobile || "-"}
                  </span>
                </p>
              </div>

              {/* Product */}
              <div className="flex gap-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="w-24 h-24 shrink-0 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={order.product_details?.image?.[0]}
                    alt={order.product_details?.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold dark:text-white">
                    {order.product_details?.name}
                  </h3>

                  <p className="mt-2 dark:text-gray-300">
                    Total:
                    <span className="font-semibold ml-2">
                      EGP {order.totalAmt}
                    </span>
                  </p>

                  <p className="dark:text-gray-300">
                    Payment:
                    <span className="ml-2">
                      {order.payment_status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Address */}
              {order.delivery_address && (
                <div className="border-t border-gray-200 dark:border-gray-600 mt-4 pt-4">
                  <h3 className="font-semibold dark:text-white mb-2">
                    Delivery Address
                  </h3>

                  <p className="dark:text-gray-300">
                    {order.delivery_address.address_line}
                  </p>

                  <p className="dark:text-gray-300">
                    {order.delivery_address.city},{" "}
                    {order.delivery_address.state}
                  </p>

                  <p className="dark:text-gray-300">
                    {order.delivery_address.country} -{" "}
                    {order.delivery_address.pincode}
                  </p>

                  <p className="dark:text-gray-300">
                    Mobile: {order.delivery_address.mobile}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderAdmin;
