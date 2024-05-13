import './InputGroup.scss';

function InputGroup({ input, label, errorMessage, showWordCount, maxWordsCount, typedWordsCount }) {
  return (
    <div className='input-group'>
      {label ? <div className='input-group__label-container'><label>{label}</label>{showWordCount && <span className={typedWordsCount > maxWordsCount ? 'input-group__word-count input-group__word-count--over' : 'input-group__word-count'}>{typedWordsCount}/{maxWordsCount}</span>}</div> : ''}
      {input}
      {errorMessage && errorMessage.length > 0 ? <p className='input-group__error'>{errorMessage}</p> : ""}
    </div>
  )
}

export default InputGroup;