import React, { useEffect, useRef, useState } from 'react'
import './dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { api_key } from '../../services/recipeApi';
import { baseURL } from '../../services/recipeApi';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../../firebase';

const Dashboard = () => {
    const currentuser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dessert,setDessert] = useState();
    const [activeTab,setActiveTab] = useState("dashboard");
    const [formPopup, setFormPopup] = useState(false);
    const [recipeName, setRecipeName] = useState("");
    const [recipeId, setRecipeId] = useState("");
    const [recipeList, setRecipeList] = useState([]);
    const [recipeObtained, setRecipeObtained] = useState([]);


    const dashboardRef = useRef(null);
    const recipeRef = useRef(null);
    const usersCollectionRef = collection(db, 'Userlist'); 


    async function getDessert(){
        try{
            console.log(baseURL);
            let response = await axios.get(`${baseURL}random?apiKey=${api_key}&number=1&include-tags=dessert`);
            setDessert(response.data.recipes[0]);
        } catch(e){
            console.log(e);
        }
    }

    const handleSelect = (id) => {
        navigate(`/details/${id}`);

    }

    const handleClickTab = (tab) => {
        /*if(tab === "dashboard")
        {
            dashboardRef.current.style.display = "flex";
            recipeRef.current.style.display = "none";
        }

        if(tab === "recipe")
            {
                dashboardRef.current.style.display = "none";
                recipeRef.current.style.display = "flex";
            }*/

        setActiveTab(tab);
    }

    const handleClickAdd = () => {
        setFormPopup(!formPopup);
    }

    const handleSubmitRecipe = async (e) => {
        try{
            e.preventDefault();  
              
            /*const userRef = doc(usersCollectionRef, currentuser?.id);
            const userInDB = query(usersCollectionRef, where('Email', '==', currentuser?.currentUser?.Email));
            const querySnapshot = await getDocs(userInDB);
            const userDoc = querySnapshot.docs[0];
            console.log(userDoc.data());*/

            /*Get complete docs with id
            const items= [];
            const querySnapshot = await getDocs(usersCollectionRef,);
            const users = querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });*/
            const docRef = doc(db,"Userlist",currentuser?.id);
        
            await updateDoc(docRef, {
                recipes: arrayUnion(recipeName),
            });

            console.log("doc with id: "+currentuser?.id+" updated successfully");

        } catch (e) {
            console.error(e.message);

        }
    }

    const getRecipe = async (name) => {
        try{
            console.log(baseURL);
            let response = await axios.get(`${baseURL}complexSearch?apiKey=${api_key}&query=${name}&number=1`);
            console.log(response.data);
            //setDessert(response.data.results[0]);
            //setRecipeObtained(response.data.results[0]);
            return response.data.results[0];
        } catch(e){
            console.log(e);
        }
    }

    const getUserRecipes = async () => {
        const userInDB = query(usersCollectionRef, where('Email', '==', currentuser?.currentUser?.Email));
        const querySnapshot = await getDocs(userInDB);
        let userRecipes = [];

        if(!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            console.log(userData.recipes);
            //setRecipeList(userData.recipes);
            userRecipes = userData.recipes;
            const userId = userDoc.id;
           
        }
        let items = [];
        console.log(userRecipes);
        userRecipes.map(async (item,index) => {
           const currentRecipe = await getRecipe(item);
           console.log("current recipe: ", currentRecipe );
           items.push(currentRecipe);
           
           //console.log("current recipe: ",recipeObtained);
        });

        setRecipeList(items);
        console.log("all recipes obtained: ", items);
        
    
    }

    useEffect(() => {
        getUserRecipes();
    },[]);


  return (
    <div id='dashboard-container'>
        <div id='main-dashboard-tile'>
            <div id='tabs-column'>
                <span  className='tab-btn' onClick={() => handleClickTab("dashboard")}>
                   Dashboard
                </span>
                <span id='recipe-tab' className='tab-btn'  onClick={() => handleClickTab("recipe")}>
                    Saved Recipes
                </span>
                <span id='reviews-tab' className='tab-btn'>
                    My Reviews
                </span>
                <span id='password-tab' className='tab-btn'>
                    Change Password
                </span>
                <span id='logout-tab' className='tab-btn'>
                    Logout
                </span>

                
            </div>
            {activeTab === 'dashboard' && (
                <>

                <div id='dashboard-tab' >
                    <span className='subtitle'> Hello, {currentuser?.currentUser?.Name} </span>
                    <span className='title'>Welcome to your Profile</span>
    
                    <div id='personal-info'>
                        <h4>Personal Information</h4>
                        <span id='personal-table'>
                            <div>
                                <span className='personal-tag'>Name: </span>   <span className='personal-data'>{currentuser?.currentUser?.Name}</span>
                            </div>
                            <div>
                                <span className='personal-tag'>Email: </span> <span className='personal-data'>{currentuser?.currentUser?.Email}</span>
                            </div>
    
                            <div>
                                <span className='personal-tag'>Recip: </span> <span className='personal-data'>5</span>
                            </div>
    
                        </span>
                        
                    </div>
                </div>
                
                </>
                
            )}
            
            {activeTab === 'recipe' && (
                <>
                <div id='saved-recipes-tab'>
                  <h4 style={{marginLeft:'20px'}}>Saved Recipes</h4>
                  <div className='recipe-row'>
                    {recipeList && recipeList.length > 0 ? ( recipeList.map((item,index) => (
                        <>
                        <span id='user-saved-recipe' className='popular-tile' onClick={() => handleSelect(item?.id)}>
                          <span id='saved-recipe-name' className='popular-name'>
                            
                              <a href={item?.sourceUrl}>
                                  {item?.title}
                              </a> 
                          </span>
                          <span id='saved-recipe-image-container' className='popular-image-container'>
                              <img src={item?.image} id='saved-recipe-image' alt='recipe img' className='popular-image'/>
                          </span>
  
                        </span>

                        </>
                    
                    ))
                    ): (<p>No recipes added</p>)}
                     

                      <span id='add-recipe' onClick={() => handleClickAdd()}>
                        <span className='add-recipe-title'>
                            Add Recipe
                        </span>
                        <span id='add-icon-container'>
                            <AddIcon className='add-icon' style={{fontSize:"30px"}}/>
                        </span>

                      </span>
                    
                        {formPopup && (<>
                            <div id='form-popup'>
                                <form id='add-recipe-form' onSubmit={handleSubmitRecipe}>
                                    <h2>Add Recipe</h2>
                                    <input type='text' name='recipe-name' placeholder='Recipe Name' className='add-recipe-input'
                                    onChange={(e) => setRecipeName(e.target.value)}/>
                                    <input type='text' name='recipe-id' placeholder='Recipe Id' className='add-recipe-input'
                                    onChange={(e) => setRecipeId(e.target.value)}/>
                                    <input type='submit' className='recipe-submit' value="Add"/>


                                </form>
                            </div>
                        
                        </>)}
                     
                </div>
                </div>
                
                </>
                
            )}
          

        </div>

      
    </div>
  )
}

export default Dashboard
