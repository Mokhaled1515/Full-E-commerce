// import React, { useEffect, useState } from "react";
// import { IoIosSearch } from "react-icons/io";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { TypeAnimation } from "react-type-animation";
// import { FaArrowLeft } from "react-icons/fa";
// import useMobile from "../hooks/useMobile";

// const Search = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isSearchPage, setIsSearchPage] = useState(false);
//   const [isMobile] = useMobile();
//   const params = useLocation()
//   const searchText = params.search.slice(3)
//   useEffect(() => {
//     const isSearch = location.pathname === "/search";
//     setIsSearchPage(isSearch);
//   }, [location]);

//     // console.log("Search", isSearchPage);

//   const readirectToSearchPage = () => {
//     navigate("/search");
//   };

//   const handelOnChange = (e)=>{
//     const value = e.target.value
//     const url = `/search?q=${value}`
//     navigate(url)
//   }

//   return (
//     <div
//       className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12
//      rounded-lg border-[0.5px] border-gray-400 overflow-hidden
//       flex items-center text-neutral-500 bg-slate-50 dark:bg-gray-500/50 group focus-within:border-amber-400"
//       id="search"
//       >
//       <div id="search-bar">
//         {

//         (isMobile && isSearchPage) ? (
//           <Link to={"/"}
//             className="flex justify-center items-center
//        h-full p-2 m-1 text-neutral-600 cursor-pointer group-focus-within:text-amber-400
//         bg-white rounded-full shadow-md dark:bg-black/50"
//           >
//             <FaArrowLeft size={20} />
//           </Link>
//         ) : (
//           <button
//             className="flex justify-center items-center
//          h-full p-3 text-neutral-600 cursor-pointer group-focus-within:text-amber-400"
//           >
//             <IoIosSearch size={23} className="dark:text-orange-200" />
//           </button>
//         )}
//       </div>
//       <div className="w-full h-full" id="search-bar2">
//         {!isSearchPage ? (
//           <div
//             onClick={readirectToSearchPage}
//             className="w-full h-full flex items-center"
//           >
//             <TypeAnimation
//               sequence={[
//                 // Same substring at the start will only be typed out once, initially

//               ]}
//               wrapper="span"
//               speed={50}
//               repeat={Infinity}
//             />
//           </div>
//         ) : (
//           <div className="w-full h-full">
//             <input
//               type="text"
//               placeholder="Search for atta dal and more."
//               autoFocus
//               defaultValue={searchText}
//               className="bg-transparent w-full h-full outline-none dark:text-yellow-300"
//               onChange={handelOnChange}
//               id="search-inp"

//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  // Get search query safely
  const searchText = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location.pathname]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div
      id="search"
      className="
        w-full
        max-w-full
        min-w-0
        h-10
        min-[300px]:h-11
        lg:h-12
        rounded-lg
        border-[0.5px]
        border-gray-400
        overflow-hidden
        flex
        items-center
        text-neutral-500
        bg-slate-50
        dark:bg-gray-500/50
        group
        focus-within:border-amber-400
      "
    >
      {/* Search / Back Button */}
      <div
        id="search-bar"
        className="
          shrink-0
          h-full
          flex
          items-center
        "
      >
        {isMobile && isSearchPage ? (
          <Link
            to="/"
            className="
              flex
              justify-center
              items-center
              h-8
              w-8
              min-w-8
              m-1
              text-neutral-600
              cursor-pointer
              group-focus-within:text-amber-400
              bg-white
              rounded-full
              shadow-md
              dark:bg-black/50
            "
          >
            <FaArrowLeft size={16} />
          </Link>
        ) : (
          <button
            type="button"
            onClick={redirectToSearchPage}
            aria-label="Search"
            className="
              flex
              justify-center
              items-center
              h-full
              px-2
              min-[300px]:px-3
              text-neutral-600
              cursor-pointer
              shrink-0
              group-focus-within:text-amber-400
            "
          >
            <IoIosSearch size={20} className="dark:text-orange-200" />
          </button>
        )}
      </div>

      {/* Search Content */}
      <div
        id="search-bar2"
        className="
          flex-1
          min-w-0
          w-full
          h-full
          overflow-hidden
        "
      >
        {!isSearchPage ? (
          <button
            type="button"
            onClick={redirectToSearchPage}
            className="
              w-full
              h-full
              min-w-0
              flex
              items-center
              text-left
              overflow-hidden
              whitespace-nowrap
              cursor-text
            "
          >
            <span
              className="
                min-w-0
                max-w-full
                overflow-hidden
                whitespace-nowrap
                text-ellipsis
                text-sm
                min-[300px]:text-base
              "
            >
              <TypeAnimation
                sequence={[
                  'Search "t-shirt"',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Search "laptop"',
                  1000,
                  'Search "gaming"',
                  1000,
                  'Search "airpods"',
                  1000,
                  'Search "watch"',
                  1000,
                  'Search "iphone"',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </button>
        ) : (
          <div className="w-full h-full min-w-0">
            <input
              type="text"
              placeholder="Search for atta dal and more."
              autoFocus
              defaultValue={searchText}
              onChange={handleOnChange}
              id="search-inp"
              className="
                bg-transparent
                w-full
                h-full
                min-w-0
                max-w-full
                px-1
                outline-none
                truncate
                dark:text-yellow-300
                text-sm
                min-[300px]:text-base
              "
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
