import Swal from 'sweetalert2'
const SuccessAlert = (title)=>{
    const alert = Swal.fire({
        icon: "success",
        title: title,
        color: 'gray',
        confirmButtonColor : 'green'
      });
      return alert
}

export default SuccessAlert