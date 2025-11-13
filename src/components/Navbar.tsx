//import React from "react";
//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import {Navbar as AppNavbar} from 'react-bootstrap';
//import NavDropdown from 'react-bootstrap/NavDropdown';
// Import React Router components for navigation
import { Link, useLocation } from "react-router-dom";
import ToolbarBtn from "./ToolbarBtn.tsx";
import { useState } from 'react';
import {recipes} from "../data/recipes.ts";
import SelectRecipeType from "./sidebar/RecipeSidebar.tsx";
// Define the props interface for TypeScript
// This tells TypeScript what props this component expects
interface NavbarProps {
  onNewRecipe: () => void; // Function that will be called when "New Recipe" is clicked
}
export default function Navbar({onNewRecipe}:NavbarProps){
   // useLocation hook gets the current URL path
  // We use this to highlight the active navigation link
  const location = useLocation();
  const [recipesState, setRecipesState] = useState(recipes)
   const [recipeTypeSelection, setRecipeTypeSelection] = useState("all")
   const [recipeCardSelectedId, setRecipeCardSelectedId] = useState(-1)
   const [comments, setComments] = useState(["no", "comments"] )
   
    return(
        // AppNavbar provides the navigation bar styling and behavior
    <AppNavbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        {/* Brand/logo that links to home page */}
        <AppNavbar.Brand as={Link} to="/">
          🍳 Recipe Corner
        </AppNavbar.Brand>
        
        {/* Hamburger menu button for mobile devices */}
        <AppNavbar.Toggle aria-controls="basic-navbar-nav" />

         {/* Navigation links that collapse on mobile */}
        <AppNavbar.Collapse id="basic-navbar-nav">
          {/* Left side navigation links */}
          <Nav className="me-auto">
            {/* Home link - active when we're on the home page */}
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
              Home
            </Nav.Link>

            {/* All Recipes link - active when we're on the recipes page */}
            <Nav.Link
              as={Link}
              to="/recipes"
              active={location.pathname === "/recipes"}
            >
              All Recipes
            </Nav.Link>

            <SelectRecipeType recipeTypeSelection= {recipeTypeSelection}
                              setRecipeTypeSelection={setRecipeTypeSelection}
                              />

        </Nav>
          {/* Right side - Add, edit, delete Recipe buttons */}
          
          <ToolbarBtn recipesState={recipesState} recipeCardSelectedId = {recipeCardSelectedId}
           setRecipesState={setRecipesState} />
        </AppNavbar.Collapse>
      </Container>
    </AppNavbar>
  );
}
    