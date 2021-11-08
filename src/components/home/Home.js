import { useState, useEffect } from 'react';
import './Home.styles.scss';

import Row from '../rows/Row';

//Function to calculate number of columns depending upon screen width, has default value as initially no value is provided.
const noOfCols = (width = window.innerWidth) => {
  return Math.floor(width / 250); //Dividing by 250 to get right amount of rows depending upon the width
};

const Home = ({ movies, filters }) => {
  //State for rows and cols, Rows are set according to the no of cols and cols depends upon screen width.
  const [cols, setCols] = useState(noOfCols());
  const [rows, setRows] = useState(0);

  //useEffect to add event listener to check resizing of the window. Gets attached/detached while mounting/unmounting.
  useEffect(() => {
    window.addEventListener('resize', updateCols);
    return () => {
      window.removeEventListener('resize', updateCols);
    };
  }, []);

  //update cols function is called whenever resize happens. Only calls setcols when number of cols is different from the current value
  const updateCols = () => {
    setTimeout(() => {
      let newCols = noOfCols(window.innerWidth);
      if (newCols !== cols) {
        setCols(newCols);
      }
    }, 50); // set timeout is used because when maximize is clicked window width of when the click happens is used instead of the new full width.
  };

  //Create row is used to get the no of rows depening on column and data size.
  const createRows = () => {
    const data = Object.values(movies);
    const size = data.length;
    const newRows = Math.ceil(size / cols);
    if (rows !== newRows) {
      setRows(newRows);
    }
  };
  createRows();

  //Depending on the no of rows separate data slices are created. ie for 7 cols data slices of 7 items are created for each row.
  const mapRows = () => {
    const slicedArray = [];

    const data = Object.values(movies);
    const cols = noOfCols();
    for (let i = 0; i < rows; i++) {
      slicedArray.push(data.slice(i * cols, i * cols + cols));
    }
    console.log(slicedArray, 'Slice');
    return slicedArray;
  };

  return (
    <div className="home-container">
      <div className="filters-section">
        <span style={{ color: 'white' }}>Applied Filters:&nbsp;</span>
        {filters.length ? (
          filters.map((filter) => {
            <div className="Appliedfilter">{filter}</div>; // will display all the filters
          })
        ) : (
          <span>No filters Applied</span>
        )}
      </div>
      <div className="movies-container">
        {mapRows().map((rowData, index) => {
          return <Row movies={rowData} key={`row${index}`} />; //for all the rows
        })}
      </div>
    </div>
  );
};

export default Home;
