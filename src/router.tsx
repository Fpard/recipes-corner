import HomePage from "./components/pages/HomePage";
import ListRecipesPage from "./components/pages/ListRecipesPage";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        //Props to the Navbar
        children: [
        { 
            index: true,
            element: <HomePage/>,
       
        },

       {
        path: "/recipes",
        element: <ListRecipesPage/>,

       },
   ],
},
]);