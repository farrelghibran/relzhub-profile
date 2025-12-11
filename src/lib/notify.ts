import { toast } from "react-toastify";
export const notify = (value: string) =>
  toast(value, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
