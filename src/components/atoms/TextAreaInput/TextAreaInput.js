import './TextAreaInput.scss';

function TextAreaInput({cols, rows, placeholder, name, inputValue, onChangeHandler}) {
  return (
    <textarea className='textarea' cols={cols} rows={rows} value={inputValue} placeholder={placeholder} name={name} onChange={onChangeHandler}></textarea>
  )
}

export default TextAreaInput;