import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ShowAllBooks.css'


export const ShowAllBooks = ()=> {

  const api = axios.create({
    baseURL: 'http://localhost:8080/graphql/',
    withCredentials: true
  })

  // State to store show all books api request response
  const [showAllBooks, setShowAllBooks] = useState(null);

  const [showAllBooksResponse, setShowAllBooksResponse] = useState({
    success: '',
    msg: ''
  });
  

  // Pass [] in the useEffect as a parameter to make request to 
  // API only once the state changes
  useEffect( () =>  {
    async function fetchData() {
      const response = await api.post('/', {
        query: `
          query getAllBooks {
            getAllBooks {
              success
              msg
              books {
                title
                description
                coverImage
              }
            }
          }`  
      });
      try {
        const { success, books, msg } = response.data.data.getAllBooks;
        if (success === true) {
          setShowAllBooks(books);
        } else {
          setShowAllBooksResponse({ 
            ...showAllBooksResponse, 
            sucess: success, 
            msg: msg 
          });
        }
      } catch (error) {
        setShowAllBooksResponse({ 
          ...showAllBooksResponse, 
          success: false, 
          msg: "An error has occured while trying to fetch the books." 
        })
      }
    }
    fetchData();
  }, [])


  return (
    <div id="show-all-books-container" >
      { showAllBooks?.map((book, index) => 
        <div id="show-all-books">
          <div id="show-all-books-info">
            <h1>{book.title}</h1>
            <div id="show-all-books-info-container">
              <img src={book.coverImage} alt="Book cover"
              style={{width: "200px", height: "300px"}}/>
              <p>{book.description}</p>
            </div>
          </div>
          <br/>
        </div>
      )}
    </div>
  )
}