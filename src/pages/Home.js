function Home() {
  const email = localStorage.getItem("auth_email");
  const payId = localStorage.getItem("payment_id");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>User Details</h4>
            </div>
            <div className="card-body">
              <h4>Email</h4>
              <p>{email}</p>
              <h4>Payment ID</h4>
              <p>{payId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
