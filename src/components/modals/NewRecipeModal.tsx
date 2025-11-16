// Import React Bootstrap components
import { Modal, Button, Form } from "react-bootstrap";
import { useState,   } from 'react';
import { useForm, useFieldArray, } from "react-hook-form";
//import {DevTool} from "@hookform/devtools";
// Import types
import type { NewRecipe } from "../../types";

// Define the props interface for this component
interface NewRecipeModalProps {
  show: boolean;
  onHide: () => void;
  
}

// Define the NewRecipeModal component
const NewRecipeModal = ({ show, onHide }: NewRecipeModalProps) => {

  // State for form data
   const form = useForm<NewRecipe>({
   defaultValues:{
    authorName:"",
    name: "",
    type: "",
    ingredients: [{ingredient:""}],
    comments: [{comment:""}],
  }});
    
  
    const {register, control, handleSubmit} = form;
        
    //const {errors} = formState;
    const [error, setError] = useState("");
    
    const {fields:ingredientFields, append: appendIngredients, remove: removeIngredients} = useFieldArray({
        control,
        name: 'ingredients',
        
      });

    const {fields: commentsFields, append: appendComments, remove: removeComments} = useFieldArray(  
      {  
        control,
        name: 'comments',
      });   
     
  
   const onSubmit = async (data:NewRecipe) => {
   // console.log("form submitted: ");
   // const jsonData = JSON.stringify(data);
   //      console.log("form submitted: ",data + "n\jsonData: "+ jsonData);
   
    try {
      // Make API call to create new recipe
      const response = await fetch(
        `https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes`,
       //"http://localhost:3000/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      // Reset form and close modal on success
     onHide();

      // Refresh the page to show the new recipe
      window.location.reload();
    } catch (err) {
      setError("Failed to create recipe. Please try again.");
      console.error('Submission failed:', error);
    } finally {
    //  setIsLoading(false);
    }
  };
    
  // Handler function to handle modal close
  const handleClose = () => {
       onHide();
  };
  return (
    <div >
          <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Add New Recipe</Modal.Title>
              </Modal.Header>
              <Modal.Body >
                <Form onSubmit={handleSubmit(onSubmit)} className="mb-3" >
                  <div>
                    <label htmlFor="name">Recipe Author's Name</label>
                    <input 
                      type="text"
                      id="authorName"
                      {...register("authorName",{ required: true })}
                      placeholder="Enter your name (e.g., Andrea, Granpa Kiko)"
                      
                    />
                  </div> 
                  <div>
                    <label htmlFor="name">Recipe Name</label>
                    <input 
                      type="text"
                      id="name"
                      {...register("name",{ required: true })}
                      placeholder="Enter recipe name (e.g., bacalao)"
                      
                    />
                  </div>  
                  <div>
                  <label htmlFor="type">Recipe Type</label>
                  <input
                      type="text"
                      id="type"
                      {...register("type",{ required: 'type is required' } )}
                      placeholder="Enter type (e.g., Vegan)"
                  />
                  </div>

                  <div>
                      <label htmlFor="ingredients">Ingredients</label>
                      <div>
                          {ingredientFields.map((field, index) => {
                          return(
                          <div className="form-control" key={field.id}>
                            <input type="text" 
                                {...register(`ingredients.${index}.ingredient` as const, { required: true })}/>
                                  { index > 0 && (
                                    <button type="button" onClick={() => removeIngredients(index)}>
                                      Remove an Ingredient
                                    </button>
                                  )}
                          </div> 
                            );
                        })}      
                        {
                            ingredientFields.length < 4 && (
                              <button type="button" onClick={() => appendIngredients({ingredient: ""})}>
                                Add ingredient
                              </button>
                            )
                          } 
                      </div>
                  </div>

                <div>
                  <label htmlFor="comments">Additional Comments</label>
                  
                  <div>
                        {commentsFields.map((field, index) => {
                            return(
                                <div className="form-control" key={field.id}>
                                    <input type="text" {...register(`comments.${index}.user` as const)}
                                    placeholder="Enter your name"/>
                                    
                                    <input type="text" {...register(`comments.${index}.comment` as const)}
                                    placeholder="Enter your comment" />
                                    {
                                      index > 0 && (
                                        <button type="button" onClick={() => removeComments(index)}>
                                          Remove a comment
                                        </button>
                                      )
                                    }
                                </div>      
                              );
                            })}
                                      
                            <button type="button" onClick={() => appendComments({user: '', comment: ''})}>
                              Add comment
                            </button>
                      </div>
                      <Button type="submit" variant="primary">
                          Add Recipe
                          </Button>
                </div>
                </Form> 
              </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose} align-left>
                          Cancel
                        </Button>
                </Modal.Footer>
        
          </Modal>
     </div>
  );
  
}

export default NewRecipeModal;