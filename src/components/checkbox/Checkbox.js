import { useState } from 'react';
import { connect } from 'react-redux';
import { addFilter, removeFilter } from '../../actions/index';
import './Checkbox.styles.scss';

const Checkbox = ({ value, defaultValue, classType, dispatch }) => {
  //A separate state is used for dispatching remove and add filter actions if the item exists or not.
  const [checked, setChecked] = useState([]);

  //whenever a click event takes place if the value recieved in target is "option" or Empty String then nothing happens but if its a filter then the checked array is checked if filter exists then removeFilter action is dispatched and if it doesn't then that filter is added.
  const handleClick = (e) => {
    if (e.target.className === 'option' || e.target.className === '') {
    } else {
      if (checked.includes(e.target.id)) {
        let filteredArray = checked.filter((item) => {
          if (item !== e.target.id) {
            return item;
          }
        });
        setChecked(filteredArray);
        dispatch(removeFilter(e.target.className, e.target.id));
      } else {
        setChecked([...checked, e.target.id]);
        dispatch(addFilter(e.target.className, e.target.id));
      }
    }
  };

  //Function changes the value of the button according to the selected filters and if the multiple filters are selected then the string of filters is sliced.
  const handleValues = () => {
    let string = checked.join(',');
    if (string.length > 8) return string.slice(0, 10) + '...';
    else return string;
  };

  return (
    <div className="dropdown">
      <button name="dropdown-button">
        {
          checked.length ? handleValues() : defaultValue //if nothing is checked then the default passed value is shown on the button
        }
      </button>
      <div className="dropdown-list" onClick={handleClick}>
        {value.map((item, index) => {
          return (
            <div className="option" key={`${classType}+${index}`}>
              <input
                type="checkbox"
                className={`Event${classType}`}
                id={item}
                checked={checked.includes(item) ? true : false} // all the values in checked are kept as checked
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    filters: state.filters
  };
}

export default connect(mapStateToProps)(Checkbox);
