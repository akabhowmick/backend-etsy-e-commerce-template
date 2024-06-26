import "./Navbar.css";
import { useState } from "react";

import { NavLink, Outlet } from "react-router-dom";
import { NavUnlisted } from "./NavbarStyles";

import { links } from "../../utils/NavbarAndFooterLinks";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../providers/CartProvider";

import navbarLogo from "../../assets/Main/logo.png";
import { companyName } from "../../utils/HelpfulText";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthContext } from "../../providers/AuthProvider";

export const Navbar = () => {
  const { loggedIn } = useAuthContext();
  const { cartItems } = useCartContext();
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const navbarLinks = [...links];

  const CartLink = (
    <NavLink
      to="/cart"
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isPending ? "pending" : "",
          isActive ? "active" : "",
          isTransitioning ? "transitioning" : "",
        ].join(" ")
      }
    >
      <li id="cart-btn">
        <FontAwesomeIcon icon={faCartShopping} />(
        {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
      </li>
    </NavLink>
  );

  //!check if the user has already logged in
  const AccountLink = (
    <NavLink
      to={loggedIn ? "/account" : "/signin"}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isPending ? "pending" : "",
          isActive ? "active" : "",
          isTransitioning ? "transitioning" : "",
        ].join(" ")
      }
    >
      <li>
        <AccountCircleIcon fontSize="large" />
      </li>
    </NavLink>
  );

  const linksWithNavLink = (
    <div className="navbar-links-container">
      {navbarLinks.map((link, index) => (
        <NavLink
          onClick={() => setShowNavbar(false)}
          key={index}
          to={link.value}
          className={({ isActive, isPending, isTransitioning }) =>
            [
              isPending ? "pending" : "",
              isActive ? "active" : "",
              isTransitioning ? "transitioning" : "",
            ].join(" ")
          }
        >
          <li>{link.key}</li>
        </NavLink>
      ))}
      {AccountLink}
      {CartLink}
    </div>
  );

  const logoHeaderLink = (
    <NavLink onClick={() => setShowNavbar(false)} to="/" id="logo-with-title">
      <img className="navbar-logo" src={navbarLogo} alt="tkd-main-logo" />
      <h2>{companyName}</h2>
    </NavLink>
  );

  return (
    <div className="root-layout">
      <header className="nav-bar">
        <nav>
          <NavUnlisted
            aria-label="Larger viewport navigation menu with links"
            className="main-navbar-ul"
          >
            <ul className="main-regular-links">{linksWithNavLink}</ul>

            <div className="menu-icon" onClick={handleShowNavbar}>
              <MenuIcon />
            </div>
            <div className="cart-small-screen">{CartLink}</div>
            <div className="cart-small-screen">{AccountLink}</div>
            {showNavbar && (
              <div className="nav-elements">
                <ul>{linksWithNavLink}</ul>
              </div>
            )}
            {logoHeaderLink}
          </NavUnlisted>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
