import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import './DeleteModal.css'

export const DeleteModal = (props) => {

  const api = axios.create({
    baseURL: 'http://localhost:8080/graphql/',
    withCredentials: true // To send the saved cookies with every client request to the server
  })

  // State to store delete book api request result
  const [deleteBookResponse, setDeleteBookResponse] = useState({
    success: '',
    msg: ''
  })

  const handleDelete = async(bookID) => {
    const response = await api.post('/', {
      query: `
        mutation deleteBook($bookID: String) {
          deleteBook(bookID: $bookID) {
            success
            msg
          }
        }`  
        ,
        variables: {
          bookID: bookID,
        },   
    });

    try {
      const { success, msg } = response.data.data.deleteBook;
      setDeleteBookResponse({ 
        ...deleteBookResponse,  
        success: success, 
        msg: msg 
      });
      window.location.reload();
    } catch(error) {
      setDeleteBookResponse({ 
        ...deleteBookResponse, 
        success: false, 
        msg: 'An error occured while deleting this book.'
      });
    }
  }

  
  return (
    <div>
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You sure you want to delete book "{[props.bookinfo.title]}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={async() => {
            handleDelete(props.bookinfo.id);
          }}>Confirm</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      <div id="delete-book-result-msg-container">
        <p id="delete-book-result-msg" 
          style={{
            backgroundColor: deleteBookResponse.success === true ? 
            'green' : 'red',
            padding: deleteBookResponse.msg === '' ? '0' : '8px 16px 8px 16px'
          }}
        >
        { deleteBookResponse.msg }
        </p>
        </div>
      </div>
  )
}