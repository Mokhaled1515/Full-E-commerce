import React, { useEffect, useState } from "react";
import SummaryApi from "../components/Common/SummerCommon";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToatsError";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoIosSearch } from "react-icons/io";
import EditProductAdmin from "../components/EditProductAdmin";

const ProductAdmin = () => {
  const [productData, setproductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalpageCount,SettotalpageCount] = useState(1)
 const [search,SetSearch] = useState("")
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search : search
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        SettotalpageCount(responseData.totalNoPage)
        setproductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);
  const handleNext = ()=>{
    if(page !== totalpageCount){
      setPage(preve => preve + 1)
    }
    
  }

  const handlePrevious = ()=>{
    if(page > 1){
      setPage(preve => preve -1)
    }
    
  }
  const handleOnChange = (e)=>{
     const { value } = e.target
     SetSearch(value)
     setPage(1)
  }

 
 
  useEffect(()=>{
    let flag = true
const interval = setTimeout(() => {
  if(flag){
    fetchProductData()
    flag = false
  }
}, 300);

return ()=>{
  clearTimeout(interval)
}  
  },[search])

  return (
    <section className="">
      <div className="p-2 shadow-md flex justify-between items-center gap-4">
       
        <h2 className="font-semibold" id="product-logo">Product</h2>
        <div className="h-full min-w-24 w-full max-w-70 ml-auto dark:text-white dark:bg-black bg-blue-50 px-4 flex items-center gap-3 py-2 border border-gray-200 rounded focus-within:border-blue-300">
        <IoIosSearch size={25}/>

          <input type="text"
          placeholder="Search product here..."
          className="h-full w-full outline-none bg-transparent"
          value={search}
          onChange={handleOnChange}
          
          />
        </div>
        
      </div>
      {loading && (<Loading />)}

      <div className="p-4 bg-blue-50 dark:bg-slate-600 ">
        <div className="min-h-[55vh]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" id="nono">
            {productData.map((p, index) => {
              return <ProductCardAdmin data={p} fetchProductData={fetchProductData} key={index}/>;
            })}

          </div>
        </div>
          
          <div className="flex justify-between my-4">
            <button onClick={handlePrevious} className="border border-green-500 dark:hover:bg-black py-1 px-4 hover:bg-green-300 cursor-pointer">Previous</button>
            <button className="w-full bg-slate-200 dark:bg-black/50">{page}/{totalpageCount}</button>
            <button onClick={handleNext} className="border border-green-500 dark:hover:bg-black py-1 px-4 hover:bg-green-300 cursor-pointer">Next</button>
          </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
