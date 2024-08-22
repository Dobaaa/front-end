import axios from "axios";
import { useEffect } from "react";
import { GoogleEndPoint, baseUrl } from "../../Api/Api";
import Cookie from "cookie-universal";
import { useLocation } from "react-router-dom";

export default function GoogleCallBack() {
  const cookie = new Cookie();
  const location = useLocation();
  useEffect(() => {
    async function GoogleApiCall() {
      try {
        let res = await axios.get(
          `${baseUrl}/${GoogleEndPoint}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("user", token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleApiCall();
  }, []);
  return <div>under stand</div>;
}
