import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { DeleteModal } from './DeleteModal';
import './UserBooks.css'


export const UserBooks = () => {
  
  const api = axios.create({
    baseURL: 'http://localhost:8080/graphql/',
    withCredentials: true // To send the saved cookies with every client request to the server
  })

  // State for storing books (book id, title, description, coverImage)
  const [books, setBooks] = useState(null);
  const [booksError, setBooksError] = useState(null);
  const navigate = useNavigate();

  
  // Fetches user books and sets them in the "books" state
  useEffect( () => {
    async function fetchData() {
      const response = await api.post('/', {
        query: `
          query getAllBooksOwnedByUser($id: String) {
            getAllBooksOwnedByUser(id: $id) {
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
            id: Cookies.get('id')  
          },   
      });

      try {
        const { success, books, msg } = response.data.data.getAllBooksOwnedByUser;
        if (success === true) {
          setBooks(books)
        } else {
          setBooksError({ 
            ...booksError, 
            sucess: success, 
            msg: msg 
          });
        }
      } catch (error) {
        setBooksError({ 
          ...booksError, 
          sucess: false, 
          msg: 'Encountered an error while fetching the books.' 
        });
      }
    }

    fetchData();
  }, [])



  // Handles book edit button
  const handleUpdate = async(index) => {
    // Pass the selected book id to the URL 
    const queryString = new URLSearchParams({
      id: books[index].id,
    })
    navigate(`/profile/books/edit/query?${queryString}`)
  }


  // Handles book delete button
  const openDeleteModal = (book) => {
    setShowModalData( {id: book.id, title: book.title} );
    setShowModal(true)
  }

  const closeDeleteModal = () => {
    setShowModal(false)
  }

  const [showModal, setShowModal] = useState(false);
  const [showModalData, setShowModalData] = useState({
    id: '',
    title: '',
  });
  

  return (
      <div id="show-user-books-container">
        {books?.map((book, index) => 
          <div id="show-user-books">
            <div id="user-books-info">
              <h1>{book.title}</h1>
              <div id="user-books-info-container">
                <img src={book.coverImage} alt="Book cover"
                style={{width: "200px", height: "300px"}} />
                <p>{book.description}</p>
              </div>
            </div>
            <div id="user-books-button">
              <button  type="submit" id="edit-book"
              onClick={ async() => { handleUpdate(index) }}>Edit</button>
              <button type="submit" id="delete-book" key={book.toString()}
              onClick={() => {
                openDeleteModal(book);
              }} >Delete</button>

            </div>
            <br/>
          </div>
        )}
        <DeleteModal
          show={showModal}
          onHide={closeDeleteModal}
          bookinfo={showModalData}  
        />
      </div>
  )
}