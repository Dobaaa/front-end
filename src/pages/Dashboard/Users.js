import { useEffect, useState } from "react";
import { RequierTokenEndPoint, UsersEndPoint } from "../../Api/Api";
import Table from "react-bootstrap/Table";
import { Axios } from "../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Users() {
  //states
  const [users, SetUsers] = useState([]);
  const [Currentuser, SetCurrentUser] = useState("");
  const [Nouser, SetNoUser] = useState(false);
  const [Delete, Setdelete] = useState(false);

  //get current user
  useEffect(() => {
    Axios.get(`${RequierTokenEndPoint}`).then((data) =>
      SetCurrentUser(data.data)
    );
  }, []);

  // get all users
  useEffect(() => {
    Axios.get(`/${UsersEndPoint}`)
      .then((data) => SetUsers(data.data))
      .then(() => SetNoUser(true))
      .catch((err) => console.log(err));
  }, [Delete]);

  // filter current user
  const filterUser = users.filter((item) => item.id !== Currentuser.id);

  //maping on users
  const UserShow = filterUser.map((item, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>
        {item.role === "1996"
          ? "Admin"
          : item.role === "2001"
          ? "User"
          : "Writer"}
      </td>
      <td>
        <div className="d-flex  gap-3 justify-content-center align-items-center ">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
          <FontAwesomeIcon
            color="red"
            icon={faTrash}
            cursor="pointer"
            onClick={() => HandelDelte(item.id)}
          />
        </div>
      </td>
    </tr>
  ));
  async function HandelDelte(id) {
    try {
      const res = await Axios.delete(`/${RequierTokenEndPoint}/${id}`);
      Setdelete((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-100 p-2 bg-white">
      <div className="d-flex align-items-center justify-content-between">
        <h2>users data</h2>
        <Link to="/dashboard/user/add" className="btn btn-primary">
          Add User
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr colSpan={12} className="text-center">
              loading ....
            </tr>
          ) : users.length <= 1 && Nouser ? (
            <td>no user</td>
          ) : (
            UserShow
          )}
        </tbody>
      </Table>
    </div>
  );
}
