import {Container} from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer.tsx";
import { Outlet } from "react-router-dom";
// Import React useState for managing component state
import { useState } from "react";
//Modal forms to manipulate recipes.
import NewRecipeModal from "./modals/NewRecipeModal";
import EditRecipeModal from "./modals/EditRecipeModal";
import DeleteRecipeModal from "../components/modals/DeleteRecipeModal";

import { getSharedSelectedRecipe} from './pages/shared-state.ts'

function Layout() {
    // State to control whether the new recipe modal is shown or hidden
  const [showNewRecipeModal, setShowNewRecipeModal] = useState(false);
  const [showEditRecipeModal, setShowEditRecipeModal] = useState(false);
  const [showDeleteRecipeModal, setShowDeleteRecipeModal] = useState(false);
    return (// Main app container - navbar will always be visible
    <div className="app-container">
      {/* Navbar component that appears on all pages */}
      <Navbar/>
      
      {/* Main content area - this is where pages render */}
      <main className="main-content">
        <Container>
          <Outlet />
        </Container>
      </main>

      {/* Modal for creating new recipes */}
      {/* This modal can be opened from the navbar */}
      {<NewRecipeModal
        show={showNewRecipeModal}
        onHide={() => setShowNewRecipeModal(false)}
      />}
      {/* Modal for editing a recipe */}
      {/* This modal can be opened from the navbar */}
       {<EditRecipeModal
        show={showEditRecipeModal}
        onHide={() => setShowEditRecipeModal(false)}
        recipe={getSharedSelectedRecipe()}
      />}
      {/* Modal for deleting a recipe */}
      {/* This modal can be opened from the navbar */}

       {<DeleteRecipeModal
        show={showDeleteRecipeModal}
        onHide={() => setShowDeleteRecipeModal(false)}
        onConfirm={() => setShowDeleteRecipeModal(false)}
        recipe={getSharedSelectedRecipe()!}
      />}

      {/* Footer component that appears on all pages */}
      <Footer/>

    </div>
  );

}
export default Layout;
