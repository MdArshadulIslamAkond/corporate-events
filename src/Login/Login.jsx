import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Login = () => {
  const {signIn} =  useContext(AuthContext)
    const handleLogin = (e)=>{
        e.preventDefault();
        console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        console.log(email, password);
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
          toast.warn("please write a valid email address");
          // console.log("please write a valid email address");
          return;
        }
        else if (
          !/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
            password
          )
        ) {
          toast.warn("please write a valid password");
          return;
        }

        // sign In methode

        signIn(email, password)
        .then((result) => { 
          toast.success("User signed in successfully!", {autoClose:8000})
          console.log("User signed in successfully!", result.user);
        })
        .catch((error) => {
          toast.error("Invalid email or password!" + error.message)
          console.error("Error signing in user: ", error);
        });
      }
  
  return (
    <div>
      <div className="">
        <h2 className="text-3xl my-10 text-center">Login your account</h2>
        <form
          onSubmit={handleLogin}
          className="card-body md:w-3/4 lg:w-1/2 mx-auto bg-base-200"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a
                href="#"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          <p className="font-bold text-center">
            Dont’t Have An Account ? <Link to="/register"> Register </Link>
          </p>
        </form> 
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
