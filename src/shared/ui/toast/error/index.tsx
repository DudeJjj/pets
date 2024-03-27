import { Bounce, toast } from "react-toastify"

export const ErrorNotification = (error: string) => {
  return (
    toast.error(error, {
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
