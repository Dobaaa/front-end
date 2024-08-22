import axios from "axios";
import { useState } from "react";
import { LoginEndPoint, baseUrl } from "../../Api/Api";
import LoadingSpinner from "../../components/Loading/Loading";
import Cookie from "cookie-universal";
import GoogleImg from "../../assets/google.jpg";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navgaite = useNavigate();
  // make more than state in one  state
  const [form, SetForm] = useState({
    email: "",
    password: "",
  });
  //Cookies
  const cookie = Cookie();
  //loading
  const [Loading, SetLoading] = useState(false);

  //error message
  const [ErrMessage, SetErrMessage] = useState("");

  function HandelFormChange(e) {
    SetForm({ ...form, [e.target.name]: e.target.value });
  }

  // send data to api link
  async function HandelSubmit(e) {
    e.preventDefault();
    SetLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/${LoginEndPoint}`, form);
      SetLoading(false);
      const Token = res.data.token;
      cookie.set("user", Token);
      navgaite("/dashboard/users", { replace: true });
    } catch (err) {
      SetLoading(false);
      console.log(err);
      if (err.response.status === 401) {
        SetErrMessage(" wrong Email or password");
      } else {
        SetErrMessage("Internal Server Error");
      }
    }
  }

  return (
    <>
      {Loading && <LoadingSpinner />}
      <div className="container">
        <div className="row h-100">
          <Form className="form mt-4" onSubmit={HandelSubmit}>
            <div className="custom-form ">
              <h1>Sign In</h1>
              <Form.Group
                className="mb-3 mt-4 form-element"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={HandelFormChange}
                  value={form.email}
                  required
                />
                <Form.Label>Email </Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3 mt-4 form-element"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={HandelFormChange}
                  value={form.password}
                  required
                  minLength="8"
                  placeholder="password "
                />
                <Form.Label>Password </Form.Label>
              </Form.Group>
              <button className="btn btn-primary m-2" type="submit">
                Login
              </button>
            </div>
            <div class="google-btn">
              <a href={"http://127.0.0.1:8000/login-google"}>
                <div class="google-icon-wrapper">
                  <img class="google-icon" src={GoogleImg} />
                </div>
                <p class="btn-text">
                  <b>Sign in with google</b>
                </p>
              </a>
            </div>
            {ErrMessage !== "" && <span className="error">{ErrMessage}</span>}
          </Form>
        </div>
      </div>
    </>
  );
}
