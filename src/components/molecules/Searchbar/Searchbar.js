import './Searchbar.scss';
import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { setNoteFormState, searchBy } from '../../../redux/reducers/notesReducers';

import Icon from '../../atoms/Icon/Icon';
import InputField from '../../atoms/InputField/InputField';
import Button from '../../atoms/Button/Button';

function Searchbar({ setNoteFormState, searchBy }) {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        searchBy(searchText);
    }, [searchText, searchBy])

    const onChangeHandler = (e) => setSearchText(e.target.value);

    const resetSearch = () => setSearchText("")
    return (
        <div className={searchText.length === 0 ? 'searchbar searchbar--empty' : 'searchbar'}>
            <InputField inputType='text' placeholder='Search' icon={<Icon name="search" />} inputValue={searchText} onChangeHandler={onChangeHandler} />
            <Button clickHandler={resetSearch} buttonType="icon" icon={<Icon name="close" />}> </Button>
            <Button text='Add' icon={<Icon name='add' />} buttonType='primary' clickHandler={() => setNoteFormState({ isNotesFormOpen: true, isEditState: false, editNoteId: "" })} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNoteFormState: (obj) => dispatch(setNoteFormState(obj)),
        searchBy: (text) => dispatch(searchBy(text))
    };
};

export default connect(null, mapDispatchToProps)(Searchbar);