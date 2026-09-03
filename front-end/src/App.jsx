import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import "../src/media.css";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDeatils } from "./store/UserSlice";
import { useDispatch } from "react-redux";
import { setAllCategory, setAllSubCategory, setLoadingCategory} from "./store/productSlide";
import Axios from "./utils/Axios";
import SummaryApi from "./components/Common/SummerCommon";
import { handleAddItemCart } from "./store/cartProduct";
import GlobalProvider from "./provider/GlobalProvider";
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from "./components/CartMobile";


const App = () => {
  const daspatch = useDispatch();
  const location = useLocation()
  

  // const fetchUser = async () => {
  //   const userData = await fetchUserDetails()
  //   daspatch(setUserDeatils(userData.data))
  // };



  

  const fetchUser = async () => {
    const token = localStorage.getItem("accesstoken"); // التحقق من وجود التوكن
    if (!token) {
      console.warn("No token found, skipping user fetch");
      return; // لا تقم بإرسال الطلب إذا لم يكن هناك توكن
    }
    
    try {
      const userData = await fetchUserDetails();
      if (userData && userData.data) {
        daspatch(setUserDeatils(userData.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  









  const fetchCategory = async () => {
    try {
      daspatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory
      })

      const { data: responseData } = response

      if (responseData.succuss) {
        daspatch(setAllCategory(responseData.data));
      }
    } catch (error) {
    } finally {
      daspatch(setLoadingCategory(false))
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory
      });

      const { data: responseData } = response
      if (responseData.success) {
        daspatch(setAllSubCategory(responseData.data.sort((a,b) => a.name.localeCompare(b.name))))
      }
    } catch (error) {
    } finally {
    }
  };
 
  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    // fetchCartItem()
  }, []);

  
  return (
    <GlobalProvider className="dark:bg-gray-800">
      <Header />
      <main className="min-h-[78vh] dark:bg-neutral-800">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
     {
      location.pathname !== "/cheakout" && (
        <CartMobileLink/>
      )
     }
     
       
    </GlobalProvider>
  );
};

export default App;
