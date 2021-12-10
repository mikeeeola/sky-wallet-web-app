import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      phone: registerInput.phone,
      password: registerInput.password,
    };

    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`api/register`, data).then((res) => {
        if (res.data.status === 200) {
            console.log(res.data);
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem('auth_email', res.data.email);
            localStorage.setItem('payment_id', res.data.paymentId);
            swal("Success", res.data.message, "success");
            navigate('/');
        } else {
          setRegister({
            ...registerInput,
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
              Registration
                <Link to={"/"} className="btn btn-primary btn-sm float-end">
                  BACK
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form method="POST" onSubmit={registerUser}>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInput}
                    value={registerInput.name}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {registerInput.error_list.name}
                  </span>
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={registerInput.email}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {registerInput.error_list.email}
                  </span>
                </div>
                <div className="form-group mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleInput}
                    value={registerInput.phone}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {registerInput.error_list.phone}
                  </span>
                </div>

                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={registerInput.password}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {registerInput.error_list.password}
                  </span>
                </div>

                <div className="form-group mb-3">
                  <button type="submit" className="btn btn-primary">
                    Register
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

export default Register;
