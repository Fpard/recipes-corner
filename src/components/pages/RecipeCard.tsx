import type {Recipe} from "./../../types.ts"
import RecipeComments from "./RecipeComments.tsx"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { CardBody, CardText, CardTitle } from "react-bootstrap";
        
export default function RecipeCard({recipe, onSelect, isSelected, setRecipeCardSelectedId}:
    {
        recipe: Recipe, 
        onSelect: (id:number)=> void
        isSelected:boolean,
        setRecipeCardSelectedId: (id:number)=> void
       
   } ){ 
    
        const handleClick= ()=> {
                onSelect(recipe.id)
                setRecipeCardSelectedId(recipe.id)
              
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
                                        {recipe.ingredients.map((ingredient: string, index: number) =>(
                                        <li key={index}>{ingredient}</li>
                                        ))
                                       }
                                  </ul>
                                )}
                                                                        
                            </ul>
                          </div>


                </CardBody >
            </Card>
           );
}


          
            
   