import './PopupContainer.scss'

function PopupContainer({open, children}) {
  return (
    <div className={open ? `popup-container popup-container--open` : 'popup-container'}>
         <div className='backdrop'></div>
         {children}
    </div>
  )
}

export default PopupContainer;