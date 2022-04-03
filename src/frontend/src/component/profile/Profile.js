import { React, useState, useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { AddBook } from '../books/AddBook';
import { UserBooks } from '../books/UserBooks';
import { EditBook } from '../books/EditBook';
import { ShowAllBooks } from '../books/ShowAllBooks';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Profile.css'


const Avatar = (props) => {

  const navigate = useNavigate();

  // Navigate the user to the login page if the user is logged out
  useEffect( () => {
    const accessToken = Cookies.get('Authorization');
    if (!accessToken) {
      navigate('/');
    } 
  })

  const api = axios.create({
    baseURL: 'http://localhost:8080/graphql',
    withCredentials: true,
  })


  // State for storing user info (username, email)
  const [user, setUser] = useState(null);

  // Fetches user info (username, email) and set it in the "user" state  
  useEffect( () => {    
    async function fetchData() {
      try {
        const response = await api.post('/', {
          query: `
            query fetchUserInfo($userID: String) {
              fetchUserInfo(userID: $userID) {
                success
                user {
                  username,
                  email,
                }
                msg
              }
            }`
          ,
          variables: {
            userID: Cookies.get('id')  
          },     
        });
        if (response.data.data.fetchUserInfo.success === true) {
          const renderedUserInfo = response.data.data.fetchUserInfo.user
          setUser(renderedUserInfo);
        }
      } catch(error) {
        console.log("Failed to fetch user info");
      }
    }

    fetchData();
  }, []);

  
  // Logs out the user.
  const handleLogout = (e) => {
    e.preventDefault(); // to stop the page from reloading when button is clicked
    Cookies.remove('id');
    Cookies.remove('Authorization');
    navigate('/');
  }


  // Avatar dropdown
  const DropDown = () => {
    return (
      <div id="avatar-dropdown-items">
          <p id="username-container">{user?.username}</p>
          <p id="email-profile">{user?.email}</p>
          <p>
            <a id="logout" href="#" onClick={handleLogout}>Logout</a>
          </p>
      </div>
    )
  }

  return (    
    <div id="avatar-dropdown" style={{
      display: props.open === true ? "block" : "none",
    }}>
      <DropDown />
    </div> 
  )
}


const Navbar = () => {

  const [click, setClick] = useState(false);
  const handleAvatarIconClick = () => setClick(!click)

  return (
    <div>

      <Link to="/profile" id="home" 
      onClick={() => { setClick(false) }} >Home</Link>

      <Link to="/profile/books/add" id="add-books"
      onClick={() => { setClick(false) }} >Add a new book</Link>

      <Link to="/profile/books" 
      onClick={() => { setClick(false) }} >Your books</Link>

      <Link to="#" id="avatar" onClick={handleAvatarIconClick} >Settings
        <Avatar open={ click ? true: false } />
      </Link>
    </div>
  )
}


const RoutePaths = () => {
  return (
      <Routes>
        {/* <Route path="/" /> */}
        <Route path="/" element={<ShowAllBooks />}/>
        <Route path="/books/add" element={<AddBook />} />
        <Route path='/books/' element={<UserBooks />} />
        <Route path = '/books/edit/query' element={<EditBook/>} />
      </Routes>
  )
}


export const Profile = () => {
  return (
    <div id="global-container">
      <div id="nav-bar">
        <Navbar /> 
      </div>
      <div id="books-container">
        <RoutePaths /> 
      </div>
    </div>
  )
}