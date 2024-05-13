import './NotesList.scss';
import { connect } from "react-redux";

import Note from '../Note/Note';
import EmptyState from '../EmptyState/EmptyState';
import { setNoteFormState, completeNote } from '../../../redux/reducers/notesReducers';

function NotesList({notes, filterNotesBy, setNoteFormState, deleteFormOpenStateHandler, completeNote}) {
  let notesList = filterNotesBy.text === "" ? [...notes] : notes.filter((note) => note.title.toLowerCase().indexOf(filterNotesBy.text.toLowerCase()) > -1);
  notesList = filterNotesBy.category === "" ? [...notesList] : notesList.filter((note) => note.category === filterNotesBy.category);
  notesList = filterNotesBy.showCompletedOnly ? notesList.filter((note) => note.complete === true) : notesList;
  
  const sortFunction = (p1, p2) => {
    const p1Date = new Date(p1.date);
    const p2Date = new Date(p2.date);
    return (p1Date < p2Date) ? 1 : ((p1Date > p2Date) ? -1 : 0);
  }
  //sort by date
  notesList.sort(
    (p1, p2) => sortFunction(p1, p2)
  );
  // sorty by complete at the end
  notesList.sort(
    (p1, p2) =>  p1.complete ? 1 : -1
  )
  
  const editNoteHandler = (e) => {
    const noteId = e.target.closest('.note').getAttribute("note-id");
    setNoteFormState({
      isNotesFormOpen: true,
      isEditState: true,
      editNoteId: noteId
    })
  }

  const completeNoteHandler = (e) => {
    console.log("in complete note handler")
    const noteId = e.target.closest('.note').getAttribute("note-id");
    console.log('note id is', noteId)
    completeNote(noteId);
  }

  return (
    <div className='notes-list'>
        {
          notesList.length > 0 
            ? notesList.map((note) => <Note key={note.id} {...note} editNoteHandler={editNoteHandler} deleteFormOpenStateHandler={deleteFormOpenStateHandler} completeNoteHandler={completeNoteHandler}/>)
            : <EmptyState text='No notes found' />
        }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    filterNotesBy:state.filterNotesBy
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNoteFormState: (obj) => dispatch(setNoteFormState(obj)),
    completeNote: (noteId) => dispatch(completeNote(noteId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotesList);