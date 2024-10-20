import React, { useEffect, useState } from 'react'
import './popular.css'
import { api_key } from '../../services/recipeApi';
import { baseURL } from '../../services/recipeApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Popular = () => {
    const [breakfast,setBreakfast] = useState();
    const [maincourse,setMaincourse] = useState();
    const [dessert,setDessert] = useState();
    const [beverage,setBeverage] = useState();
    const [snack, setSnack] = useState();
    const navigate = useNavigate();

    async function getBreakfast(){
        try{
            console.log(baseURL);
            let response = await axios.get(`${baseURL}random?apiKey=${api_key}&number=1&include-tags=breakfast`);
            setBreakfast(response.data.recipes[0]);
        } catch(e){
            console.log(e);
        }
    }

    async function getMainCourse(){
        try{
            console.log(baseURL);
            let response = await axios.get(`${baseURL}random?apiKey=${api_key}&number=1&include-tags=main course`);
            setMaincourse(response.data.recipes[0]);
        } catch(e){
            console.log(e);
        }
    }

    async function getDessert(){
        try{
            console.log(baseURL);
            let response = await axios.get(`${baseURL}random?apiKey=${api_key}&number=1&include-tags=dessert`);
            setDessert(response.data.recipes[0]);
        } catch(e){
            console.log(e);
        }
    }

    async function getBeverage(){
        try{
            console.log(baseURL);
            let response = await axios.get(`${baseURL}random?apiKey=${api_key}&number=1&include-tags=beverage`);
            setBeverage(response.data.recipes[0]);
        } catch(e){
            console.log(e);
        }
    }

    async function getSnack(){
        try{
            console.log(baseURL);
            let response = await axios.get(`${baseURL}random?apiKey=${api_key}&number=1&include-tags=snack`);
            setSnack(response.data.recipes[0]);
        } catch(e){
            console.log(e);
        }
    }

    const handleSelect = (id) => {
        navigate(`/details/${id}`);

    }

    useEffect(() => {
        getBreakfast();
        getMainCourse();
        getDessert();
        getBeverage();
        getSnack();
        
    }, []);
  return (
    <div id='popular-container'>
      <h2 id='popular-header'>Popular Recipes</h2>
      <br/>
      <div id='popular-row1'>

        {/*BREAKFAST RECIPE DISPLAY*/}
        <span id='popular-breakfast' className='popular-tile' onClick={() => handleSelect(breakfast?.id)}>
          Popular Breakfast Recipe
          <span id='breakfast-name' className='popular-name'>
              Name:
              <a href={breakfast?.sourceUrl}>
                  {breakfast?.title}
              </a> 
          </span>
          <span id='breakfast-image-container' className='popular-image-container'>
              <img src={breakfast?.image} id='breakfast-image' className='popular-image'/>
          </span>

        </span>

        {/*MAIN COURSE RECIPE DISPLAY*/}
        <span id='popular-maincourse' className='popular-tile' onClick={() => handleSelect(maincourse?.id)}>
          Popular Main course Recipe
          <span id='maincourse-name' className='popular-name'>
              Name:
              <a href={maincourse?.sourceUrl}>
                  {maincourse?.title}
              </a> 
          </span>
          <span id='maincourse-image-container' className='popular-image-container'>
              <img src={maincourse?.image} id='maincourse-image' className='popular-image'/>
          </span>

        </span>

        {/*DESSERT RECIPE DISPLAY*/}
        <span id='popular-dessert' className='popular-tile' onClick={() => handleSelect(dessert?.id)}>
            Popular Dessert Recipe
            <span id='dessert-name' className='popular-name'>
                Name:
                <a href={dessert?.sourceUrl}>
                    {dessert?.title}
                </a> 
            </span>
            <span id='dessert-image-container' className='popular-image-container'>
                <img src={dessert?.image} id='dessert-image' className='popular-image'/>
            </span>

        </span>

      </div>

      <div id='popular-row2'>
          {/*BEVERAGE RECIPE DISPLAY*/}
        <span id='popular-beverage' className='popular-tile' onClick={() => handleSelect(beverage?.id)}>
            Popular Beverage Recipe
            <span id='beverage-name' className='popular-name'>
                Name:
                <a href={beverage?.sourceUrl}>
                    {beverage?.title}
                </a> 
            </span>
            <span id='beverage-image-container' className='popular-image-container'>
                <img src={beverage?.image} alt='Recipe Image'id='beverage-image' className='popular-image'/>
            </span>

        </span>

             {/*SNACK RECIPE DISPLAY*/}
             <span id='popular-snack' className='popular-tile' onClick={() => handleSelect(snack?.id)}>
            Popular Snack Recipe
            <span id='snack-name' className='popular-name'>
                Name:
                <a href={snack?.sourceUrl}>
                    {snack?.title}
                </a> 
            </span>
            <span id='snack-image-container' className='popular-image-container'>
                <img src={snack?.image} id='snack-image' className='popular-image'/>
            </span>

        </span>
      </div>


    </div>
  )
}

export default Popular
