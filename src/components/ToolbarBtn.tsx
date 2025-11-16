import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import {useState } from 'react';
import NewRecipeModal from "./modals/NewRecipeModal.tsx";
import EditRecipeModal from "./modals/EditRecipeModal.tsx";
import AddCommentModal from "./modals/AddCommentModal.tsx";
import DeleteRecipeModal from "./../components/modals/DeleteRecipeModal.tsx";
import {getSharedSelectedRecipe} from './pages/shared-state.ts'

export default function ToolbarBtn()
{  
  // State for controlling modals visibility
    const [showDeleteRecipeModal, setShowDeleteRecipeModal] = useState(false);
    const [showEditRecipeModal, setShowEditRecipeModal] = useState(false);
    const [showNewRecipeModal, setShowNewRecipeModal] = useState(false);
    const [showAddCommentModal, setShowAddCommentModal] = useState(false);
   
    const editOnClick = () =>{
      if(getSharedSelectedRecipe()){
           setShowEditRecipeModal(true);
      }
      else{
               setShowEditRecipeModal(false);
           }

      }

      const deleteOnClick = () =>{
      if(getSharedSelectedRecipe()){
           setShowDeleteRecipeModal(true);
      }
      else{
               setShowDeleteRecipeModal(false);
           }

      }

      const addCommentOnClick = () =>{
      if(getSharedSelectedRecipe()){
           setShowAddCommentModal(true);
      }
      else{
               setShowDeleteRecipeModal(false);
           }

      }


    
    // Handler function to close the delete modal
    const handleCloseDeleteRecipeModal = () => {
      setShowDeleteRecipeModal(false);
      
    };
  
    // Handler function to confirm recipe deletion
    const handleConfirmDelete = () => {
     handleCloseDeleteRecipeModal();
    };
        
    return (
          <>  
           {/* Add Recipe Modal */}
              <NewRecipeModal
                  show={showNewRecipeModal}
                   onHide={() => setShowNewRecipeModal(false)}
              />

              <EditRecipeModal
                  show={showEditRecipeModal}
                  onHide={() => setShowEditRecipeModal(false)}
                  recipe={getSharedSelectedRecipe()}
              />
               {/* Delete Confirmation Modal */}
                <DeleteRecipeModal
                  show={showDeleteRecipeModal}
                  onHide={() => setShowDeleteRecipeModal(false)}
                  onConfirm={handleConfirmDelete}
                  recipe={getSharedSelectedRecipe()!}
                />
              <AddCommentModal
                  show={showAddCommentModal}
                  onHide={() => setShowAddCommentModal(false)}
                  recipe={getSharedSelectedRecipe()}
              />


           <Stack direction="horizontal" className="justify-content-center align-items-center " gap={2} >
                <Button type= "button" variant="primary" onClick={() => setShowNewRecipeModal(true)}> Add Recipe </Button>
                <Button type= "button" variant="success" onClick={editOnClick} > Edit recipe </Button>
                <Button type= "button"  variant="danger" onClick={deleteOnClick}> Delete recipe </Button>
                 <Button type= "button"  variant="primary" onClick={addCommentOnClick}> Add Comment </Button>
            </Stack>

            </>
    );


}