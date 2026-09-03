import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/forgotPassword";
import OtpVerify from "../pages/OtpVerify";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import Adminpermission from "../layouts/Adminpermission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobilee from "../pages/CartMobilee"
import CheakoutPage from "../pages/CheakoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path:"search",
                element: <SearchPage/>

            },
            {
                path:"login",
                element: <Login/>

            },
            {
                path:"register",
                element: <Register/>

            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "verify-otp",
                element: <OtpVerify/>
            },
            {
                path: "reset-password",
                element: <ResetPassword/>
            },
           {
            path: "user",
            element: <UserMenuMobile/>
           },
           {
            path: "dashboard",
            element: <Dashboard/>,
            children: [
                {
                    path: "profile",
                    element: <Profile/>
                },
                {
                    path: "myorders",
                    element: <MyOrders/>
                },
                {
                    path: "address",
                    element: <Address/>
                },
                {
                    path: 'category',
                    element: <Adminpermission><CategoryPage/></Adminpermission>
                },
                {
                    path: 'subcategory',
                    element: <Adminpermission><SubCategory/></Adminpermission>
                },
                {
                    path: 'upload-product',
                    element: <Adminpermission><UploadProduct/></Adminpermission>
                },
                {
                   path: 'product',
                   element: <Adminpermission><ProductAdmin/></Adminpermission>
                }
            ]
           },
           {
            path: ':category',
            children: [
                {
                    path: ':subCategory',
                    element: <ProductListPage/>
 
                }
            ]
           },
           {
            path: "product/:product",
            element: <ProductDisplayPage/>
           },
           {
            path: 'cart',
            element: <CartMobilee/>
           },
           {
            path: 'cheakout',
            element: <CheakoutPage/>
           },
           {
            path: 'success',
            element: <Success/>
           },
           {
            path : 'cancel',
            element: <Cancel/>
           }
        ]
    }
])


export default router;