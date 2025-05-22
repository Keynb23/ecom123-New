import './Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../../main';

function Navbar() {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = useSelector((state: RootState) =>
    state.cart?.cartItems?.length || 0
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="navbar-container">
        <nav className="navbar">

          <div className="navbar-logo">
            <NavLink to="/"><h1>FAKE</h1></NavLink>
          </div>

          <div className="navbar-links-center">
            <NavLink to="/" className="navbar-link">Home</NavLink>
            <NavLink to="/products" className="navbar-link">Products</NavLink>
            <NavLink to="/contact" className="navbar-link">Contact</NavLink>
          </div>

          <div className="navbar-right">
            <NavLink to="/cart" className="shopping-cart-button">
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartItemCount}</span>
            </NavLink>

            <div className="profile-dropdown">
              <button className="profile-button">
                <span className="profile-icon">👤</span>
              </button>
              <div className="profile-dropdown-content">
                {authState.user ? (
                  <>
                    <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                    <button onClick={handleLogout} className="dropdown-item logout-button">Logout</button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login-register" className="dropdown-item">Login / Register</NavLink>
                  </>
                )}
              </div>
            </div>

            <button className="collapsible-menu-button">
              <span className="menu-icon">☰</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;