import Navbar from "../components/Navbar";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  const total = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="hero-title mb-4">Order Summary ✅</h1>

        {orders.length === 0 ? (
          <div className="glass-card">
            <h3>No orders placed yet</h3>
          </div>
        ) : (
          <div className="glass-card">
            <h3 className="mb-4">Order Placed Successfully 🎉</h3>

            {orders.map((item, index) => (
              <div className="d-flex justify-content-between border-bottom py-3" key={index}>
                <div>
                  <h5>{item.name}</h5>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <h5>₹{item.price}</h5>
              </div>
            ))}

            <h3 className="mt-4">Total Paid: ₹{total}</h3>
          </div>
        )}
      </div>
    </>
  );
}
