import React, { useEffect, useRef, useState } from 'react'
import './login.css'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import { addDoc, collection, getDocs, getFirestore, query, where} from 'firebase/firestore';
import db from '../../firebase'; 

import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateId } from '../../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginUser,setLoginUser] = useState('');
    const [emailVal,setEmailVal] = useState("");
    const [passVal,setPassVal] = useState("");
    const [userlist, setUserList] = useState([]);

    const[firstname,setFirstName] = useState("");
    const[lastname,setLastName] = useState("");

    const loginRef = useRef(null);
    const registerRef = useRef(null);

    const currentuser = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usersCollectionRef = collection(db, 'Userlist'); 


    const showLogin = () => {
        loginRef.current.style.display = 'flex';
        registerRef.current.style.display = 'none';

    }

    const showRegister = () => {
        loginRef.current.style.display = 'none';
        registerRef.current.style.display = 'flex';
    }

    const getUsers = async () => {
        try{
            const items=[];
            const querySnapshot = await getDocs(usersCollectionRef);
            const users = querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            setUserList(items);
            console.log("users registered: ",userlist);
      
          } catch (error){
            console.error(error.message);
          }
      }

    const handleLogin = async (e) => {
        e.preventDefault();
        

        try{
            let emailvalue = emailVal;
            let passvalue = passVal;  
            console.log(emailvalue,passvalue);

            const userInDB = query(usersCollectionRef, where('Email', '==', emailvalue));
            const querySnapshot = await getDocs(userInDB);

            if(!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                const userId = userDoc.id;
                console.log(userData);
                console.log("userid: ",userId);

                //compare password
                if(userData.Password === passvalue){
                    console.log("Login successful");

                    //set current user using redux
                    const loggedInUser = {
                        Email: emailvalue,
                        Password: passvalue
                    };
                    dispatch(updateUser(userData));
                    dispatch(updateId(userId));
                    console.log(currentuser);
                    navigate("/");
                    
                    
                }
            }


        } catch (e){
            console.error(e.message);
        }

    }

    const handleRegister = async (e) => {
        try{
            e.preventDefault();
            let namevalue = firstname+" "+lastname;
            let emailvalue = emailVal;
            let passvalue = passVal;
    
            const usersCollectionRef = collection(db, 'Userlist'); 
            console.log(namevalue);
            
    
            const newUser = {
                Email: emailvalue,
                Name: namevalue,
                Password: passvalue,
            };
            const docRef = await addDoc(usersCollectionRef, newUser);    

            console.log("User added with ID: ", docRef.id);
        }catch (e) {
            console.error(e.message);
        }
    }
  return (
    <div id='login-container'>
       <div id='form-container'>
            <form id='login-form' ref={loginRef} onSubmit={handleLogin}>
                <h2 className='form-title'>Log In</h2>


                <label for="email">Email Address*</label>
                <input type='email' name='email' placeholder='Email' onChange={(e) => setEmailVal(e.target.value)} className='form-input'/>

                <label for="password">Password*</label>
                <input type='password' name='password' placeholder='Password'  onChange={(e) => setPassVal(e.target.value)} className='form-input'/>

                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between", width:'60%'}}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox color='success'/>} label='Remember me'/>

                    </FormGroup>
                    <p className='forgot-pass'>Forgot Password?</p>
                </div>

                <input type='submit' className='login-submit' value="Log In"/>

                <div style={{display:'flex', alignItems:'center'}}>
                    <p>Don't have an account? </p> <p className='sign-up-link' onClick={showRegister}> Sign Up for Free</p>
                </div>
         

            </form>

           <form id='register-form' ref={registerRef} onSubmit={handleRegister}>
                <h2 className='form-title'>Create Account</h2>

                <div className='name-row'>
                    <span className='name-input-block'>
                        <label for="firstname">First Name*</label>
                        <input type='text' name='firstname' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} className='name-input'/>

                    </span>

                    <span className='name-input-block'>
                        <label for="lastname">Last Name*</label>
                        <input type='text' name='lastname' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} className='name-input'/>
                    </span>


                </div>

                <label for="email">Email Address*</label>
                <input type='email' name='email' placeholder='Email' onChange={(e) => setEmailVal(e.target.value)} className='form-input'/>
                

                <div className='name-row'>
                    <span className='name-input-block'>
                        <label for="password">Password*</label>
                        <input type='password' name='password' placeholder='Password'  onChange={(e) => setPassVal(e.target.value)} className='name-input'/>

                    </span>

                    <span className='name-input-block'>
                        <label for="retypepassword">Retype Password*</label>
                        <input type='password' name='retypepassword' placeholder='Password'  onChange={(e) => setPassVal(e.target.value)} className='name-input'/>

                    </span>
                </div>


                <FormControlLabel control={<Checkbox color='success'/>} label='I agree with all the terms and conditions in EcoShop'/>

                <button type='submit' className='login-submit'>Create Account</button>

                <div style={{display:'flex', alignItems:'center'}}>
                    <p>Already have an account? </p> <p className='login-link' onClick={showLogin}>Log In</p>
                </div>
         
            </form>
        </div>
    </div>
  )
}

export default Login
