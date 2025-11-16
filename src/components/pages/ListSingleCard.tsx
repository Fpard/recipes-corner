// Import React hooks for managing component state
import { useEffect, useState } from "react";
import { setSharedSelectedRecipe} from './shared-state.ts';

import Card from 'react-bootstrap/Card';
import {CardTitle } from "react-bootstrap";

//Import React Bootstrap components for styling
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import {useParams } from "react-router-dom";
import type {Recipe} from "../../types.ts"


export default function ListSingleCard() {
  // State to store the recipe data
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  
  // Get the recipe ID from the URL parameters
    const { id } = useParams<{ id: string }>();
  
  // State to store any error messages
  const [error, setError] = useState("");

 
  // useEffect hook runs when the component mounts (first loads)
  useEffect(() => {
    // Function to fetch a recipe from the API
    const fetchRecipe = async () => {
      const correctID = Number(id);
    if (isNaN(correctID)) return;
             if (!id) return;
     
        try {
        // Make API call to get one recipe
        const response = await fetch(
           
          `https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes/${id}`
          // `http://localhost:3000/recipes/${id}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Recipe not found");
          }
          throw new Error("Failed to fetch recipe");
        }

        const recipeData = await response.json();
        setRecipe(recipeData);
        setSharedSelectedRecipe(recipeData);
      } catch (err) {
        setError("Failed to load recipes");
        console.error("Error saying about this recipe or fetching recipes:", error);
      } finally {
        
      }
    };

    // Call the function to fetch recipes
    fetchRecipe();
  }, [id]); // Non-empty dependency array means this effect runs when id changes
 
  return (
            <>
                <Container>
                    <Row>
                     <Card   style={{ width: '70rem' }}   >
                                   <h5> <Card.Header>{recipe?.name}</Card.Header></h5>
                                    
                      <Card.Body style={{ height: '200px', overflowY: 'auto' }}>
                      <CardTitle >
                         
                     </CardTitle>   
                        <div>
                          <ul className="card-text">
                              <li key={recipe?.id}>  {recipe?.type}  </li>
                                 { 
                                    recipe?.ingredients && Array.isArray(recipe.ingredients) && (
                                   <ul> 
                                        {recipe.ingredients.map((ingredient, index: number) =>(
                                        <li key={index}>{ingredient.ingredient}</li>
                                        ))
                                       }
                                  </ul>
                                )} 
                                                                                                       
                            </ul>                             
                        </div>
                       </Card.Body>  
                       <Card.Footer>
                           <small className="text-muted">Submitted By: {recipe?.authorName}</small>
                       </Card.Footer>  
                    </Card>
                  </Row>  

                  <Row >
                       <Card   style={{ width: '70rem' }}   >
                         <h5> <Card.Header>Users of this recipe said the following: </Card.Header> </h5>
                          <Card.Body style={{ height: '250px', overflowY: 'auto' }}>

                              <div className="card-text" bg-dark="true" text-white="true" >
                              
                                  {recipe?.comments.map((aComment, index: number) =>(
                                    <div >
                                        <Card.Title key={index} > {aComment.user} </Card.Title>
                                            <Card.Text> {aComment.comment} </Card.Text>
                                    </div>))
                                  }
                              </div>
                          
                          </Card.Body> 
                       </Card>

                  </Row>
                 
                 
              </Container> 
             </>   
          );

  }
