import { Link } from "react-router-dom";

const Navbar = () => {
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

          <div className="flex items-center space-x-6">
            <Link
              to="/home"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Home
            </Link>

            <Link
              to="/trips"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Trips
            </Link>

            <Link
              to="/bookings"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Bookings
            </Link>

            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
