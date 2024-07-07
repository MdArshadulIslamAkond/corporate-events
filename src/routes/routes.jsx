import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Login from "../Login/Login";
import Register from "../Register/Register";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            { path: "/", 
              element: <h1>Home</h1>, 
            },
            { path: "about", 
              element: <h1>About Page</h1> 
            },
            { path: "login",  
              element: <Login/>
            },
            { path: "register",   
              element: <Register/> 
            },
        ],
    },
]);
export default router;