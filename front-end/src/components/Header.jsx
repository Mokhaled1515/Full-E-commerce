import React, { useEffect, useState } from "react";
import DarkMode from "./Darkmode";
import logo from "../assets/38754567_2211.q894.016.S.m009.c10.shopping_people_flat_text-removebg-preview.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setopenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  // const [totalPrice,setTotalPrice] = useState(0)
  // const [totalQty,setTotalQty] = useState(0)

  const { totalPrice, totalQty } = useGlobalContext();
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };
  const handleCloseUserMenu = () => {
    setopenUserMenu(false);
  };
  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  // total item and total price
  //  useEffect(()=>{
  //   const qty = cartItem.reduce((preve,curr)=>{
  //       return preve + curr.quantity
  //   },0)
  //   setTotalQty(qty)
  //   const tPrice = cartItem.reduce((preve,curr)=>{
  //     return preve + (curr.productId.price * curr.quantity)
  //   },0)
  //   setTotalPrice(tPrice)
  //  },[cartItem])

  return (
    <header
      className="shadow-md dark:shadow-neutral-500 py-1 sticky top-0 dark:bg-neutral-800
     bg-slate-100 flex flex-col sm:gap-0 justify-center gap-2 items-center z-40"
    >
      {!(isSearchPage && isMobile) && (
        <div className="container flex items-center mx-auto gap-2 px-2 justify-between w-full">
          {/* Logo */}
          <div className="h-full w-4/7 p-2">
            <Link
              to={"/"}
              className="h-full flex justify-center items-center outline-0"
            >
              <img
                src={logo}
                alt="logo"
                height={80}
                width={180}
                className="hidden lg:block outline-0 border-0"
              />
              <img
                src={logo}
                alt="logo"
                height={80}
                width={120}
                className="lg:hidden outline-0 border-"
              />
            </Link>
          </div>

          <div className="hidden lg:block w-full">
            <Search />
          </div>

          <div className="flex justify-center gap-8 w-full items-center ">
            <button
              className="text-neutral-500  lg:hidden w-1/8"
              onClick={handleMobileUser}
            >
              <FaRegCircleUser
                size={26}
                className="cursor-pointer dark:text-blue-500"
              />
            </button>
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative dark:text-white">
                  <div
                    onClick={() => setopenUserMenu((preve) => !preve)}
                    className="flex items-center select-none gap-2 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <VscTriangleUp size={18} />
                    ) : (
                      <VscTriangleDown size={18} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg dark:bg-black dark:text-white">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLoginPage}
                  className="text-lg px-2 cursor-pointer dark:text-white"
                >
                  Login
                </button>
              )}

              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 dark:bg-blue-700 hover:dark:bg-blue-800
              transition-all duration-75 ease-out
               bg-green-600 px-3 py-2 rounded text-white dark:text-green-50 cursor-pointer hover:bg-green-700"
              >
                <div className="animate-bounce">
                  <GiShoppingCart size={33} className="font-bold" />
                </div>
                <div className="font-semibold text-sm">
                  {cartItem[0] ? (
                    <div>
                      <p>{totalQty} Items</p>
                      <p>{DisplayPriceInRupees(totalPrice)}</p>
                    </div>
                  ) : (
                    <p>My Cart</p>
                  )}
                </div>
              </button>
            </div>
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;
