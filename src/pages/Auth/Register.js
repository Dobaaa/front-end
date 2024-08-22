import axios from "axios";
import { useState } from "react";
import { RegisterEndPoint, baseUrl } from "../../Api/Api";
import LoadingSpinner from "../../components/Loading/Loading";
import Cookie from "cookie-universal";
import GoogleImg from "../../assets/google.jpg";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navgaite = useNavigate();
  // make more than state in one  state
  const [form, SetForm] = useState({
    name: "",
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
      const res = await axios.post(`${baseUrl}/${RegisterEndPoint}`, form);
      SetLoading(false);
      const Token = res.data.token;
      cookie.set("user", Token);
      navgaite("/dashboard/users", { replace: true });
    } catch (err) {
      SetLoading(false);
      console.log(err);
      if (err.response.status === 422) {
        SetErrMessage("Email is already been taken");
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
            <div className="custom-form">
              <h1>Sign Up Now</h1>
              <Form.Group
                className="mb-3 mt-4 form-element"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="name"
                  type="textt"
                  onChange={HandelFormChange}
                  value={form.name}
                  placeholder="Full Name "
                  required
                />
                <Form.Label>Name </Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3 mt-4 form-element"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="email"
                  type="email"
                  onChange={HandelFormChange}
                  value={Form.email}
                  placeholder="email"
                  required
                />
                <Form.Label>Email </Form.Label>
              </Form.Group>
              <Form.Group
                className="mb-3 mt-4 form-element"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="password"
                  type="password"
                  onChange={HandelFormChange}
                  value={form.password}
                  placeholder="password "
                  minLength="8"
                  required
                />
                <Form.Label>password </Form.Label>
              </Form.Group>
              <button className="btn btn-primary" type="submit">
                Register
              </button>
              {ErrMessage !== "" && <span className="error">{ErrMessage}</span>}
            </div>
            <div class="google-btn mt-3">
              <a href={"http://127.0.0.1:8000/login-google"}>
                <div className="google-icon-wrapper">
                  <img className="google-icon" src={GoogleImg} />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
