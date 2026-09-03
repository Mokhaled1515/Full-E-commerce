import React, { useEffect, useState } from 'react'
import SummaryApi from '../components/Common/SummerCommon'
import AxiosToatsError from "../utils/AxiosToatsError"
import { Axios } from 'axios'
const Product = () => {
    const [productData,setproductData] = useState([])
    const [page,setPage] = useState(1)
    const fetchProductData = async ()=>{
        try{
        //  const response = await Axios({
        //     ...SummaryApi.getCategory,
        //     data: {
        //         page: page,
        //     }
        //  });
        const response = await Axios({
          ...SummaryApi.getProduct, // ✅ هذا هو الصحيح
          data: {
            page: page,
          },
        });
         const {data: responseData} = response
        //  console.log("product page", responseData)
         if (responseData.success){

       setproductData(responseData.data)
         }
        }
        catch(error){
            AxiosToatsError(error)
        };
        
    }
    // console.log("product page")

    useEffect(()=>{
        fetchProductData()
    },[])
  return (
    <div>Product</div>
  )
}

export default Product