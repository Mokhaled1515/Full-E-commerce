// import React, { useEffect, useState } from "react";
// import SummaryApi from "../components/Common/SummerCommon";
// import Axios from "../utils/Axios";
// import AxiosToastError from "../utils/AxiosToatsError";
// import Loading from "../components/Loading";

// const OrderAdmin = () => {
//   const [orderData, setOrderData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchOrderData = async () => {
//     try {
//       setLoading(true);

//       const response = await Axios({
//         ...SummaryApi.getAllOrders,
//       });

//       const { data: responseData } = response;

//       if (responseData.success) {
//         setOrderData(responseData.data);
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderData();
//   }, []);

//   return (
//     <section className="p-2 sm:p-4 bg-blue-50 dark:bg-slate-700 min-h-screen overflow-x-hidden">
//       {/* <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4"> */}
//       <div className="w-full min-w-0 bg-white dark:bg-slate-800 rounded-lg shadow-md p-2 sm:p-4">
//         <h2 className="text-xl font-semibold dark:text-white mb-4">Orders</h2>

//         {loading && <Loading />}

//         {!loading && orderData.length === 0 && (
//           <p className="text-center py-10 text-gray-500">No orders found</p>
//         )}

//         <div className="grid gap-4">
//           {orderData.map((order) => (
//             <div
//               key={order._id}
//               className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-slate-900"
//             >
//               {/* Order information */}
//               {/* <div className="flex flex-col gap-2 mb-4"> */}
//               <div className="flex flex-col gap-2 mb-4 min-w-0">
//                 <p className="font-semibold dark:text-white break-words">
//                   Order ID:
//                   <span className="font-normal ml-2 break-all">
//                     {order.orderId}
//                   </span>
//                 </p>

//                 <p className="dark:text-white break-words">
//                   Customer:
//                   <span className="ml-2 break-words">
//                     {order.userId?.name || "Unknown"}
//                   </span>
//                 </p>

//                 <p className="dark:text-white break-words">
//                   Email:
//                   <span className="ml-2 break-all">
//                     {order.userId?.email || "-"}
//                   </span>
//                 </p>

//                 <p className="dark:text-white">
//                   Mobile:
//                   <span className="ml-2">{order.userId?.mobile || "-"}</span>
//                 </p>
//               </div>

//               {/* Product */}
//               <div className="flex gap-4 border-t border-gray-200 dark:border-gray-600 pt-4">
//                 <div className="w-24 h-24 shrink-0 bg-gray-100 rounded overflow-hidden">
//                   <img
//                     src={order.product_details?.image?.[0]}
//                     alt={order.product_details?.name}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 <div className="min-w-0">
//                   <h3 className="font-semibold dark:text-white">
//                     {order.product_details?.name}
//                   </h3>

//                   <p className="mt-2 dark:text-gray-300">
//                     Total:
//                     <span className="font-semibold ml-2">
//                       EGP {order.totalAmt}
//                     </span>
//                   </p>

//                   <p className="dark:text-gray-300">
//                     Payment:
//                     <span className="ml-2">{order.payment_status}</span>
//                   </p>
//                 </div>
//               </div>

//               {/* Address */}
//               {/* {order.delivery_address && (
//                 <div className="border-t border-gray-200 dark:border-gray-600 mt-4 pt-4">
//                   <h3 className="font-semibold dark:text-white mb-2">
//                     Delivery Address
//                   </h3>

//                   <p className="dark:text-gray-300">
//                     {order.delivery_address.address_line}
//                   </p>

//                   <p className="dark:text-gray-300">
//                     {order.delivery_address.city},{" "}
//                     {order.delivery_address.state}
//                   </p>

//                   <p className="dark:text-gray-300">
//                     {order.delivery_address.country} -{" "}
//                     {order.delivery_address.pincode}
//                   </p>

//                   <p className="dark:text-gray-300">
//                     Mobile: {order.delivery_address.mobile}
//                   </p>
//                 </div>
//               )} */}

//               {/* Delivery Information */}
//               {order.delivery_address && (
//                 <div className="border-t border-gray-200 dark:border-gray-600 mt-4 pt-4">
//                   <h3 className="font-semibold dark:text-white mb-3">
//                     Delivery Information
//                   </h3>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     {/* Governorate */}
//                     <p className="dark:text-gray-300 break-words">
//                       Governorate:
//                       <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                         {order.delivery_address.state || "-"}
//                       </span>
//                     </p>

//                     {/* Country */}
//                     <p className="dark:text-gray-300 break-words">
//                       Country:
//                       <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                         {order.delivery_address.country || "-"}
//                       </span>
//                     </p>

//                     {/* City */}
//                     <p className="dark:text-gray-300 break-words">
//                       City:
//                       <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                         {order.delivery_address.city || "-"}
//                       </span>
//                     </p>

//                     {/* Pincode */}
//                     <p className="dark:text-gray-300 break-words">
//                       Pincode:
//                       <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                         {order.delivery_address.pincode || "-"}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Address */}
//                   <div className="mt-3">
//                     <p className="dark:text-gray-300 break-words">
//                       Address:
//                       <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                         {order.delivery_address.address_line || "-"}
//                       </span>
//                     </p>
//                   </div>

//                   {/* Mobile */}
//                   <div className="mt-2">
//                     <p className="dark:text-gray-300 break-words">
//                       Mobile:
//                       <span className="ml-2 font-medium text-gray-900 dark:text-white">
//                         {order.delivery_address.mobile || "-"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               )}

//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OrderAdmin;

import React, { useEffect, useMemo, useState } from "react";

import SummaryApi from "../components/Common/SummerCommon";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToatsError";
import Loading from "../components/Loading";

const OrderAdmin = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [customDate, setCustomDate] = useState({
    from: "",
    to: "",
  });

  // =========================
  // Fetch Orders
  // =========================
  const fetchOrderData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getAllOrders,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setOrderData(responseData.data || []);
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

  // =========================
  // Group Products By Order ID
  // =========================
  const groupedOrders = useMemo(() => {
    const ordersMap = new Map();

    orderData.forEach((order) => {
      const orderId = order.orderId;

      if (!orderId) return;

      if (!ordersMap.has(orderId)) {
        ordersMap.set(orderId, {
          ...order,
          products: [],
        });
      }

      const currentOrder = ordersMap.get(orderId);

      currentOrder.products.push({
        ...order.product_details,

        productId: order.productId,

        quantity: Number(order.quantity || 1),

        itemTotalAmt: Number(order.itemTotalAmt || 0),
      });
    });

    return Array.from(ordersMap.values());
  }, [orderData]);

  // =========================
  // Date Helpers
  // =========================
  const startOfDay = (date) => {
    const result = new Date(date);

    result.setHours(0, 0, 0, 0);

    return result;
  };

  const endOfDay = (date) => {
    const result = new Date(date);

    result.setHours(23, 59, 59, 999);

    return result;
  };

  // =========================
  // Filter Orders
  // =========================
  const filteredOrders = useMemo(() => {
    const now = new Date();

    return groupedOrders
      .filter((order) => {
        if (!order.createdAt) return true;

        const orderDate = new Date(order.createdAt);

        // All
        if (filter === "all") {
          return true;
        }

        // Today
        if (filter === "today") {
          return orderDate >= startOfDay(now) && orderDate <= endOfDay(now);
        }

        // Yesterday
        if (filter === "yesterday") {
          const yesterday = new Date(now);

          yesterday.setDate(yesterday.getDate() - 1);

          return (
            orderDate >= startOfDay(yesterday) &&
            orderDate <= endOfDay(yesterday)
          );
        }

        // Last 7 Days
        if (filter === "7days") {
          const date = new Date(now);

          date.setDate(date.getDate() - 6);

          return orderDate >= startOfDay(date);
        }

        // Last 30 Days
        if (filter === "30days") {
          const date = new Date(now);

          date.setDate(date.getDate() - 29);

          return orderDate >= startOfDay(date);
        }

        // This Month
        if (filter === "month") {
          const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);

          return orderDate >= startMonth;
        }

        // Custom
        if (filter === "custom") {
          if (customDate.from) {
            const from = startOfDay(new Date(`${customDate.from}T00:00:00`));

            if (orderDate < from) {
              return false;
            }
          }

          if (customDate.to) {
            const to = endOfDay(new Date(`${customDate.to}T00:00:00`));

            if (orderDate > to) {
              return false;
            }
          }

          return true;
        }

        return true;
      })
      .filter((order) => {
        if (!search.trim()) return true;

        const value = search.toLowerCase().trim();

        return (
          String(order.orderId || "")
            .toLowerCase()
            .includes(value) ||
          String(order.userId?.name || "")
            .toLowerCase()
            .includes(value) ||
          String(order.userId?.email || "")
            .toLowerCase()
            .includes(value)
        );
      })
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [groupedOrders, filter, customDate, search]);

  // =========================
  // Statistics
  // =========================
  const statistics = useMemo(() => {
    const totalOrders = filteredOrders.length;

    const totalSales = filteredOrders.reduce(
      (total, order) => total + Number(order.totalAmt || 0),
      0,
    );

    const customers = new Set(
      filteredOrders.map((order) => order.userId?._id).filter(Boolean),
    );

    const productsSold = filteredOrders.reduce(
      (total, order) =>
        total +
        order.products.reduce(
          (sum, product) => sum + Number(product.quantity || 1),
          0,
        ),
      0,
    );

    return {
      totalOrders,
      totalSales,
      customers: customers.size,
      productsSold,
    };
  }, [filteredOrders]);

  // =========================
  // Date
  // =========================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-EG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // Time
  // =========================
  const formatTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleTimeString("en-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // Clear
  // =========================
  const clearFilters = () => {
    setFilter("all");

    setSearch("");

    setCustomDate({
      from: "",
      to: "",
    });
  };

  return (
    <section className="p-2 sm:p-4 bg-blue-50 dark:bg-slate-700 min-h-screen">
      <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-md p-3 sm:p-5">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">Orders</h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monitor and manage customer orders
            </p>
          </div>

          <button
            onClick={fetchOrderData}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-slate-700">
            <p className="text-sm text-gray-500 dark:text-gray-300">Orders</p>

            <p className="text-2xl font-bold text-blue-600">
              {statistics.totalOrders}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-green-50 dark:bg-slate-700">
            <p className="text-sm text-gray-500 dark:text-gray-300">Sales</p>

            <p className="text-2xl font-bold text-green-600">
              EGP {statistics.totalSales.toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 dark:bg-slate-700">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Customers
            </p>

            <p className="text-2xl font-bold text-purple-600">
              {statistics.customers}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-orange-50 dark:bg-slate-700">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Products Sold
            </p>

            <p className="text-2xl font-bold text-orange-600">
              {statistics.productsSold}
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-3 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex flex-wrap gap-2">
              {[
                ["all", "All"],
                ["today", "Today"],
                ["yesterday", "Yesterday"],
                ["7days", "Last 7 Days"],
                ["30days", "Last 30 Days"],
                ["month", "This Month"],
                ["custom", "Custom"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    filter === value
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-slate-800 dark:text-white border dark:border-slate-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order / customer / email..."
              className="lg:ml-auto w-full lg:w-72 px-4 py-2 rounded-lg border dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* CUSTOM DATE */}
          {filter === "custom" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <input
                type="date"
                value={customDate.from}
                onChange={(e) =>
                  setCustomDate({
                    ...customDate,
                    from: e.target.value,
                  })
                }
                className="px-3 py-2 rounded-lg border dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />

              <input
                type="date"
                value={customDate.to}
                onChange={(e) =>
                  setCustomDate({
                    ...customDate,
                    to: e.target.value,
                  })
                }
                className="px-3 py-2 rounded-lg border dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              />
            </div>
          )}

          <div className="flex justify-between mt-3">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Showing <strong>{filteredOrders.length}</strong> orders
            </p>

            {(filter !== "all" ||
              search ||
              customDate.from ||
              customDate.to) && (
              <button onClick={clearFilters} className="text-sm text-red-500">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* LOADING */}
        {loading && <Loading />}

        {/* EMPTY */}
        {!loading && filteredOrders.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No orders found.
          </div>
        )}

        {/* ORDERS */}
        {!loading &&
          filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="border border-gray-200 dark:border-slate-600 rounded-xl mb-4 overflow-hidden"
            >
              {/* ORDER HEADER */}
              <div className="p-4 bg-gray-50 dark:bg-slate-900">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <div>
                    <h3 className="font-bold dark:text-white">
                      Order #{order.orderId}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(order.createdAt)}
                      {" • "}
                      {formatTime(order.createdAt)}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs text-gray-500">Order Total</p>

                    <p className="text-xl font-bold text-blue-600">
                      EGP {Number(order.totalAmt || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* CUSTOMER */}
              <div className="p-4 border-t dark:border-slate-600">
                <h4 className="font-semibold dark:text-white mb-3">Customer</h4>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>

                    <p className="font-medium dark:text-white">
                      {order.userId?.name || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Email</p>

                    <p className="font-medium dark:text-white break-all">
                      {order.userId?.email || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Mobile</p>

                    <p className="font-medium dark:text-white">
                      {order.userId?.mobile || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="p-4 border-t dark:border-slate-600">
                <h4 className="font-semibold dark:text-white mb-3">Products</h4>

                <div className="space-y-3">
                  {order.products.map((product, index) => (
                    <div
                      key={`${order.orderId}-${index}`}
                      className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-800"
                    >
                      <div className="w-20 h-20 shrink-0 bg-white rounded-lg overflow-hidden">
                        <img
                          src={product.image?.[0]}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <h5 className="font-semibold dark:text-white">
                          {product.name || "Unknown Product"}
                        </h5>

                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>
                            Quantity:{" "}
                            <strong className="dark:text-white">
                              {product.quantity}
                            </strong>
                          </span>

                          <span>
                            Product Total:{" "}
                            <strong className="dark:text-white">
                              EGP{" "}
                              {Number(
                                product.itemTotalAmt || 0,
                              ).toLocaleString()}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAYMENT */}
              <div className="p-4 border-t dark:border-slate-600">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-sm dark:text-white">
                    Payment: <strong>{order.payment_status || "-"}</strong>
                  </span>

                  <span className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-sm dark:text-white">
                    Products: <strong>{order.products.length}</strong>
                  </span>
                </div>
              </div>

              {/* DELIVERY */}
              {order.delivery_address && (
                <div className="p-4 border-t dark:border-slate-600">
                  <h4 className="font-semibold dark:text-white mb-3">
                    Delivery Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <p className="text-gray-500">
                      Governorate:
                      <strong className="ml-1 dark:text-white">
                        {order.delivery_address.state || "-"}
                      </strong>
                    </p>

                    <p className="text-gray-500">
                      City:
                      <strong className="ml-1 dark:text-white">
                        {order.delivery_address.city || "-"}
                      </strong>
                    </p>

                    <p className="text-gray-500">
                      Country:
                      <strong className="ml-1 dark:text-white">
                        {order.delivery_address.country || "-"}
                      </strong>
                    </p>

                    <p className="text-gray-500">
                      Pincode:
                      <strong className="ml-1 dark:text-white">
                        {order.delivery_address.pincode || "-"}
                      </strong>
                    </p>
                  </div>

                  <p className="mt-3 text-sm text-gray-500 break-words">
                    Address:
                    <strong className="ml-1 dark:text-white">
                      {order.delivery_address.address_line || "-"}
                    </strong>
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Mobile:
                    <strong className="ml-1 dark:text-white">
                      {order.delivery_address.mobile || "-"}
                    </strong>
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default OrderAdmin;
