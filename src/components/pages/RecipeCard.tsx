import type {Recipe,Ingredient,Comment} from "../../types.ts"
//import RecipeComments from "./RecipeComments.tsx"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { CardBody, CardFooter, CardText, CardTitle } from "react-bootstrap";
import { sharedSelectedRecipe, getSharedSelectedRecipe, setSharedSelectedRecipe} from './shared-state.ts';        
export default function RecipeCard({recipe, onSelect, isSelected=false, setRecipeCardSelectedId}:
    {
        recipe: Recipe, 
        onSelect: (recipe:Recipe)=> void;
        isSelected:boolean,
        setRecipeCardSelectedId: (id:number)=> void
       
   } ){ 
    
        const handleClick= ()=> {
           onSelect(recipe)
          
                setRecipeCardSelectedId(recipe.id)
             setSharedSelectedRecipe(recipe) ;  
              
     }; 
        
    return(
            
            <Card onClick={handleClick}
                    style={{
                        width: '18rem',
                        cursor: 'pointer',
                        border: isSelected ? '2px solid blue' : '1px solid #dee2e6', // Highlight if selected
                        margin: '10px',
                    }} >
                <CardBody >
                    <CardTitle >
                        <h5> {recipe.name} </h5>
                     </CardTitle>
                         <div>         
                                           
                            <ul className="card-text">
                                 
                                <li key={recipe.id}> {recipe.type}  </li>
                           
                                  { 
                                    recipe.ingredients && Array.isArray(recipe.ingredients) && (
                                   <ul> 
                                        {recipe.ingredients.map((ingredient, index: number) =>(
                                        <li key={index}>{ingredient.ingredient}</li>
                                        ))
                                       }
                                  </ul>
                                )
                                }
                                </ul>                                        
                            
                          </div>


                </CardBody >
                <CardFooter>
                    <small className="text-muted">By: {recipe.authorName}</small>

                </CardFooter>
            </Card>
           );
}


          
            
   