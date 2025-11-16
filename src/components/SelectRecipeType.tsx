import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import type {Ingredient,Comment} from "../../src/types.ts";
import { setTypeSelected } from './pages/shared-state.ts';
import Button from 'react-bootstrap/Button';

interface Recipe {
  id: number;
  authorName: string,
  name: string;
  type: string;
  ingredients: Array<Ingredient>;
  comments: Array<Comment>;
}
//This function component allows the user to select the type of recipes to display. Default is all recipes, regardless of types are displayed.
export default function SelectRecipeType({recipeTypeSelection,setRecipeTypeSelection}:{recipeTypeSelection: string,setRecipeTypeSelection: (newValue:string) => void}){
      const navigate = useNavigate();
      const [uniqueTypes, setUniqueTypes] = useState<string[]>([])
      const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const [isResetButtonHidden, setIsResetButtonHidden] = useState(true); // Initially hidden
       
      const toggleVisibility = () => {
        setIsResetButtonHidden(!isResetButtonHidden);
        
      };
      const handleSelect = (eventKey: string | null) => {
           if (eventKey) {
            setRecipeTypeSelection(eventKey);
           // console.log(`Selected: ${eventKey}`);
            setTypeSelected(`${eventKey}`);
            navigate (`/recipeType/? type=${eventKey}`)
            }
                toggleVisibility();
          };
      const resetDropdown = () => {
           setRecipeTypeSelection('Pick a type'); // Reset to the default value
            navigate(`/`);
            toggleVisibility();
          };
        

       useEffect(() => {
         const fetchRecipes = async () => {
        try {
         // const response = await fetch("http://localhost:3000/recipes"); // Replace with your API endpoint
         const response = await fetch ("https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes"); 
         const data: Recipe[] = await response.json();
          const types = data.map(item => item.type);
          const unique = Array.from(new Set(types));
          setUniqueTypes(unique);
          console.log("Loading in progress: " + loading);
                
        } catch (err) {
          setError((err as Error).message);
          console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
            
          }
      };
      fetchRecipes();
       }, []);

    return(
        <>
            <div >
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown--unique-types" >
                        {recipeTypeSelection || 'Pick a type'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        
                        {uniqueTypes.map((type) => (
                            <Dropdown.Item key={type}  eventKey= {type}>
                              {type}
                            
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
              </div>
              <div><Button hidden={isResetButtonHidden} onClick={resetDropdown}
                  variant="success">Reset</Button>
                  {isResetButtonHidden ? 'Show Button' : 'Hide Button'}
              </div>
        </>
    );
};