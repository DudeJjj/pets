import { Bounce, toast } from "react-toastify"

export const SuccessNotification = (success: string) => {
  return (
    toast.success(success, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    })
  )
}
