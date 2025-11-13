import React, { useState } from 'react';
import RecipeCard from "./RecipeCard.tsx" 
import type {Recipe} from "../../types.ts";
import RecipeComments from './RecipeComments.tsx';
import Form from 'react-bootstrap/Form';
import { Card } from "react-bootstrap";
import '../../index.css'
import { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function RecipeListView extends Component{({recipesState,recipeTypeSelection,recipeCardSelectedId, setRecipeCardSelectedId,
                                    comments, setComments, handleCardClick} :
                                    {recipesState: Array<Recipe>,
                                     recipeTypeSelection: string,
                                     recipeCardSelectedId: number,
                                     setRecipeCardSelectedId: (newValue: number) => void,
                                     comments: string[],
                                      setComments: (newValue:string[]) => void
                                    handleCardClick: (id: number) => void} ){


            const [recipeComments, setRecipeComments] = useState(["Click on a recipe"])
            const [isSelected, setIsSelected] = useState(false)

           
         const recipeTypeSelected = recipeTypeSelection=== "All"? recipesState :
            recipesState?.filter(recipe => (recipeTypeSelection===recipe.type))
        
          render(){
      return (
              <>
                <Container>
                    <Row>
                     <Card   style={{ width: '70rem' }}   >
                                    <Card.Header>Scrollable Content</Card.Header>
                         <Card.Body style={{ height: '250px', overflowY: 'auto' }}>

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

                  <Row>
                       <Card   style={{ width: '70rem' }}   >
                                    <Card.Header>Click a card to see what people are saying about this recipe</Card.Header>
                         <Card.Body style={{ height: '250px', overflowY: 'auto' }}>

                        <div className="h-25 overflow-y-auto w-100" style={{ display: 'flex', justifyContent: 'left', flexWrap: 'wrap' }}>
                                                          
                              {recipeTypeSelected?.map((recipeParam) => (
                              
                              <RecipeComments
                                 key={recipeParam.id}
                                 recipesState={recipesState}
                                 recipeCardSelectedId={recipeCardSelectedId}
                                 setComments={setComments}
                                 isSelected={recipeCardSelectedId === recipeParam.id}
                                     
                              />
                              ))}
                        </div>
                       </Card.Body>       
                    </Card>

                  </Row>
                </Container>    
                     </>                        
                 
            );
         };
      }}
          