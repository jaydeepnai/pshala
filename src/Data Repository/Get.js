import axios from "axios";
import { CreateUrl, GetToken } from "../Common/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export default async function Get({ parameters, Navigation, ApiEndPoint }) {
  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  const LUserToken = LocalUser?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + LUserToken,
    },
  };
  var url = CreateUrl(ApiEndPoint, parameters);
  var result;
  await axios.get(url, config).then((data) => {
    result = data;
  }).catch(err => {
    toast.error(!(err?.response?.data) ? err?.message : err.response.data, {
      position: toast.POSITION.TOP_RIGHT
    })
  });
  return result;
}