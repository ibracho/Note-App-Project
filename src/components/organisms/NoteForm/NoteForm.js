import { useState } from 'react';
import { connect } from "react-redux";
import { addNotes, setNoteFormState, editNotes } from '../../../redux/reducers/notesReducers';

import './NoteForm.scss';

import Icon from '../../atoms/Icon/Icon';
import InputField from '../../atoms/InputField/InputField';
import SelectField from '../../atoms/SelectField/SelectField';
import InputGroup from '../../molecules/InputGroup/InputGroup';
import TextAreaInput from '../../atoms/TextAreaInput/TextAreaInput';
import Button from '../../atoms/Button/Button';
import PopupContainer from '../../molecules/PopupContainer/PopupContainer';

function NoteForm({ noteForm, notes, addNote, editNotes, setNoteFormState, open, categories }) {
    const lastUsedID = notes.length > 0 ? notes[notes.length - 1].id : 0;
    let today = new Date();
    const emptyFormState = { id: lastUsedID + 1, title: '', category: 'personal', description: '', complete: false, date: today.toDateString() };
    const [note, setNote] = useState(noteForm.isEditState ? notes.filter(note => note.id === parseInt(noteForm.editNoteId))[0] : emptyFormState);

    const [formErrors, setFormErrors] = useState({ title: "", description: "" });

    const onInputChangeHandler = (e) => {
        if (e.target.getAttribute("name") === "category") {
            const name = "category";
            const value = e.target.getAttribute("value");
            setNote({ ...note, [name]: value });
        } else {
            const { name, value } = e.target;
            setNote({ ...note, [name]: value });
            validateField(name, value);
        }
    }

    const validateField = (name, value) => {
        if (name === "title") {
            if (value.length === 0) {
                setFormErrors({ ...formErrors, title: "This field is required" });
                return false;
            } else if (formErrors.title.length > 0) {
                setFormErrors({ ...formErrors, title: "" });
                return true;
            }
        } else if (name === "description") {
            if (value.length > 200) {
                setFormErrors({ ...formErrors, description: "Max 200 words" });
                return false;
            } else if (formErrors.description.length > 0) {
                setFormErrors({ ...formErrors, description: "" });
                return true;
            }
        }
        return true;
    }
    const formIsValid = () => {
        for (const key in note) {
            if (!validateField(key, note[key])) {
                return false;
            }
        }
        return true;
    }

    const onAddNoteHandler = () => {
        if (formIsValid()) {
            addNote(note);
            setNoteFormState({ isNotesFormOpen: false, isEditState: false, editNoteId: "" });
            setNote(emptyFormState)
        }
    }

    const onEditNoteHandler = () => {
        if (formIsValid()) {
            editNotes({
                ...note,
                date: today.toDateString()
            });
            setNoteFormState({ isNotesFormOpen: false, isEditState: false, editNoteId: "" });
            setNote(emptyFormState)
        }
    }
    return (
        <PopupContainer open={open}>
            <div className='new-note-container'>
                <div className='backdrop'></div>
                <div className='new-note'>
                    <div className='new-note__header'>
                        <h1>New note</h1>
                        <Button buttonType='icon' icon={<Icon name='close' height='24' width='24' />} clickHandler={() => setNoteFormState({ isNotesFormOpen: false, isEditState: false, editNoteId: "" })} />
                    </div>
                    <div className='new-note__input-groups new-note__input-groups--space-between'>
                        <InputGroup errorMessage={formErrors.title} input={<InputField name="title" inputType='text' placeholder='Title' onChangeHandler={onInputChangeHandler} inputValue={note.title} />} label="Title" />
                        <InputGroup input={<SelectField name="category" placeholder="Select" options={categories} onChangeHandler={onInputChangeHandler} inputValue={note.category} />} label="Category" />
                    </div>
                    <InputGroup showWordCount={true} maxWordsCount={200} typedWordsCount={note.description.length} errorMessage={formErrors.description} input={<TextAreaInput cols='1' rows='10' placeholder='Add description' name='description' onChangeHandler={onInputChangeHandler} inputValue={note.description} />} label="Description (optional)" />
                    <div className='new-note__input-groups new-note__input-groups--flex-end'>
                        <Button text='Cancel' buttonType='ghost' clickHandler={() => setNoteFormState({ isNotesFormOpen: false, isEditState: false, editNoteId: "" })} />
                        {
                            noteForm.isEditState
                                ? <Button text='Edit Note' clickHandler={onEditNoteHandler} buttonType='primary' />
                                : <Button text='Add Note' clickHandler={onAddNoteHandler} buttonType='primary' />
                        }
                    </div>
                </div>
            </div>
        </PopupContainer>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNote: (obj) => dispatch(addNotes(obj)),
        editNotes: (obj) => dispatch(editNotes(obj)),
        setNoteFormState: (obj) => dispatch(setNoteFormState(obj)),
    };
};
const mapStateToProps = (state) => {
    return {
        notes: state.notes,
        noteForm: state.noteForm,
        categories: state.categories
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
