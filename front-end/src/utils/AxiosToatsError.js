
import toast from "react-hot-toast";

const AxiosToastError = (error) => {
    if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
    }
};

export default AxiosToastError;