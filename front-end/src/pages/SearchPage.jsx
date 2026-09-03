import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../components/Common/SummerCommon'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToatsError'
import CartProduct from '../components/CartProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noThingImage from '../assets/nothing here yet.webp'
const SearchPage = () => {


  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  const LoadingArrayCard = new Array(10).fill(null)
  const [page,setPage] = useState(1)
  const [totalPage,setTotalpage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)
  

  const fetchData = async ()=>{
    try{
      setLoading(true)
    const response = await Axios({
      ...SummaryApi.searchProduct,
      data : {
        search : searchText,
        page: page,
      }
    })
    const {data : responseData} = response

    if(responseData.success){
      if(responseData.page == 1){
        setData(responseData.data)
      }else{
        setData((preve)=>{
          return[
            ...preve,
            ...responseData.data
          ]
        })  
      }
      setTotalpage(responseData.totalPage)
      // console.log(responseData)
    }
    }
    catch(error){
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }
 
  useEffect(()=>{
    fetchData()
  },[page,searchText])
  // console.log("page", page)

  const handleFetchMore = ()=>{
    if(totalPage > page){
      setPage(preve => preve +1)
    }
  }

  return (
    <section className='dark:text-white bg-white dark:bg-black'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Results: {data.length}</p>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchMore}
          >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4'>
          

       
          {
            data.map((p,index)=>{
              return(
                <CartProduct data={p} key={p?._id +"searchProduct"+index}/>
              )
            })
          }

          

        

          {/* loadind data */}

          {
            loading && (
              LoadingArrayCard.map((_,index)=>{
                return(
                  <CardLoading key={"loadingsearchpage"+index}/>
                )
              })
            )
          }
        </div>
        </InfiniteScroll>

        {
            // no data
            !data[0] && !loading && (
              <div className='flex flex-col justify-center items-center w-full mx-auto'>
                <img
                 src={noThingImage}
                 alt=""
                 className='w-full h-full max-w-xs max-h-xs block'
                 
                 />
                 <p className='dark:text-neutral-500 font-semibold my-2'>No Data found</p>
              </div>
            )
          }

      </div>
    </section>
  )
}

export default SearchPage