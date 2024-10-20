import React, { useRef, useState } from 'react'
import './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/reducers/userSlice';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [dropdownStatus, setDropdownStatus] = useState("none");
  const [menuStatus,setMenuStatus] = useState("none");
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  
  const navigate = useNavigate();
  //Redux
  const currentuser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDropdown = () => {
    if(dropdownStatus === "none")
        {
          setDropdownStatus("flex");
    
        }
    else{
          setDropdownStatus("none");
        }
    dropdownRef.current.style.display = dropdownStatus;
  }
  const handleClickLogout = () => {
    dispatch(updateUser(null));
    navigate("/");
    window.location.reload();
  }

  const handleClickProfile = () => {
    navigate("/profile");
  }
  return (
    <div id='header-container'>
      <span id='logo-container'>
        Welcome to our Recipe Haven!

      </span>

      <nav id='navbar'>
        <ul>
          <Link to='/'>
           <a href="#home" className="navbar-link active">Home</a>

          </Link>
        </ul>

      </nav>

      
    {!currentuser.currentUser && (
      <>
        <span id='login-btn'>
          <Link to='/login' >
            <a href='#login' className='navbar-link active'>Login</a>
          </Link>
        </span>
      </>
    )}

    {currentuser.currentUser && (
      <>
        <div id='account-nav' onClick={handleDropdown}>
                
          <span id='account-icon-container'>
              <AccountCircleOutlinedIcon className='account-icon'/>
          </span>
          <span id='account-name'>
              {currentuser?.currentUser?.Name}
          </span>
          <span id='arrow-icon-container'>
              <ArrowDropDownIcon className='arrow-icon' sx={{fontSize:'30px'}}/>
          </span>
         

          <span id='user-dropdown' ref={dropdownRef}>
            <p className='dropdown-btn' onClick={handleClickProfile}>Profile</p>
            <p className='dropdown-btn'>My Cart</p>
            <p className='dropdown-btn'>Order History</p>
            <p className='dropdown-btn' onClick={handleClickLogout}>Logout</p>
          </span>
        </div>
      </>
    )}
     
    </div>
  )
}

export default Header
