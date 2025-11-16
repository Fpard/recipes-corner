// Import React Bootstrap components
import { Modal, Button, Form } from "react-bootstrap";
// Import React hooks for managing component state
import { useState, useEffect } from "react";
import { useForm, useFieldArray} from "react-hook-form";
//import {DevTool} from "@hookform/devtools";
// Import types
import type { Recipe } from "../../types";
//import type {SubmitHandler} from "react-hook-form";
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
  authorName: string,
  name: string;
  type: string;
  ingredients: Array<Ingredient>;
  comments: Array<Comment>;
}

// Define the props interface for this component
interface AddCommentModalProps {
  show: boolean;
  onHide: () => void;
  recipe: Recipe | undefined;
}

// Define the AddCommentModal component
const AddCommentModal= ({
  show, onHide, recipe}: AddCommentModalProps) => {
  
// Get the recipe ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // State to store any error messages
  const [error, setError] = useState("");
// State to track if we're currently saving changes
  const [isSaving, setIsSaving] = useState(false);
  
  // State to store the recipe data
 const [recipeFetched, setRecipeFetched] = useState<Recipe | null>(null);
// State to track if we're loading the recipe
 const [isLoading, setIsLoading] = useState(true);
   
    const formData = useForm<Recipe>({
      defaultValues:{
    authorName:recipeFetched?.authorName,    
    name: recipeFetched?.name,
    type: recipeFetched?.type,
    ingredients: recipeFetched?.ingredients,
    comments: recipeFetched?.comments,
  }});
    
 
  const {register, control, handleSubmit, setValue, getValues} = useForm<Recipe>({
    defaultValues:{
    authorName:formData.getValues().authorName,   
    name: formData.getValues().name,
    type: formData.getValues().type,
    ingredients: formData.getValues().ingredients,
    comments: formData.getValues().comments,
  },
  });

     
  const {fields:commentsFields} = useFieldArray(  
         {  
          control,
          name: 'comments'
         }); 
   
/*
     const handleGetValues = () =>{
    console.log("Get values: ", getValues());
     }*/

     // Handler function to handle modal close
  const handleClose = () => {
    onHide();
    setRecipeFetched(null);
    recipe=undefined;
    setSharedSelectedRecipe(recipe)
    console.log("handle close in modal");
    navigate("/recipes");
    
  };
   // Navigation hook to redirect after actions
  const navigate = useNavigate();   
  recipe= getSharedSelectedRecipe();
 
// useEffect hook runs when the component mounts or when the ID changes
  useEffect(() => {
    const correctID = Number(id);
    if (isNaN(correctID)) return;
     if (!id) return;
    // Function to fetch a single recipe from the API
    const fetchRecipe = async () => {
      try {
        // Make API call to get the specific recipe
        const response = await fetch(
          `https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes/${id}`
         //   `http://localhost:3000/recipes/${recipe?.id}`,
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
        setValue('authorName', data.authorName);
        setValue('name', data.name);
        setValue('type', data.type);
        setValue('ingredients', data.ingredients);
        setValue('comments', data.comments);
       
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
           setIsSaving(true);
     try {
      // Make API call to update the recipe
      const response = await fetch(
        `https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes/${recipe?.id}`,
        //`http://localhost:3000/recipes/${recipe?.id}`,
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
       setRecipeFetched(updatedRecipe);
       setIsSaving(true);
       console.log(" Saving is " + isSaving);
     handleClose();
      // Redirect to recipes page after successful comment addition
      navigate("/recipes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update recipe");
      console.error("Error updating recipe:", error);
    } finally {
      setIsSaving(false);
      
    }
  }
   return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                         <div>
                            <label htmlFor="name">Name</label>
                            <input 
                              type="text"
                              id="name"
                              {...register(`name`)}
                            defaultValue={getValues().name}
                              readOnly
                          />
                        </div>  
                        <div>
                            <label htmlFor="type">Type</label>
                            <input
                                type="text"
                                id="type"
                                {...register(`type` )}
                                defaultValue={getValues().type}
                                readOnly
                            />
                        </div>
                        <div>
                           <label htmlFor="Comments">Say something!</label>
                          {commentsFields.map((field, index) => {
                            let length = (Number(commentsFields.length));
                            
                            return(
                              
                                           
                                    <div > 
                                        {!index && ( 
                                         <div className="form-control" key={field.id} > 
                                          <label htmlFor="user">Your name:</label> 
                                          <input type="text" {...register(`comments.${length}.user`)}
                                            defaultValue={""}/>
                                            <label htmlFor="user">Your comment:</label> 
                                          <input type="text" {...register(`comments.${length}.comment`)}
                                            defaultValue={""}/>
                                          </div>
                                        )
                                      }
                                </div>
                              )
                          })}
                          </div>
                        
                          <Button type="submit" variant="primary">
                              Save Comment
                           </Button>
                    </Form> 
        </Modal.Body>
        <Modal.Footer>
             <Button variant="secondary" onClick={handleClose}>
                 Cancel
              </Button>
        </Modal.Footer>
      </Modal>
    );
    
};

export default AddCommentModal;