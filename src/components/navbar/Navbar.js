import { connect } from 'react-redux';

import Checkbox from '../checkbox/Checkbox';
import { clearFilter } from '../../actions';
import './Navbar.styles.scss';

const Navbar = ({ data, dispatch }) => {
  return (
    <div>
      <nav>
        {/*nav is divided into two parts left and right
        1) Left Side contains Brand and two non-functional buttons
        2) Right Side has checkboxes components to apply filters and a Clear all filters button.
        */}
        <div className="nav-left">
          <div className="nav-left-heading">
            <h3>Movie Trailers</h3>
          </div>
          <div className="nav-left-buttons">
            <button className="nav-button active">Coming Soon</button>
            <button className="nav-button">Now Showing</button>
          </div>
        </div>
        <div className="nav-right">
          <Checkbox
            classType={'Language'}
            defaultValue={'All Languages'}
            value={data.languages}
          />
          <Checkbox
            classType={'Genre'}
            defaultValue={'All Genre'}
            value={[
              'Drama',
              'Romance',
              'Adventure',
              'Thriller',
              'Action',
              'Classic',
              'Biography',
              'Animation',
              'Comedy',
              'Family',
              'History',
              'Horror',
              'Musical',
              'Mystery'
            ]}
          />
          <span
            class="material-icons-outlined"
            style={{ color: 'white', cursor: 'pointer' }}
            onClick={() => dispatch(clearFilter())} //onCLick of the clear button all filters would get cleared as action is getting dispatched
          >
            X
          </span>
        </div>
      </nav>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(mapStateToProps)(Navbar);
