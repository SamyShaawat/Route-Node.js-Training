import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link} from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="container py-5">
        <div className="card shadow rounded">
          <div className="card-header bg-primary text-white text-center">
            <h2>Student List</h2>
            <div className="d-flex justify-content-end">
              <Link to="/create" className="btn btn-success">
              Create +
              </Link>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>
                      <Link to={`/read/${user.id}`}className="btn btn-sm btn-info">Read</Link>
                      <button className="btn btn-sm btn-warning mx-2">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer text-center text-muted">
            Showing {data.length} students
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
