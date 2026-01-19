import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) return null;

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const handleLogout = async () => {
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600";

 //login / register
  if (isAuthPage) {
    return (
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            SafarSetu
          </Link>

          <div className="space-x-6 text-sm">
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>
            <Link to="/register" className="hover:text-indigo-600">
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          <Link
            to="/"
            className="text-2xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide"
          >
            SafarSetu
          </Link>

         
          {user ? (
            <div className="flex items-center gap-6 text-sm">
              <Link to="/trips" className={isActive("/trips")}>
                Trips
              </Link>

              <Link to="/bookings" className={isActive("/bookings")}>
                Bookings
              </Link>

              {user?.role.toUpperCase() === "ADMIN" && (
                <Link
                  to="/createTrip"
                  className={isActive("/createTrip")}
                >
                  Create Trip
                </Link>
              )}

            
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-x-6 text-sm">
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
