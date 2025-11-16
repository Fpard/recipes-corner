import LoadingButton from "../LoadingButton"
// Import React Bootstrap components for styling
import {Container, Card, Col, Row } from "react-bootstrap";
// Import React hooks for managing component state
import { useEffect, useState } from "react";

// Import React Router components for navigation
import { Link } from "react-router-dom";

// Import our custom components
import RecipeCard from "./RecipeCard";
import type {Recipe} from "../../types.ts"

// HomePage component - the main landing page
export default function HomePage() {

    // State to store the featured recipes
  const [recipesState, setRecipesState] = useState<Recipe[]>([]);
  const [recipeCardSelectedId, setRecipeCardSelectedId] = useState(-1);
   
  // State to track if we're loading the recipes
  const [isLoading, setIsLoading] = useState(true);
  
  // State to store any error messages
  const [error, setError] = useState("");
     
  useEffect(() => {
    // Function to fetch recipes from the API
  const fetchFeaturedRecipes = async () => {
      try {
        // Make API call to get all recipes
        const response = await fetch(
          //this is the new API address 13 Nov 2025
          "https://6916b6aba7a34288a27e1e1b.mockapi.io/recipes/recipes"
          //  "http://localhost:3000/recipes"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const allRecipes = await response.json();
        // Take only the first 3 recipes to feature on the home page
        const featured = allRecipes.slice(0, 3);
        setRecipesState(featured);
       
      } catch (err) {
        setError("Failed to load featured recipes");
        console.error("Error fetching recipes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to fetch recipes
    fetchFeaturedRecipes();
  }, []); // Empty dependency array means this effect runs only once when component mounts

  /* Since this page doesn't implement any actions, this function is just a placeholder to
    satisfy RecipeCard prop */ 
  const handleCardClick= (recipe: Recipe)=> {
           
           setRecipeCardSelectedId(recipe.id);
           console.log("Selected recipe id: " + recipeCardSelectedId);
  }
  return (
     <>
      {/* Section with welcome message */}
      <Container style={{ height: '655px' }}>
      <Row className="mt-0" >
        <Col>
          <Card className="text-center bg-success text-white" style={{ width: '68rem' }}>
            <Card.Body className="py-2" >
              <h1 className="display-8 mb-3">🍳 Welcome to Recipes' Corner</h1>
              <p className="lead mb-4" >
                Discover, create, and organize your favorite snacks' recipes in one
                place. Taking a break at half-time during the game, or putting in an all-nighter for work or school to just feeling the need to munch on something quick,
                check our collection of delicious 3-4 ingredients snack recipes.
              </p>
              <Link to="/recipes" className="btn btn-light btn-lg">
                Explore All Recipes
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Featured recipes section */}
      <Row className="mb-0" style={{ width: '68rem' }} >
        <Col>
          <h5 className="mb-4">Featured Recipes</h5>

          {/* Show loading spinner while fetching recipes */}
          {isLoading && <LoadingButton />}

          {/* Show error message if there's an error */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Show featured recipes if loaded successfully */}
          {!isLoading && !error && (
            <Row xs={1} md={3} className="g-4" style={{ width: '68rem' }}>
              {recipesState.map((recipeParam) => (
                                            
                  <RecipeCard
                    key={recipeParam.id}
                    recipe={recipeParam}
                    onSelect={handleCardClick}
                    isSelected={false}
                    setRecipeCardSelectedId={setRecipeCardSelectedId}
                  />
                 ))}
            </Row>
          )}

          {/* Show message if no recipes are available */}
          {!isLoading && !error && recipesState.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted">No recipes available yet.</p>
              <Link to="/recipes" className="btn btn-primary">
                View All Recipes
              </Link>
            </div>
          )}
        </Col>
      </Row>

      {/* Features section */}
      <Row className="mb-0"  >
        <Col>
          <h5 className="mb-1">Why Choose Recipe Corner?</h5>
          <Row xs={1} md={3} className="g-4">
            <Col>
              <Card className="h-51 text-right" style={{ width: '68rem' }}>
                <Card.Body>
                  <h3 className="h3">📝 Easy Recipe Creation</h3>
                  <p className="text-muted">
                    Create, edit, comment and save your favorite snacks with our simple form.
                    Add ingredients, special instructions/comments, or whatever experiences/tidbits you feel like sharing.
                  </p>
                </Card.Body>
              </Card>
            </Col>
                  
          </Row>
          
        </Col>
              
      </Row>
       
       </Container>
    </>
  );
}
    