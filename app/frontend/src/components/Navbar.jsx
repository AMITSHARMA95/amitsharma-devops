import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <Link className="navbar-brand fw-bold" to="/products">
        Cloud Shop 🚀
      </Link>

      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/products">Products</Link>
        <Link className="btn btn-outline-light me-2" to="/cart">Cart</Link>
        <Link className="btn btn-outline-light" to="/orders">Orders</Link>
      </div>
    </nav>
  );
}
