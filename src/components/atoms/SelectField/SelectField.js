import { useState } from 'react';
import './SelectField.scss';
import Icon from '../Icon/Icon';

function SelectField({ options, placeholder, name, onChangeHandler, inputValue }) {
    const [open, setOpen] = useState(false);

    const getDisplayValue = () => {
        const selectedOption = options.filter(option => option.value === inputValue);
        return selectedOption.length > 0 ? selectedOption[0].displayValue : placeholder;
    }

    return (
        <div id={name} className={`select select-${name} ${open ? 'select--open' : ''}`} onClick={() => setOpen(!open)}>
            <button className='select__button'>
                {getDisplayValue()}
                <Icon name='arrow-down' height='20' width='20' />
            </button>
            <ul>
                {options.map((option, i) => <li key={i} value={option.value} name={name} onClick={onChangeHandler}>{option.displayValue}</li>)}
            </ul>
        </div>
    )
}

export default SelectField;