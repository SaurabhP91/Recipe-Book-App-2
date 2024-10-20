import './App.css';
import Header from './components/header/Header';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Detailspage from './pages/detailspage/Detailspage';
import Login from './components/Login/Login';
import Loginpage from './pages/Loginpage/Loginpage';
import { createContext, useEffect, useState } from 'react';

import { collection, getDocs, getFirestore, onSnapshot} from 'firebase/firestore';
import db from './firebase';
import Profilepage from './pages/profilepage/Profilepage';
import { useSelector } from 'react-redux';



function App() {
    
  const [userlist,setUserList] = useState([]);
  //const databaseContext = createContext();
  const currentuser = useSelector((state) => state.user)

  
  const getUsers = async () => {
    /*onSnapshot(usersCollectionRef, (QuerySnapshot) => {
    const items = [];
    QuerySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    setUserList(items);
    console.log(items);
    } */

    try{
      const usersCollectionRef = collection(db, 'Userlist'); 
      const items=[];
      const querySnapshot = await getDocs(usersCollectionRef);
      const users = querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUserList(items);
      console.log("users registered: ",items);

    } catch (error){
      console.error(error.message);
    }
  
    }
  

  useEffect(() => {
      getUsers();
      console.log(currentuser);
      
      
  },[db]);
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>

        <Route exact path='/details' element={<Detailspage/>}/>

        <Route exact path='/details/:recipe_id' element={<Detailspage/>}/>

        <Route exact path='/login' element={<Loginpage/>}/>

        <Route exact path='/profile' element={<Profilepage/>}/>



      </Routes>
    </Router>
  );
}

export default App;
