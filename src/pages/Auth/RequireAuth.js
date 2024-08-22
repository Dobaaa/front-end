import axios from "axios";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { RequierTokenEndPoint } from "../../Api/Api";
import LoadingSpinner from "../../components/Loading/Loading";
import { Axios } from "../../Api/Axios";

export default function RequireAuth() {
  const Navgatie = useNavigate();
  //Cookies
  const [users, SetUsers] = useState("");
  useEffect(() => {
    Axios.get(`/${RequierTokenEndPoint}`)
      .then((data) => SetUsers(data.data))
      .catch(() => Navgatie("/login", { replace: true }));
  }, []);
  const cookie = new Cookie();
  const token = cookie.get("user");
  return token ? (
    users === "" ? (
      <LoadingSpinner />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
