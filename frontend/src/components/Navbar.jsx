import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser,loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  
  if (loading) {
    return null;
  }

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const handleLogout = async () => {
    // backend logout api call if you have
    setUser(null);
    navigate("/login");
  };

  /* 🔐 LOGIN / REGISTER NAVBAR */
  if (isAuthPage) {
    return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            SafarSetu
          </Link>

          <div className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-indigo-600">
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  /* 🏠 AFTER LOGIN / NORMAL NAVBAR */
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 tracking-wide"
          >
            SafarSetu
          </Link>

          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/trips" className="text-gray-700 hover:text-indigo-600">
                Trips
              </Link>

              <Link
                to="/bookings"
                className="text-gray-700 hover:text-indigo-600"
              >
                Bookings
              </Link>

              {user.role === "ADMIN" && (
                <Link
                  to="/createTrip"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Create Trip
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
