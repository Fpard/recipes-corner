// Import React Bootstrap components
import { Modal, Button, Form } from "react-bootstrap";
// Import React hooks and types
import { useState, type FC, useEffect } from "react";
// Import types
import type { Recipe } from "../../types";

// Define the props interface for this component
interface EditRecipeModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (recipeData: Recipe) => void;
  recipe: Recipe | null;
}

// Define the EditRecipeModal component
const EditRecipeModal: FC<EditRecipeModalProps> = ({
  show,
  onHide,
  onSubmit,
  recipe,
}) => {
  // State for form data
  const [formData, setFormData] = useState<Recipe>({
    id: 0,
    name: "",
    type: "",
    ingredients: [""],
    comments: [""]
  });
      
  
      // Update form data when recipe prop changes
  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    }
  }, [recipe]);

  // Handler function to handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("name "+ name);
    console.log("value " + value);
    if (name === 'ingredients') {
      // Handle array field (e.g., comma-separated tags)
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(',').map(tag => tag.trim()), // Split by comma and trim whitespace.checked : value,*/
    }));
    } else
         if (name === 'comments') {
      // Handle array field (e.g., comma-separated tags)
         setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map(tag => tag.trim()), // Split by comma and trim whitespace
      }));
    } else{
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      }));
    }
  };

  // Handler function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedRecipe = {
      ...formData,
      
    };
    onSubmit(updatedRecipe);
  };

  // Handler function to handle modal close
  const handleClose = () => {
    onHide();
  };

  return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name (e.g., bacalao)"
                required
              />
            </Form.Group>
  
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="Enter type (e.g., Vegan)"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ingredients (comma-separated:)</Form.Label>
              <Form.Control type="input" 
                              name= "ingredients"
                              value= {formData.ingredients}
                              onChange={handleInputChange}
                              placeholder="Enter recipe items)"
                              required
                              className="border p-2 w-full"
                          />
                                     
            </Form.Group>
            
  
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="input"
                             name="comments"
                             value={formData.comments}
                             onChange={handleInputChange}
                             placeholder="Enter comments)"
                             required
                             className="border p-2 w-full"
                          />
            </Form.Group>
            
  
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Edit Recipe
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default EditRecipeModal;
