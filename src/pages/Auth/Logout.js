import { LogOutEndPoint, baseUrl } from "../../Api/Api";
import { Axios } from "../../Api/Axios";

export default function LogOut() {
  //Cookies
  async function HandelLogOut() {
    try {
      const res = await Axios.get(`$/${LogOutEndPoint}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <button className="btn btn-primary" onClick={HandelLogOut}>
      Logout
    </button>
  );
}
