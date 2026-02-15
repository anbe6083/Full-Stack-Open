import {useDispatch} from 'react-redux';
import {filterChange} from '../reducers/fiterReducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch ();
  const filterSelected = value => {
    console.log (value);
  };
  return (
    <div>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch (filterChange ('ALL'))}
      />
      all
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch (filterChange ('IMPORTANT'))}
      />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch (filterChange ('NONIMPORTANT'))}
      />
      nonimportant
    </div>
  );
};

export default VisibilityFilter;
