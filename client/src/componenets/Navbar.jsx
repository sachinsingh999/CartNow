import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App";

const Navbar = () => {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    // ✅ FETCH PROFILE
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setUsername(res.data.user.name);
        }
      } catch (err) {
        console.log("PROFILE ERROR", err.message);
      }
    };

    // ✅ FETCH CART COUNT
    const fetchCartCount = async () => {
      try {
        const res = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          const cartData = res.data.cartData || {};
          const count = Object.values(cartData).reduce(
            (sum, qty) => sum + qty,
            0
          );
          setCartCount(count);
        }
      } catch (err) {
        console.log("CART COUNT ERROR", err.message);
      }
    };

    fetchProfile();
    fetchCartCount();
  }, [token]);

  const handleUserClick = () => {
    if (!token) navigate("/login");
    else setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          Cart<span className="text-gray-500">NOW</span>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative">
          {["/", "/about", "/product"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
            </NavLink>
          ))}

          {/* CART */}
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER */}
          <div className="relative">
            <button
              onClick={handleUserClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-100"
            >
              <User size={18} />
              {token && (
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {username || "User"}
                </span>
              )}
            </button>

            {/* DROPDOWN */}
            {token && open && (
              <div className="absolute right-0 top-12 w-44 bg-white rounded shadow-lg">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  👤 Profile
                </button>

                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/orderdetail");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Package size={16} />
                  Orders
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
