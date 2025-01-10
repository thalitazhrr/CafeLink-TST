import rLAuth from "./AuthRoutes";
import rLNav from "./WithNavRoutes";
import rLGuarded from "./GuardedRoutes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const routeList = createBrowserRouter([...rLAuth, ...rLNav, ...rLGuarded]);
const Routes = () => {
    return <RouterProvider router={routeList} />;
  };
  
  export default Routes;