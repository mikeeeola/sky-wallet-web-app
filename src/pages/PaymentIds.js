/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

function PaymentIds() {
  const [search, setSearch] = useState("");
  const userId = localStorage.getItem("id");
  const [paymentId, setPaymentId] = useState([]);
  const [record, setRecord] = useState({
    error: "",
  });

  const searchPaymentId = () => {
    axios.get(`api/payment-id/search/${search}`).then((res) => {
      if (res.data.payment.length === 0) {
        setRecord({error: 'No user found'});
        console.log('error');
      } else {
        setRecord(res.data.payment);
        console.log(res.data.payment);
      }
    });
  };

  const loadPaymentsId = () => {
    axios
      .get(`api/get-user-payment-id/${userId}`)
      .then((res) => {
        console.log(res.data.payment);
        const payId = res.data.payment;
        setPaymentId(payId);
      })
      .catch();
  };

  useEffect(() => {
    loadPaymentsId();
  }, []);

  const deletePaymentId = (id) => {
    axios
      .delete(`api/payment-id/delete/${id}`)
      .then((result) => {
        loadPaymentsId();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };

  function generatePaymentId(e) {
    e.preventDefault();
    try {
      axios.get(`api/user/${userId}/generate-pay-id`).then((res) => {
        if (res.data.count <= 4) {
          swal("Success", "Payment ID generated successfully", "success");
          console.log(res.data.payment);
          loadPaymentsId();
        } else {
          swal("Error", "Maximum number of Payment ID reached", "error");
          console.log("Error");
        }
      });
    } catch (err) {
      swal("Error", "Maximum number of Payment ID reached", "error");
      console.log("Error");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              <h4>
                Payment IDs
                <button
                  onClick={generatePaymentId}
                  className="btn btn-primary btn-sm float-end"
                >
                  Generate Payment ID
                </button>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-hover table-striped table-bordered ml-4 ">
                <thead>
                  <tr>
                    <th>Payment Id</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentId.map((pay) => (
                    <tr key={pay.id}>
                      <td>{pay.payment_id}</td>
                      <td>
                        <button
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "Do you really want to delete " + pay.payment_id
                            );
                            if (confirmBox === true) {
                              deletePaymentId(pay.id);
                            }
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <input
                type="text"
                className="form-control"
                placeholder="Search Payment Id"
                name="payId"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={searchPaymentId}
                className="btn btn-primary mt-2"
              >
                Search
              </button>
              <div className="mt-2">
                {record.length > 0 ? (
                  record.map((res) => (
                    <h4 key={res.id}>User: {res.users[0].name}</h4>
                  ))
                ) : (
                  <h5>{record.error}</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentIds;
