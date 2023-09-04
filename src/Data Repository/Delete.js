import axios from "axios";
// import { CreateUrl, GetToken, responseAction } from "../../Common/Helper";
import { CreateUrl } from "../Common/Helper";
//import { REF_CHARGE_TYPE_DELETE } from '../API Constant/API';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default async function Delete({ parameters, navigation, ApiEndPoint }) {
  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  const UserToken = LocalUser?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + UserToken,
    },
  };
  var url = CreateUrl(ApiEndPoint, parameters);
  var result;
  await axios
    .delete(url, config)
    .then((data) => {
      result = data;
    })
    .catch((err) => {
      toast.error(!(err?.response?.data) ? err?.message : err.response.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
  return result;
}
