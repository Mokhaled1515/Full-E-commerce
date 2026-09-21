// import toast from "react-hot-toast";

// const AxiosToastError = (error) => {
//   if (error?.response?.status === 401) {
//     return;
//   }
//   if (error?.response?.data?.message) {
//     toast.error(error.response.data.message);
//   }
// };

// export default AxiosToastError;


import toast from "react-hot-toast";

const AxiosToastError = (error) => {
  if (error?.response?.status === 401) {
    const url = error?.config?.url || "";

    // Requests that happen automatically when the user is a guest
    const silentAuthRequests = [
      "/api/user/user-details",
      "/api/cart/get",
      "/api/address/get",
      "/api/order/order-list",
    ];

    const isSilentRequest = silentAuthRequests.some((request) =>
      url.includes(request)
    );

    if (isSilentRequest) {
      return;
    }

    toast.error("Please login to shop!");
    return;
  }

  if (error?.response?.data?.message) {
    toast.error(error.response.data.message);
  }
};

export default AxiosToastError;