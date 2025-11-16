// Import React Bootstrap components
import { Modal, Button, Form } from "react-bootstrap";
// Import React hooks for managing component state
import { useState, useEffect } from "react";
import { useForm, useFieldArray} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
// Import types
import type { Recipe } from "../../types";
import {getSharedSelectedRecipe, setSharedSelectedRecipe} from '../pages/shared-state';
// Import React Router components for navigation
import { useNavigate, useParams } from "react-router-dom";

interface Ingredient{
  ingredient: string;
}
interface Comment{
  comment: string
}
//interface Recipe {
interface FormData {
  id: number;
  authorName: string;
  name: string;
  type: string;
  ingredients: Array<Ingredient>;
  comments: Array<Comment>;
}

// Define the props interface for this component
interface EditRecipeModalProps {
  show: boolean;
  onHide: () => void;
  recipe: Recipe | undefined;
}

// Define the EditRecipeModal component
const EditRecipeModal= ({
  show, onHide, recipe}: EditRecipeModalProps) => {
  
// Get the recipe ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // State to store any error messages
  const [error, setError] = useState("");
// State to track if we're currently saving changes
  const [isSaving, setIsSaving] = useState(false);
  // State to control the edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  // State to store the recipe data
  const [recipeFetched, setRecipeFetched] = useState<Recipe | null>(null);
// State to track if we're loading the recipe
  const [isLoading, setIsLoading] = useState(true);
   
    const formData = useForm<Recipe>({
      defaultValues:{
    authorName: recipeFetched?.authorName,     
    name: recipeFetched?.name,
    type: recipeFetched?.type,
    ingredients: recipeFetched?.ingredients,
    comments: recipeFetched?.comments,
  }});
    
 //const [apiData, setApiData] = useState<FormData | null>(null);

  const {register, control, handleSubmit, setValue, getValues} = useForm<Recipe>({
    defaultValues:{
    authorName: formData.getValues().authorName,  
    name: formData.getValues().name,
    type: formData.getValues().type,
    ingredients: formData.getValues().ingredients,
    comments: formData.getValues().comments,
  },
  });

  const {fields:ingredientFields, append: appendIngredients, remove: removeIngredients} = useFieldArray({
           control,
           name: 'ingredients',
           
         });
   
  const {fields: commentsFields, append: appendComments, remove: removeComments} = useFieldArray(  
         {  
          control,
          name: 'comments',
         }); 
   

 //This is for troubleshooting.
     const handleGetValues = () =>{
    console.log("Get values: ", getValues());
     }
  
  // Handler function to handle modal close
  const handleClose = () => {
    onHide();
    setRecipeFetched(null);
    recipe=undefined;
    setSharedSelectedRecipe(recipe)
    console.log("handle close in edit modal" + showEditModal);
     navigate("/recipes");
  };
  
  // Navigation hook to redirect after actions
  const navigate = useNavigate();   
  recipe= getSharedSelectedRecipe();

// useEffect hook runs when the component mounts or when the ID changes
  useEffect(() => {
    //console.log("id: " + id);
    const correctID = Number(id);
    if (isNaN(correctID)) return;
     if (!id ) return;
    // Function to fetch a single recipe from the API
    const fetchRecipe = async () => {
      try {
        // Make API call to get the specific recipe
        const response = await fetch(
          `https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes/${recipe?.id}`,
          //  `http://localhost:3000/recipes/${recipe?.id}`,
        );
                    
      if (!response.ok) {
            if (response.status === 404) {
              throw new Error("Recipe not found");
            }
            throw new Error("Failed to fetch recipe");
          }
          
          // State for edit form data
          const data = await response.json();
          console.log("Loading: " + isLoading);
          setRecipeFetched(data) ;      
          //console.log("recipe fetched: ");
          //console.log({recipeFetched});
          setValue('authorName', data.authorName);
          setValue('name', data.name);
          setValue('type', data.type);
          setValue('ingredients', data.ingredients);
          setValue('comments', data.comments);
          console.log("form data: "+ formData.getValues());
        } catch (err) {

          setError(err instanceof Error ? err.message : "Failed to load recipe");
          console.error("Error fetching recipe:", error);
        } finally {
          setIsLoading(false);
          
        }
      };

      // Call the function to fetch recipe
      fetchRecipe();
  }, [id]); // Dependency array includes id, so this runs when id changes

  const onSubmit = async (data:FormData) => {
     // const jsonData = JSON.stringify(data);
     //  console.log("form submitted: ",data + "n\jsonData: "+ jsonData); 
           setIsSaving(true);
     try {
      // Make API call to update the recipe
      const response = await fetch(
         `https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes/${recipe?.id}`,
       // `http://localhost:3000/recipes/${recipe?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      
      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }
      
      const updatedRecipe = await response.json();
      console.log("Saving: " + isSaving);
      console.log("just executed updateRecipe");
      console.log({handleGetValues})
      setRecipeFetched(updatedRecipe);
     handleClose();
      // Redirect to recipes page after successful deletion
      navigate("/recipes");
    } catch (err) {
      console.error("Error updating recipe:", err);
    } finally {
      setIsSaving(false);
      setShowEditModal(false);
    }
  }
   return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="editRecipe" onSubmit={handleSubmit(onSubmit)} className="mb-3">
                        <div>
                          <label htmlFor="authorName">Recipe Author's Name</label>
                          <input 
                            type="text"
                            id="authorName"
                            {...register(`authorName`)}
                            placeholder="Enter your name (e.g., Andrea, Granpa Kiko)"
                          />
                        </div>

                        <div>
                          <label htmlFor="name">Recipe Name</label>
                          <input 
                            type="text"
                            id="name"
                            {...register(`name`)}
                            placeholder="Enter name (e.g., bacalao)"
                            
                          />
                        </div>  
                        
                        <div>
                            <label htmlFor="type">Recipe Type</label>
                            <input
                                type="text"
                                id="type"
                                {...register(`type` )}
                                placeholder="Enter type (e.g., Vegan)"
                            />
                        </div>
          
                        <div>
                            <label htmlFor="ingredients">Ingredients</label>
                            <div>
                                {ingredientFields.map((field, index) => {
                                  return (
                                
                                <div className="form-control" key={field.id}>
                                  <input type="text" id={`ingredients[${index}].value`}
                                      {...register(`ingredients.${index}.ingredient`)}
                                        defaultValue={field.ingredient} />
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
                            <label htmlFor="comments">Comments</label>
                            
                            <div>
                                  {commentsFields.map((field, index) => {
                                      return(
                                          <div className="form-control" key={field.id}>
                                            <input type="text" {...register(`comments.${index}.user`)}
                                              defaultValue={field.user}/>
                                              <input type="text" {...register(`comments.${index}.comment`)}
                                              defaultValue={field.comment}/>
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
                                                
                                      <button type="button" onClick={() => appendComments({user: "", comment: ""})}>
                                        Add comment
                                      </button>
                                </div>
                         </div>
                    </Form> 
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                        Cancel
            </Button>
            <Button type="submit" form="editRecipe" variant="primary">
                        Save Recipe
            </Button>
        </Modal.Footer>
      </Modal>
    );
    <DevTool control={control}/>
};

export default EditRecipeModal;
