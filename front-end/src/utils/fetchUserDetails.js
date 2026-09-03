import Axios from "./Axios";
import SummaryApi from "../components/Common/SummerCommon";
// const fetchUserDetails = async () => {
//   try {
//     const response = await Axios({
//       ...SummaryApi.userDetails,
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };



const fetchUserDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.userDetails,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null; // تجنب إعادة undefined
    }  
  };

  

export default fetchUserDetails;
