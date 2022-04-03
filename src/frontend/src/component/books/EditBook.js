import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import './EditBook.css'
import Cookies from 'js-cookie'

export const EditBook = () => {

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'http://localhost:8080/graphql/',
    withCredentials: true
  })

  // State to store edit book api request result
  const [editBookResponse, setEditBookResponse] = useState({
    success: '',
    msg: ''
  })


  // State to store search parameters passed in the url
  let [searchParams] = useSearchParams();

  // State to store info of the book that is being edited
  const [bookInfo, setBookInfo] = useState({
    // id: searchParams.get('id'),
    title: '',
    description: '',
    coverImage: ''
  });


  /**
   * Pass [] in the useEffect as a parameter to make request to 
   * API only once the state changes
   * 
   * Fetches book info and set it in the 'bookInfo' state that will be
   * displayed to the user in the input boxes.
   */ 
  useEffect( () => {
    const bookID = searchParams.get('id');

    /**
     * Any authorize user can fetch/edit all the books. Like if the user 
     * opens a book and then manually changes the book id in the url.
     * 
     * So, we need to make sure that only the user to whom this book belongs
     * to can fetch this book and no one else.
     * 
     * For this pass book id and user id as parameters to the endpoint.
     */ 
    async function fetchData() {
      const response = await api.post('/', {
        query: `
          query getBookByUser($userID: String, $bookID: String) {
            getBookByUser(userID: $userID, bookID: $bookID) {
              success
              msg
              books {
                id
                title
                description
                coverImage
              }
            }
          }`  
          ,
          variables: {
            userID: Cookies.get('id'),
            bookID: bookID
          },   
      });

      try {
        const { success, books, msg } = response.data.data.getBookByUser;
        if (success === true) {
          setBookInfo(books);
        } else {
          setEditBookResponse({ 
            ...editBookResponse, 
            success: success, 
            msg: msg 
          });
          // Wait for 2 seconds before navigating to the profile page.
          setTimeout(() => { navigate('/profile') }, 2000);
        }
      } catch (error) {
        setEditBookResponse({ 
          ...editBookResponse, 
          success: false, 
          msg: "An error occured while editing the book." 
        });
        
        // Wait for 2 seconds before navigating to the profile page.
        setTimeout(() => { navigate('/profile') }, 2000);
      }
    }

    fetchData();

  }, [])



  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // To get values for each input field in the form
    setBookInfo({ ...bookInfo, [name] : value })
  }


  // Performs update book request and save the response in the 'editBookResponse' state
  async function updateBook(bookID) {
    const response = await api.post('/', {
      query: `
        mutation updateBook($bookID: String, $book: Book) {
          updateBook(bookID: $bookID, book: $book) {
            success
            msg
          }
        }`  
        ,
        variables: {
          bookID: bookID,
          book: {
            title: bookInfo.title,
            description: bookInfo.description,
            coverImage: bookInfo.coverImage
          }
        },   
    });
   
    try {
      const { success, msg } = response.data.data.updateBook;
      setEditBookResponse({ 
        ...editBookResponse,  
        success: success, 
        msg: msg 
      });  
      // Wait for 2 seconds before navigating to the profile page.
      setTimeout(() => { navigate('/profile') }, 2000);
    } catch(error) {
      setEditBookResponse({ 
        ...editBookResponse, 
        success: false,
        msg: "An error occured while editing this book." 
      });
      setTimeout(() => { navigate('/profile') }, 2000);
    }
  }

  
  const handleSave = async (e) => {
    const bookID = bookInfo.id;
    e.preventDefault();   // to prevent page refresh
    updateBook(bookID);
  }

  const handleCancel = () => {
    navigate('/profile');
  }

  return (
    <div id="edit-book-container" >
      <form action="edit-book-form">
        <div id="edit-title-container">
            <input type="text" size="50"
            value={bookInfo.title} 
            onChange={handleInput} 
            name="title" id="edit-title" />
          </div>
          <div id="edit-description-container">
            <textarea type="text" rows="10" cols="80" 
            value={bookInfo.description} 
            onChange={handleInput} 
            name="description" id="edit-description" />
          </div>
          <div id="edit-cover-image-container">
            <input type="text" size="50"
            value={bookInfo.coverImage} 
            onChange={handleInput} 
            name="coverImage" id="edit-cover-image" />
          </div>
      </form>
      <div id="edit-book-result-msg-container">
        <p id="edit-book-result-msg" 
          style={{
            backgroundColor: editBookResponse.success === true ? 
            'green' : 'red',
            padding: editBookResponse.msg === '' ? '0' : '8px 16px 8px 16px'
          }}
        >
        { editBookResponse.msg }
        </p>
      </div>
      <button id="cancel-book-button" type="submit" 
      onClick={handleCancel}>Cancel</button>
      <button id="edit-book-button" type="submit" 
      onClick={handleSave}>Save</button>
    </div>
  )
}