// import './NotesCategory.scss';
import "./NotesCategory.css";

function NotesCategory({ category }) {
  return (
    <span className={`category category--${category}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}

export default NotesCategory;
