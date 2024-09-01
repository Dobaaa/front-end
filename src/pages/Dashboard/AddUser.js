import { useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { RequierTokenEndPoint } from "../../Api/Api";
import LoadingSpinner from "../../components/Loading/Loading";

export default function AddUser() {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [Role, SetRole] = useState("");
  const [Loading, SetLoading] = useState(false);

  async function HandelSubmit(e) {
    SetLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${RequierTokenEndPoint}/add`, {
        name: name,
        email: email,
        password: password,
        role: Role,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      SetLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      {Loading && <LoadingSpinner />}
      <Form onSubmit={HandelSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label> User Naame</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => SetName(e.target.value)}
            placeholder="name ..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="new email....."
            onChange={(e) => SetEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="new pass....."
            onChange={(e) => SetPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Role</Form.Label>
          <Form.Select
            placeholder="put role....."
            onChange={(e) => SetRole(e.target.value)}
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="1996">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
          </Form.Select>
        </Form.Group>
        <button className="btn btn-primary">Add</button>
      </Form>
    </>
  );
}
