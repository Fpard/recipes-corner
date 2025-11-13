import React, { useState } from 'react';
//import type {RecipeCardProps} from "./RecipeCard";

//import Form from 'react-bootstrap/Form';  
import type {Recipe, NewRecipe} from "../../types.ts"  
//export default function RecipeComments({recipeCard, comments, setComments}: {recipeCard: RecipeCardProps,
//   comments: string[], setComments: (newValue:string[]) => void}) {

export default function RecipeComments({recipesState, recipeCardSelectedId, setComments, isSelected}: 
  {recipesState: Recipe[],
    recipeCardSelectedId: number,
    comments?: string[],
    setComments: (newValue:string[]) => void
    isSelected:boolean
  }) {
   // alert("Card selected: " + recipeCardSelectedId)
    //const [textareaValue, setTextareaValue] = useState(["no", "comments"] )
    if(isSelected && recipeCardSelectedId > -1 ){
      //alert("Card selected inside if: " + recipeCardSelectedId)
      
      /*let stringArray: string[];
      stringArray = ["No comments yet"];*/

      const recipe = recipesState?.find((r) => r.id === recipeCardSelectedId);
          if( recipe != null){
              if(recipe?.comments != null){
                //stringArray = recipe.comments
              } else{
                  //  stringArray=(["No comments yet"])

              }

          } 
       /* 
        let numRows=0; 
        
        if(stringArray!= null && Array.isArray(stringArray)) {
        numRows=stringArray.length;
        stringArray.join('\n')
        } */
       // const textareaValue = (stringArray!= null?stringArray.join('\n'):"");
        
        return (
                <>
                    <ul className="card-text">
                      
                            <li key={recipe?.id}> {recipe?.type}  </li>
                                {recipe?.comments?.map((comment: string, index: number) =>(
                            <li key={index}>{comment}</li>
                             ))}
                        </ul>
                
                </>
              
        ); 
      }
    }