import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    console.log(name, email, password);
    // create user email and password
    if (
      !/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
        password
      )
    ) {
      toast.warn("please write a valid password");
      return;
    }
    createUser(email, password)
      .then((result) => {
        // toast.success("User created successfully!"); // show success toast
        console.log("User created successfully!", result.user);
        updateProfile(result.user, {
          displayName: `${name}`, photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(()=>console.log("Profile updating successfully"))
        .catch(error =>{
          console.error("Error updating profile: ", error);
        });
        navigate('/');
      })
      .catch((error) => {
        // toast.error("Error creating user: " + error.message); // show error toast  if any error occurrs
        console.error("Error creating user:", error);
      });
    
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
     .then((result) => {
        console.log("User signed in with Google: ", result.user);
        updateProfile(result.user, {
          displayName: `${result.user.displayName}`, photoURL: result.user.photoURL
        })
       .then(()=>console.log("Profile updating successfully"))
       .catch(error =>{
          console.error("Error updating profile: ", error);
        });
        navigate("/")
      })
     .catch((error) => {
        console.error("Error signing in with Google: ", error);
      });
  }
  return (
    <div>
      <div className="">
        <h2 className="text-3xl my-10 text-center">Register your account</h2>
        <form
          onSubmit={handleRegister}
          className="card-body md:w-3/4 lg:w-1/2 mx-auto bg-base-200"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <input
              name="name"
              type="name"
              placeholder="Please Enter Your Name"
              className="input input-bordered"
              required
            />
          </div>
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
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
          <p className="font-bold text-center">
            Dont’t Have An Account ? <Link to="/login">Login</Link>
          </p>
          <button onClick={handleGoogleLogin} className="btn btn-primary">Google</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
