import { useContext } from "react";
import {Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Navber = () => {
  const {user, logOut} = useContext(AuthContext);
  
  console.log(user);
  const handleLogOut= () => { 
    logOut()
    .then(result=>{
      //  toast.success("User logged out")
       console.log("User logged out", result.user)
  
    })
    .catch(error=>{
      // toast.error("Error logging out" + error.message)
      console.log("Error logging out", error.message);
    })
  };
    const navLinkStyle = ({ isActive, isPending }) => {
        return {
        fontWeight: isActive ? "bold" : "",
        color: isPending ? "red" : isActive ?"red" : "black"
        };
    }
  const navlinks = (
    <>
      <li>
        <NavLink to="/" style={navLinkStyle}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/about" style={navLinkStyle}>About</NavLink>
      </li>
      <li>
        <NavLink to="/login" style={navLinkStyle}>Login</NavLink>
      </li>
      <li>
        <NavLink to="/register" style={navLinkStyle}>Register</NavLink>
      </li>
     
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
             {navlinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navlinks}
          </ul>
        </div>
        <div className="navbar-end">
          {user?<>
          <span>{user.displayName}</span>
          <a onClick={handleLogOut} className="btn btm-sm">Sign Out</a>
          </>:
          <Link to='/login'><button className="btn btn-sm">Login</button></Link>
          }
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navber;
