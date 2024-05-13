import './EmptyState.scss';
import Icon from '../../atoms/Icon/Icon';

function EmptyState({text}) {
  return (
   <div className='empty-state'>
        <div className='empty-state__image'><Icon name='empty-state' width='220' height='220'/></div>
        <p>{text}</p>
   </div>
  );
}

export default EmptyState;
