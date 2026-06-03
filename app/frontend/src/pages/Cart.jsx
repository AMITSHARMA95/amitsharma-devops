import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    localStorage.setItem("orders", JSON.stringify(cart));
    localStorage.removeItem("cart");
    navigate("/orders");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="hero-title mb-4">Your Cart 🛒</h1>

        {cart.length === 0 ? (
          <div className="glass-card">
            <h3>Your cart is empty</h3>
          </div>
        ) : (
          <>
            {cart.map((item, index) => (
              <div className="glass-card mb-3 d-flex align-items-center justify-content-between" key={index}>
                <div>
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <h4>₹{item.price}</h4>
              </div>
            ))}

            <div className="glass-card mt-4">
              <h3>Total: ₹{total}</h3>
              <button className="btn btn-main mt-3" onClick={placeOrder}>
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
