import axios from "axios";
import { CreateUrl, responseAction } from "../Common/Helper";
import { toast } from "react-toastify";

export default async function Post({ parameters, Navigation, ApiEndPoint }) {
  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  const UserToken = LocalUser?.token;
  const config = {
    headers: {
      Authorization: "Bearer " + UserToken,
    },
  };
  var url = CreateUrl(ApiEndPoint);
  var result;
  await axios
    .post(url, parameters, config)
    .then((data) => {
      // console.log(url);
      result = data;
    })
    .catch((err) => {
      toast.error(!(err?.response?.data) ? err?.message : err.response.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
      responseAction({
        StatusCode: err.response?.status,
        navigation: Navigation,
      });
    });
  return result;
}
