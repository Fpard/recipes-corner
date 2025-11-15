// Import React Bootstrap components
import { Modal, Button } from "react-bootstrap";
// Import React types
import { type FC } from "react";
// Import types
import type { Recipe } from "../../types";
//import { sharedSelectedRecipe, getSharedSelectedRecipe, setSharedSelectedRecipe} from '../pages/shared-state';
// Import React Router components for navigation
import { useNavigate, useParams } from "react-router-dom";

// Define the props interface for this component
interface DeleteRecipeModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  recipe: Recipe;
}

// Define the DeleteModal component
const DeleteRecipeModal: FC<DeleteRecipeModalProps> = ({
  show,
  onHide,
  onConfirm,
  recipe,
}) => {

 // recipe = getSharedSelectedRecipe();
  const navigate = useNavigate(); 
  // Handler function to handle confirmation
    const handleConfirm = () => {
    handleDelete();
    onConfirm();
    onHide();
  };

  // Function to handle recipe deletion
  const handleDelete = async () => {
    if (!recipe) return;
       //console.log(" in handledelete function modal recipe id: " + recipe.id)
    try {
      // Make API call to delete the recipe
      const response = await fetch(
        `https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes/${recipe?.id}`,
        //`http://localhost:3000/recipes/${recipe.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }

      // Redirect to recipes page after successful deletion
      navigate("../../recipes");
    } catch (err) {
      console.error("Error deleting recipe:", err);
    } finally {
      
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {recipe ? (
          <p>
            Are you sure you want to delete the{" "}
            <strong>
              {recipe.type} 
            </strong>
              {" "} recipe named: {" "}
            <strong>
                { recipe.name} 
            </strong>
             ? This action cannot be undone.
          </p>
        ) : (
          <p>
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRecipeModal;