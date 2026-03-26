import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) return null;

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/";

  const handleLogout = async () => {
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    .ss-navbar {
      position: sticky;
      top: 0;
      z-index: 200;
      font-family: 'DM Sans', sans-serif;
    }

    .ss-navbar-inner {
      background: rgba(5, 16, 31, 0.82);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
      box-shadow: 0 4px 32px rgba(0, 0, 0, 0.35);
    }

    .ss-navbar-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 5%;
      height: 66px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    /* Brand */
    .ss-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .ss-brand-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #1a8fda, #22d3ee);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      box-shadow: 0 4px 14px rgba(26, 143, 218, 0.5);
      flex-shrink: 0;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .ss-brand:hover .ss-brand-icon {
      transform: rotate(-6deg) scale(1.08);
      box-shadow: 0 6px 20px rgba(26, 143, 218, 0.7);
    }
    .ss-brand-name {
      font-family: 'Syne', sans-serif;
      font-size: 20px;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.3px;
      line-height: 1;
    }
    .ss-brand-name span {
      color: #22d3ee;
    }

    /* Auth-page nav links */
    .ss-auth-links {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ss-auth-link {
      font-size: 13px;
      font-weight: 400;
      color: rgba(180, 210, 240, 0.65);
      text-decoration: none;
      padding: 7px 16px;
      border-radius: 100px;
      border: 1px solid transparent;
      transition: all 0.2s;
      letter-spacing: 0.2px;
    }
    .ss-auth-link:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(255, 255, 255, 0.12);
    }
    .ss-auth-link-cta {
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      text-decoration: none;
      padding: 8px 20px;
      border-radius: 100px;
      background: linear-gradient(135deg, #1a8fda, #0a5fa8);
      border: none;
      box-shadow: 0 3px 14px rgba(26, 143, 218, 0.45);
      transition: all 0.2s;
    }
    .ss-auth-link-cta:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(26, 143, 218, 0.6);
    }

    /* Main nav links */
    .ss-nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
    }
    .ss-nav-link {
      font-size: 13.5px;
      font-weight: 400;
      color: rgba(175, 210, 235, 0.6);
      text-decoration: none;
      padding: 7px 15px;
      border-radius: 10px;
      transition: all 0.2s;
      position: relative;
      letter-spacing: 0.1px;
    }
    .ss-nav-link:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.07);
    }
    .ss-nav-link.active {
      color: #fff;
      background: rgba(26, 143, 218, 0.15);
      font-weight: 500;
    }
    .ss-nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 2px;
      border-radius: 2px;
      background: #22d3ee;
    }
    .ss-admin-link {
      font-size: 12px;
      font-weight: 600;
      color: #f4b942;
      background: rgba(244, 185, 66, 0.1);
      border: 1px solid rgba(244, 185, 66, 0.2);
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 100px;
      letter-spacing: 0.3px;
      transition: all 0.2s;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }
    .ss-admin-link:hover {
      background: rgba(244, 185, 66, 0.18);
      color: #f4b942;
      border-color: rgba(244, 185, 66, 0.4);
      transform: translateY(-1px);
    }
    .ss-admin-link.active {
      background: rgba(244, 185, 66, 0.2);
    }

    /* User area */
    .ss-user-area {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-left: 16px;
      border-left: 1px solid rgba(255, 255, 255, 0.09);
    }
    .ss-avatar-link {
      display: block;
      text-decoration: none;
      transition: transform 0.2s;
    }
    .ss-avatar-link:hover {
      transform: scale(1.06);
    }
    .ss-avatar-img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(34, 211, 238, 0.4);
      display: block;
    }
    .ss-avatar-initial {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a8fda, #22d3ee);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13.5px;
      font-weight: 700;
      font-family: 'Syne', sans-serif;
      border: 2px solid rgba(34, 211, 238, 0.3);
      box-shadow: 0 2px 10px rgba(26, 143, 218, 0.35);
      transition: box-shadow 0.2s;
    }
    .ss-avatar-link:hover .ss-avatar-initial {
      box-shadow: 0 4px 16px rgba(26, 143, 218, 0.55);
    }
    .ss-logout-btn {
      font-size: 13px;
      font-weight: 500;
      color: rgba(210, 235, 255, 0.7);
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.11);
      padding: 7px 17px;
      border-radius: 10px;
      cursor: pointer;
      font-family: 'DM Sans', sans-serif;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ss-logout-btn:hover {
      background: rgba(248, 113, 113, 0.1);
      border-color: rgba(248, 113, 113, 0.25);
      color: #fca5a5;
    }

    /* Guest links */
    .ss-guest-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .ss-guest-sign-in {
      font-size: 13px;
      font-weight: 400;
      color: rgba(175, 210, 235, 0.65);
      text-decoration: none;
      padding: 7px 16px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.2s;
    }
    .ss-guest-sign-in:hover {
      background: rgba(255, 255, 255, 0.07);
      color: #fff;
    }
    .ss-guest-register {
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      text-decoration: none;
      padding: 7px 18px;
      border-radius: 10px;
      background: linear-gradient(135deg, #1a8fda, #0a5fa8);
      box-shadow: 0 3px 12px rgba(26, 143, 218, 0.4);
      transition: all 0.2s;
    }
    .ss-guest-register:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(26, 143, 218, 0.55);
    }

    @media (max-width: 640px) {
      .ss-nav-links { display: none; }
      .ss-brand-name { font-size: 18px; }
    }
  `;

  // Auth page (login/register)
  if (isAuthPage) {
    return (
      <nav className="ss-navbar">
        <style>{styles}</style>
        <div className="ss-navbar-inner">
          <div className="ss-navbar-content">
            <Link to="/" className="ss-brand">
              <div className="ss-brand-icon">✈</div>
              <span className="ss-brand-name">Safar<span>Setu</span></span>
            </Link>
            <div className="ss-auth-links">
              <Link to="/login" className="ss-auth-link">Login</Link>
              <Link to="/register" className="ss-auth-link-cta">Register →</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="ss-navbar">
      <style>{styles}</style>
      <div className="ss-navbar-inner">
        <div className="ss-navbar-content">

          {/* Brand */}
          <Link to="/" className="ss-brand">
            <div className="ss-brand-icon">✈</div>
            <span className="ss-brand-name">Safar<span>Setu</span></span>
          </Link>

          {user ? (
            <>
              {/* Nav links */}
              <div className="ss-nav-links">
                <Link
                  to="/trips"
                  className={`ss-nav-link${isActive("/trips") ? " active" : ""}`}
                >
                  🗺 Trips
                </Link>
                <Link
                  to="/bookings"
                  className={`ss-nav-link${isActive("/bookings") ? " active" : ""}`}
                >
                  🎫 Bookings
                </Link>
                {user?.role?.toUpperCase() === "ADMIN" && (
                  <Link
                    to="/createTrip"
                    className={`ss-admin-link${isActive("/createTrip") ? " active" : ""}`}
                  >
                    ＋ Create Trip
                  </Link>
                )}
              </div>

              {/* User area */}
              <div className="ss-user-area">
                <Link to="/profile" className="ss-avatar-link">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="ss-avatar-img"
                    />
                  ) : (
                    <div className="ss-avatar-initial">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </Link>
                <button onClick={handleLogout} className="ss-logout-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="ss-guest-links">
              <Link to="/login" className="ss-guest-sign-in">Sign in</Link>
              <Link to="/register" className="ss-guest-register">Get Started →</Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;