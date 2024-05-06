import React, { useEffect, useState } from "react";
import './css/Navbar.css'; 
import { useToast } from "@chakra-ui/react";
// import logo from "../logo.svg"
// import logo from "../logo.jpeg"
import logo from "../logo1.png"
 


const Navbar = () => {

  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [menuOpen,setMenuOpen] = useState(false)
  const [loggedIn,setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const toast = useToast();

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    const email = window.localStorage.getItem("email");
    if (isLoggedIn) {
      setLoggedIn(true);
      setUserEmail(email);
    }
  }, []);
  
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setLoggedIn(false);
    toast({
      title: "Logout Successful",
      description: "You have successfully logged out.",
      status: "success",
      duration: 8000,
      isClosable: true,
    });
    window.location.href = "/";
  };

    return (
      <nav className="navbar">
        {/* Left side logo */}
        <div className="navbar__left">
          <img src={logo} alt="Logo" className="navbar__logo" />
        </div>
  
        {/* Right side options */}
        <div className="navbar__right">
          <div className="menu" onClick={()=>{
            setMenuOpen(!menuOpen)
          }}>
      <span></span>
      <span></span>
      <span></span>
          </div>
          <ul className={`navbar__list ${menuOpen ? 'open' : ''}`}>
          <li className="navbar__item"><a href="/">Home</a></li>
          
          <li className="navbar__item">
            <a
               href="https://price-forecasting-commodities.streamlit.app/"
               target="_self"
               //  rel="noopener noreferrer"
              >
              Dashboard
              </a>
          </li>
         
          {loggedIn && userEmail === "admin@gmail.com" ? null :(
            <>
            
            <li className="navbar__item">
              <a  
                  href="https://portfoliooptimization-dmjxbnte45lclf9ix2pk8p.streamlit.app/"
                  target="_self" >
                   Portfolio Suggestion
              </a>
            </li>
           
            </>
          )}
          {loggedIn ? (
            <>
             
            <li className="navbar__item"><a href="#" onClick={handleLogout}>Logout</a></li>
           
            </>
          ) : (
            <>
              <li className="navbar__item"><a href="/sign-in">Login</a></li>
             
            </>
          )}
          </ul>
        </div>
      </nav>
    );
  }
  
  export default Navbar;