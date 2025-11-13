import React, { useState } from 'react';
import SelectRecipeType from "./SelectRecipeType"



export default function RecipeSidebar({recipeTypeSelection, setRecipeTypeSelection}:{recipeTypeSelection: string,
     setRecipeTypeSelection: (newValue:string) => void}){
    const handleButtonClick =() =>{
        setRecipeTypeSelection(recipeTypeSelection);

    }
   
    return (
        <>
            {
               <SelectRecipeType setRecipeTypeSelection={setRecipeTypeSelection}/>
            }

            <button className="btn btn-light p-1 border" onClick={handleButtonClick}> </button>
        </>
    )
}