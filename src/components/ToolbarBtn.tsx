import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import type {Recipe, NewRecipe} from "./../types.ts"
//import type {RecipeToolbarProps} from "../../App.tsx";
import {useState } from 'react';
import NewRecipeModal from "./../components/modals/NewRecipeModal";
import EditRecipeModal from "./modals/EditRecipeModal.tsx";
import DeleteRecipeModal from "./../components/modals/DeleteRecipeModal.tsx";

// Define the props interface for this component
// This tells TypeScript what props this component expects to receive

export default function ToolbarBtn({recipesState, recipeCardSelectedId, setRecipesState} :
  {recipesState?: Array<Recipe>,
    
   recipeCardSelectedId: number,

   setRecipesState: (recipesState: Array<Recipe>)=> void
   
  }
)
{  

  //const recipe = recipesState?.find((r) => r.id === recipeCardSelectedId)
  // State for controlling modal visibility
  const [showModal, setShowModal] = useState(false);
    const [showDeleteRecipeModal, setShowDeleteRecipeModal] = useState(false);
    const [showEditRecipeModal, setShowEditRecipeModal] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
    const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);
    
    // Handler function to open the modal
    const handleOpenModal = () => {
      setShowModal(true);
      
    };
  
    // Handler function to close the modal
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    // Handler function to open the delete modal
    const handleOpenDeleteRecipeModal = (recipeId: number) => {
      //alert(" recipe to delete with id: " + recipeId)
      const recipe = recipesState?.find((r) => r.id === recipeId);
      if (recipe) {
        //alert("found recipe to delete")
        setRecipeToDelete(recipe);
        setShowDeleteRecipeModal(true);

      }
    };
    
    // Handler function to close the delete modal
    const handleCloseDeleteRecipeModal = () => {
      setShowDeleteRecipeModal(false);
      setRecipeToDelete(null);
    };
  
    // Handler function to open the edit modal
    const handleOpenEditRecipeModal = (recipeId: number) => {
      alert(" recipe to edit with id: " + recipeId)
      //recipesState.length === 0? alert("it's empty"):alert("it's not empty")
      const recipe = recipesState?.find((r) => r.id === recipeId);
      if (recipe) {
        setRecipeToEdit(recipe);
        setShowEditRecipeModal(true);
        alert("found recipe to edit")
      }
    };
  
    // Handler function to close the edit modal
    const handleCloseEditRecipeModal = () => {
      setShowEditRecipeModal(false);
      setRecipeToEdit(null);
    };
    
    // Handler function to add a new recipe to the recipes state
    // This function now accepts user inputs from the modal form


    const addNewRecipe = (newRecipeData: NewRecipe) => {
      // Create a new recipe object with the form data and a unique ID
      
      const newRecipe: Recipe = {
        id: 11, // Unique identifier for this recipe 
        ...newRecipeData
        
      };
  
    // Use setRecipesState to update the recipes array
      // We use the functional update pattern to ensure we're working with the latest state
      
      setRecipesState((prevRecipes) => [newRecipe, ...prevRecipes]);
    
    // Close the modal after adding the car
      handleCloseModal();
    };
    
     
     const deleteRecipe = (recipeId: number) => {
       alert("deleting recipe: "+ recipeId);
      //  const updatedRecipes = recipesState.filter(recipe =>  recipe.id !== recipeId)
       setRecipesState((prevRecipes)=> {
      // Filter out the recipe with the matching ID
        // This creates a new array with all recipess except the one to be deleted
  
          return prevRecipes.filter((recipe) => recipe.id !== recipeId);
          });
        }
   
     // Handler function to confirm recipe deletion
    const handleConfirmDelete = () => {
      if (recipeToDelete) {
        deleteRecipe(recipeToDelete.id);
      }
    };
   
    // Handler function to update a recipe
    const updateRecipe = (updatedRecipe: Recipe) => {
      setRecipesState((prevRecipes) => {
        return prevRecipes.map((recipe) => {
          if (recipe.id === updatedRecipe.id) {
            return updatedRecipe;
          }
          return recipe;
        });
      });
      handleCloseEditRecipeModal();
    };
  
     const addComments = () => {
           alert("Adding comments to recipe")
     }
    const handleEditCardClick= ()=> {
              //alert(event.target.value)
             // alert (" this is card: " + id)
             handleOpenEditRecipeModal(recipeCardSelectedId)
              //setRecipeCardSelectedId(id);
             // alert("just clicked on a card on View " + recipeCardSelectedId);
  
    }

    const handleDeleteCardClick= ()=> {
              //alert(event.target.value)
             // alert (" this is card: " + id)
             handleOpenDeleteRecipeModal(recipeCardSelectedId)
              //setRecipeCardSelectedId(id);
             // alert("just clicked on a card on View " + recipeCardSelectedId);
  
    }
  const id = recipeCardSelectedId;
  
    const handleButtonClick = () => {
        alert("I'm a toolbar button " + id)
    }
    return (
          <>  
           {/* Add Recipe Modal */}
              <NewRecipeModal
                  show={showModal}
                   onHide={handleCloseModal}
                   onSubmit={addNewRecipe}
              />

              <EditRecipeModal
                  show={showEditRecipeModal}
                   onHide={handleCloseEditRecipeModal}
                   onSubmit={updateRecipe}
                   recipe={recipeToEdit}
              />
               {/* Delete Confirmation Modal */}
                <DeleteRecipeModal
                  show={showDeleteRecipeModal}
                  onHide={handleCloseDeleteRecipeModal}
                  onConfirm={handleConfirmDelete}
                  recipe={recipeToDelete}
                />



           <Stack direction="horizontal" className="justify-content-center align-items-center " gap={2} >
                <Button type= "button" variant="primary" onClick={handleOpenModal}> Add Recipe </Button>
                <Button type= "button" variant="success" onClick={handleEditCardClick} > Edit recipe </Button>
                <Button type= "button"  variant="danger" onClick={handleDeleteCardClick}> Delete recipe </Button>
                 
            </Stack>

            </>
    );


}