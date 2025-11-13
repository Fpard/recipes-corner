// Import React Bootstrap components
import { Modal, Button } from "react-bootstrap";
// Import React types
import { type FC } from "react";
// Import types
import type { Recipe } from "../../types";

// Define the props interface for this component
interface DeleteRecipeModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  recipe: Recipe | null;
}

// Define the DeleteModal component
const DeleteRecipeModal: FC<DeleteRecipeModalProps> = ({
  show,
  onHide,
  onConfirm,
  recipe,
}) => {
  // Handler function to handle confirmation
  const handleConfirm = () => {
    onConfirm();
    onHide();
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
              {recipe.type} {recipe.name} {recipe.id}
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