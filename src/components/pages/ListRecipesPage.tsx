// Import React hooks for managing component state
import { useEffect, useState } from "react";

// Import our custom components
import RecipeCard from "./RecipeCard";
import { Card } from "react-bootstrap";
import '../../index.css'
import {setSharedSelectedRecipe,typeSelected} from './shared-state.ts';

//Import React Bootstrap components for styling
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import type {Recipe} from "../../types.ts"

import { useNavigate } from "react-router-dom";

export default function ListRecipesPage() {
  // store all recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // store id of recipe that has been selected via a mouseclick.
  const [recipeCardSelectedId, setRecipeCardSelectedId] = useState(-1);
  
  const navigate = useNavigate(); 
 
   // State to track if we're loading the recipes
  const [isLoading, setIsLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState("");
 
 let recipe: Recipe | undefined ;
  setSharedSelectedRecipe(recipe);
 let recipeTypeSelected: Recipe[] = recipes;

  // useEffect hook runs when the component mounts (first loads)
  useEffect(() => {
    // Function to fetch all recipes from the API
    const fetchRecipes = async () => {
      try {
        // Make API call to get all recipes
        const response = await fetch(
           `https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes`
          // "http://localhost:3000/recipes"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const recipesData = await response.json();
        setRecipes(recipesData);
       recipeTypeSelected = typeSelected=== "Pick a type"? recipes :
            recipes?.filter(recipe => (typeSelected===recipe.type))
            console.log("recipeTypeSelected: " + {recipeTypeSelected} + " " + isLoading)
      } catch (err) {
        setError("Failed to load recipes");
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to fetch recipes
    fetchRecipes();
  }, []); // Empty dependency array means this effect runs only once when component mounts

   const handleCardClick= async (recipe: Recipe)=> {
   // alert("responding to click on card id: " + recipe.id);
   setSharedSelectedRecipe(recipe) ;
        //  alert("recipe id: "+ getSharedSelectedRecipe()?.id);
    
          navigate (`/recipes/${recipe.id.toString()}`)
        };
         
    return (
        <>
                <Container>
                    <Row>
                     <Card   style={{ width: '70rem' }}   >
                                  <h5 className="bg-secondary text-white p-6">  <Card.Header>List of all recipes</Card.Header> </h5>
                         <Card.Body  style={{ height: '250px', overflowY: 'auto' }}>

                        <div className="overflow-x-auto w-100" style={{ display: 'flex', justifyContent: 'left' , flexWrap: 'wrap'}}>
                                                          
                              {recipeTypeSelected.map((recipeParam) => (
                              
                              <RecipeCard
                                 key={recipeParam.id}
                                 recipe={recipeParam}
                                 onSelect={handleCardClick}
                                 isSelected={recipeCardSelectedId === recipeParam.id}
                                 setRecipeCardSelectedId={setRecipeCardSelectedId}
                                     
                              />
                              ))}
                        </div>
                       </Card.Body>       
                    </Card>
                  </Row>  

                  <Row >
                       <Card   style={{ width: '70rem' }}   >
                                  <h5 className="bg-info text-white p-6">  <Card.Header>Click on a card to see what people are saying about this recipe</Card.Header> </h5>
                         <Card.Body style={{ height: '250px', overflowY: 'auto' }}>

                        
                       </Card.Body>       
                    </Card>

                  </Row>
                </Container> 
                
        </>   
    );

  }
