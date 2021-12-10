import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Login() {
  const navigate = useNavigate();
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          console.log(res.data);
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("auth_email", res.data.email);
          localStorage.setItem('payment_id', res.data.paymentId);
          swal("Success", res.data.message);
          navigate('/');
        } else {
          setLogin({
            ...loginInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>
                Login
                <Link to={"/"} className="btn btn-primary btn-sm float-end">
                  BACK
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={loginUser}>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={loginInput.email}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {loginInput.error_list.email}
                  </span>
                </div>

                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={loginInput.password}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {loginInput.error_list.password}
                  </span>
                </div>

                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
