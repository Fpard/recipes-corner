import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
export const  TYPE_RECIPES= ["All", "Vegan", "Beef", "Seafood", "Mexican", "Caribbean"]
          

export default function SelectRecipeType({recipeTypeSelection,setRecipeTypeSelection}:{recipeTypeSelection: string,setRecipeTypeSelection: (newValue:string) => void}){
       
   
       const handleSelect = (eventKey, e) => {
           
           setRecipeTypeSelection(`${eventKey}`);
           
            };

    return(
            <div >
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" >
                        Select Recipe Type
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        
                        {TYPE_RECIPES.map((item, index)=> (
                            <Dropdown.Item key={index}  eventKey= {item}> {item}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>




    );


}