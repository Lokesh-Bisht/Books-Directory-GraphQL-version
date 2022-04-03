import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import './AddBook.css';
import { useNavigate } from 'react-router-dom'

export const AddBook = () => {

  const navigate = useNavigate();

  // State to store add book api request result
  const [addBookResponse, setAddBookResponse] = useState({
    success: '',
    msg: ''
  })

  const api = axios.create({
    baseURL: 'http://localhost:8080/graphql/',
    withCredentials: true // To send the saved cookies with every client request to the server
  })

  // State to store book info provided by the user
  const [book, setBook] = useState({
    title: '',
    description: '',
    coverImage: ''
  })


  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // To get values for each input field in the form
    setBook({ ...book, [name] : value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/', {
        query: `
          mutation addBook($userID: String, $book: Book) {
            addBook(userID: $userID, book: $book) {
              success
              msg
            }
          }`  
          ,
          variables: {
            userID: Cookies.get('id'),
            book: {
              title: book.title,
              description: book.description,
              coverImage: book.coverImage
            }
          },   
      });

      const { success, msg } = response.data.data.addBook;
      setAddBookResponse({ 
        ...addBookResponse,  
        success: success, 
        msg: msg 
      });
      // Wait for 2 seconds before navigating to the profile page.
      setTimeout(() => { navigate('/profile') }, 2000);
    } catch(error) {
      setAddBookResponse({ 
        ...addBookResponse, 
        success: false,
        msg: "An error occured while adding this book." 
      });
    }
  }

  const handleCancel = () => {
    navigate('/profile');
  }

  return (
    <div id="add-book-container">
      <form action="" id="add-book-form"> 
        <div id="title-container">
          <input type="title" placeholder="Book Title" size="50"
          value={book.title} 
          onChange={handleInput} 
          name="title" id="title" />
        </div>
        <div id="description-container">
          <textarea type="text" placeholder="Book Description" 
          rows="10" cols="80"
          value={book.description} 
          onChange={handleInput} 
          name="description" id="description" />
        </div>
        <div id="cover-image-container">
          <input type="coverImage" placeholder='Cover Image URL' size="50"
          value={book.coverImage} 
          onChange={handleInput} 
          name="coverImage" id="cover-image" />
        </div>
      </form>
      <div id="add-book-result-msg-container">
        <p id="add-book-result-msg" 
          style={{
            backgroundColor: addBookResponse.success === true ? 
            'green' : 'red',
            padding: addBookResponse.msg === '' ? '0' : '8px 16px 8px 16px'
          }}
        >
        { addBookResponse.msg }
        </p>
      </div>
      <div>
      <button id="cancel-book-button" type="submit" 
      onClick={handleCancel}>Cancel</button>
        <button id="add-book-button" type="submit" 
        onClick={handleSubmit}>Add Book</button>
      </div>
    </div>
  )
}