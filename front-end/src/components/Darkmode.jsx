// import React from 'react'
// import LightButton from "../assets/light-mode-button.png.png";
// import DarkButton from "../assets/dark-mode-button-85jBkhOs.png"
// const DarkMode = () => {
//     const [theme, setTheme] = React.useState(
//         localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
//     );

//     const elements = document.documentElement;
//     React.useEffect(()=>{
//         if(theme === "dark"){
//           elements.classList.add("dark");
//           localStorage.setItem("theme", "dark")
//         } else {
//             elements.classList.remove("dark");
//             localStorage.setItem("theme", "light")
//         }
//     }, [theme]);
//   return (

//     <div className='relative'>
//       <img src={LightButton} alt=""
//       onClick={()=> setTheme(theme === "light" ? "dark" : "light")}
//       className={`w-12 cursor-pointer drop-shadow
//       [1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300
//       absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
//       />
//       <img src={DarkButton} alt=""
//             onClick={()=> setTheme(theme === "light" ? "dark" : "light")}

//       className='w-12 cursor-pointer drop-shadow
//       [1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300'
//       />

//     </div>
//   )
// }

// export default DarkMode

import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // استيراد الأيقونات
import { IoSunnySharp } from "react-icons/io5";

const DarkMode = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="relative">
      {theme === "light" ? (
        <FaMoon
          onClick={toggleTheme}
          className="w-8 h-8 cursor-pointer text-green-400 transition-opacity duration-300"
        />
      ) : (
        <IoSunnySharp
          onClick={toggleTheme}
          className="w-8 h-8 cursor-pointer text-blue-500 transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export default DarkMode;
