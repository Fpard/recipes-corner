// shared-state.ts

import type {Recipe} from "../../types.ts"

//When a recipe is selected, it is stored in this variable to be passed to other components 
export let sharedSelectedRecipe: Recipe | undefined;

//This function returns the recipe that was selected. 
export const getSharedSelectedRecipe = () => {
  return sharedSelectedRecipe;
};

//This function sets the selected recipe into the variable "sharedSelectedRecipe"
export const setSharedSelectedRecipe = (recipe?:Recipe) => {
    sharedSelectedRecipe = recipe;
};

//When a recipe type is selected, it is stored in this variable to be passed to other components 
export let typeSelected: String | "Pick a type";

//This function returns the recipe type that was selected.
export const getTypeSelected = () => {
  return typeSelected;
};

//This function sets the selected recipe type into the variable "typeSelecte".
export const setTypeSelected = (type:String) => {
   typeSelected = type;
};

