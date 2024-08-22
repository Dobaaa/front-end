import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../Api/Axios";
import { RequierTokenEndPoint } from "../../Api/Api";
import LoadingSpinner from "../../components/Loading/Loading";

export default function UserDetails() {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [disable, SetDisabel] = useState("");
  const [Loading, SetLoading] = useState(false);
  const ID = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    Axios.get(`${RequierTokenEndPoint}/${ID}`)
      .then((data) => {
        console.log(data);
        SetName(data.data.name);
        SetEmail(data.data.email);
      })
      .then(() => SetDisabel(false));
  }, []);
  async function HandelSubmit(e) {
    SetLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${RequierTokenEndPoint}/edit/${ID}`, {
        name: name,
        email: email,
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
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
