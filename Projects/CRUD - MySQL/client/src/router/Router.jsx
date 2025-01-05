import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import Create from "../pages/Create.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        { path: "/", element: <Home /> },
        { path: "/create", element: <Create /> },
    ],
  },
]);

export default Router;
