import './App.scss';
import Searchbar from './components/molecules/Searchbar/Searchbar';
import NoteForm from './components/organisms/NoteForm/NoteForm';
import NotesList from './components/organisms/NotesList/NotesList';
import DeleteNoteForm from './components/organisms/DeleteNoteForm/DeleteNoteForm';
import Auth0ProviderWithHistory from './auth0Provider';
import { useAuth0 } from '@auth0/auth0-react';
import {deleteNote} from './redux/reducers/notesReducers';

import { connect } from "react-redux";
import React, { useState } from 'react';
import TabsContainer from './components/molecules/TabsContainer/TabsContainer';
import EmptyState from './components/organisms/EmptyState/EmptyState';
import axios from 'axios';


// import ability to check store
// console log notes array
import store from "./redux/store";

//
//
//
//
//
function App(props) {
  const [isDeleteNoteFormOpen, setIsDeleteNoteFormOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState('');
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  
  let currentArray = store.getState().notes
  console.log(store.getState().notes)
  axios.post('http://localhost:3010/ToAtlas', currentArray)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  
  

  const toggleDeleteNoteForm = (e) => {
    const noteElement = e.target.closest('.note');
    const noteId = noteElement ? noteElement.getAttribute('note-id') : '';
    setIsDeleteNoteFormOpen(!isDeleteNoteFormOpen);
    setNoteIdToDelete(noteId);
  };

  console.log(isAuthenticated)
  let loginButton = <button className="button__login" onClick={()=>{
    loginWithRedirect()
  }}>
  Log In
</button>

let logoutButton = <button className="button__login" onClick={()=>{
  logout()
}}>
Log out
</button>
  return ( 
    // the layout of the entire app. Add some branding in here some where
    <>
      <div className="App">
        Logged in: {isAuthenticated ? "yes": "no"}<br/>
      
        {isAuthenticated ? logoutButton : loginButton}
        <Searchbar />
        <div className="container">
          <h1>DEEZ Notes</h1>
          <TabsContainer />
          {props.notes.length > 0 ? (
            <NotesList deleteFormOpenStateHandler={toggleDeleteNoteForm} />
          ) : (
            <EmptyState text="You don't have any notes" />
          )}
        </div>
        {props.isNotesFormOpen && <NoteForm open={props.isNotesFormOpen} />}
        {isDeleteNoteFormOpen && (
          <DeleteNoteForm
            isDeleteNoteFormOpen={isDeleteNoteFormOpen}
            deleteNote={props.deleteNote}
            deleteFormOpenStateHandler={toggleDeleteNoteForm}
          />
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  isNotesFormOpen: state.noteForm.isNotesFormOpen,
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNote: (obj) => dispatch(deleteNote(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
