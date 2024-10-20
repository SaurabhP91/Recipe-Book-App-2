import React, { useEffect, useRef, useState } from 'react'
import './search.css'
import SearchIcon from '@mui/icons-material/Search';
import { baseURL } from '../../services/recipeApi';
import { api_key } from '../../services/recipeApi';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const Search = () => {
    const [searchTerm,setSearchTerm] = useState("");
    const [results,setResults] = useState([]);
    const resultRef = useRef(null);
    const searchbarRef = useRef(null);

    const [clickedOutside, setClickedOutside] = useState(false);
    const navigate = useNavigate();


    async function getResults(){
        try{
            let response = await axios.get(`${baseURL}findByIngredients?ingredients=${searchTerm}&number=10&apiKey=${api_key}`);
            setResults(response.data);
            resultRef.current.style.display = 'block';
        } catch(e){
            console.log(e);
        }
    }

    const handleSelect = (id) => {
        navigate(`/details/${id}`);

    }

    /*useEffect(() => {
        getResults();
    },[searchTerm, results]);*/

    useEffect(() => {
        function handleClickOutside(event) {
            // Check if the clicked element is not the target element or its descendants
            if (resultRef.current && !resultRef.current.contains(event.target) && !searchbarRef.current.contains(event.target) ) {
              // Set clickedOutside state to true
              //console.log("clicked outside");
              resultRef.current.style.display = 'none';

              setClickedOutside(true);
            } else {
              // Set clickedOutside state to false
              //console.log("clicked inside");
              resultRef.current.style.display = 'block';
              setClickedOutside(false);
            }
          }

          document.addEventListener('click', handleClickOutside);

          return () => {
            document.removeEventListener('click', handleClickOutside);

          };
        }, [resultRef]);

  return (
    <div id='search-container'>
        <span id="searchbar" ref={searchbarRef}>
            {/*<select id='search-category'>
                  <option value="" disabled selected>-- Select Meal Type --</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>

  </select>*/}
            <input type='text' placeholder="Search recipes here by name or ingredient ..." 
            className="searchinput" onChange={(e) => setSearchTerm(e.target.value)}/>
            <span id='searchicon-container' onClick={getResults}>
              <SearchIcon className="searchicon"/>
            </span>
        </span>

        <span id='results-list' ref={resultRef}>
            {results?.map((item) => (
                <div key={item.id} className='result-item' onClick={() => handleSelect(item.id)}>
                    {item?.title}
                    <img src={item?.image} id='results-img' alt='recipeimg'/>
                </div>

            ))}

        </span>


      
    </div>
  )
}

export default Search
