import './detailsection.css';

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { api_key } from './../../services/recipeApi';
import { baseURL } from './../../services/recipeApi';
import axios from 'axios';

const Detailsection = () => {
    const {recipe_id} = useParams();


    const [recipe,setRecipe] = useState({});
    const [recipeTitle, setRecipeTitle] = useState();
    const [recipeimg, setRecipeimg] = useState("");
    const [recipeSummary, setRecipeSummary] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);

    async function getDetails(){
        try{
            let response = await axios.get(`${baseURL}${recipe_id}/information?includeNutrition=false&apiKey=${api_key}`);
            setRecipe(response.data);
            setRecipeTitle(response.data.title);
            setRecipeimg(response.data.image);
            setIngredients(response.data.extendedIngredients);
            setInstructions(response.data.analyzedInstructions[0].steps);
            setRecipeSummary(response.data.summary);
            console.log(instructions);
        } catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        console.log(recipe_id);
        getDetails();
    },[]);
  return (
    <div id='detail-section-container'>
        
      <span id='recipe-name'>
        {recipeTitle}
      </span>
      <span id='recipe-image-container'>

        <img src={recipeimg}
         id='recipe-image'/>        
      </span>

      <span id='about-section'>
            <h2>About</h2>
            <span dangerouslySetInnerHTML={{__html:recipeSummary}}/>
        </span>

      <span id='recipe-details'>
      
        <span id='ingredients-section'>
            <h2>Ingredients</h2>
            <ul>
            {ingredients?.map((item) => (
                <li key={item.id} className='ingredient-item'>
                    {item?.original}
                </li>

            ))}

            </ul>
        </span>

        <span id='preparation-section'>
            <h2>Preparation</h2>
            <ol>
                {instructions?.map((item) => (
                    <li key={item?.number} className='ingredient-item'>
                        {item?.step}
                    </li>

                ))}
            </ol>
        </span>
      </span>
      
    </div>
  )
}

export default Detailsection
