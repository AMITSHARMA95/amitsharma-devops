import Navbar from "../components/Navbar";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "MacBook Pro",
      price: 150000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
      id: 2,
      name: "iPhone 15",
      price: 80000,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab"
    },
    {
      id: 3,
      name: "Headphones",
      price: 12000,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    }
  ];

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="hero-title mb-2">Premium Products</h1>
        <p className="mb-4">Cloud-native shopping experience powered by Kubernetes 🚀</p>

        <div className="row">
          {products.map((p) => (
            <div className="col-md-4 mb-4" key={p.id}>
              <div className="product-card h-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="img-fluid rounded mb-3"
                  style={{ height: "220px", width: "100%", objectFit: "cover" }}
                />
                <h3>{p.name}</h3>
                <p className="price">₹{p.price}</p>
                <button className="btn btn-main w-100" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
