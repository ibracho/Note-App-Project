import "./Button.scss";
// import "./button.css";

function Button({ text, icon, buttonType, clickHandler }) {
  return (
    <button className={`button button--${buttonType}`} onClick={clickHandler}>
      {icon ? icon : ""}
      {text}
    </button>
  );
}

export default Button;
