import './InputField.scss';
import searchIcon from '../../../assets/icons/search.svg';

function InputField({inputType, name, placeholder, icon, inputValue, onChangeHandler}) {
  return (
    <input name={name} className={icon ? `input input--with-icon` : `input`} style={icon ? {backgroundImage: `url(${searchIcon})`} : {}} type={inputType} placeholder={placeholder} onChange={onChangeHandler} value={inputValue}/>
  )
}

export default InputField;