import axios from "axios";
import { CreateUrl, responseAction } from "../Common/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function Patch({ parameters, navigation, ApiEndPoint }) {
  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  const UserToken = LocalUser?.token;
  const options = {
    headers: {
      Authorization: "Bearer " + UserToken,
    },
  };

  var url = CreateUrl(ApiEndPoint);
  var result;

  await axios
    .patch(url, parameters, options)
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
