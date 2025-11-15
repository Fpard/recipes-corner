import HomePage from "./components/pages/HomePage";
import ListRecipesPage from "./components/pages/ListRecipesPage";
import ListSingleCard from "./components/pages/ListSingleCard";
import ListSingleTypeRecipes from "./components/pages/ListSingleTypeRecipes";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.tsx";

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
       {
        path: "recipes/:id",
        element: <ListSingleCard/>,

       },
       {
        path: "/recipeType",
        element: <ListSingleTypeRecipes/>,

       },
   ],
},
]);