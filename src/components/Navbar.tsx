import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar as AppNavbar} from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import ToolbarBtn from "./ToolbarBtn.tsx";
import { useState } from 'react';
import SelectRecipeType from "./SelectRecipeType.tsx";

export default function Navbar(){
// useLocation hook gets the current URL path
  //To highlight the active navigation link
  const location = useLocation();
  // Use this variable to store the selected value of the chosen recipe type to display.
  const [recipeTypeSelection, setRecipeTypeSelection] = useState("Pick a type")
     
  return(
        // AppNavbar provides the navigation bar styling and behavior
    <AppNavbar bg="dark" variant="dark" expand="sm" className="mb-0">
      <Container >
        {/* Brand/logo that links to home page */}
        <AppNavbar.Brand as={Link} to="/">
           Recipes' Corner
        </AppNavbar.Brand>
        
        {/* Hamburger menu button for when browser window shrinks  */}
        <AppNavbar.Toggle aria-controls="basic-navbar-nav" />

         {/* Navigation links that collapse when browser window shrinks */}
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
            {/* A dropdown menu that allows the user to look at recipes by types.
             It is reset by clicking on the reset button next to it*/}  
            <SelectRecipeType
              recipeTypeSelection= {recipeTypeSelection}
              setRecipeTypeSelection={setRecipeTypeSelection}
            />
            {/* Right side - Add, edit, delete and comment Recipe buttons */}
              <ToolbarBtn />
          </Nav>
        </AppNavbar.Collapse>
      </Container>
    </AppNavbar>
  );
}
    