import { useEffect } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import { fetchData } from '../src/actions';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';

function App({ data, dispatch, filters: { EventLanguage, EventGenre } }) {
  //Dispatched action to make API call and store the data in the redux store.
  useEffect(() => {
    try {
      dispatch(fetchData());
    } catch (err) {
      console.log(err, 'Error');
    }
  }, []);

  //Function to handle filteration of data on the basis of language and genre.
  const handleFilters = () => {
    const movies = Object.values(data.movies);

    let filteredArray = [];
    //for loop to get all the movies with the language filters applied
    if (EventLanguage.length > 0) {
      for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < EventLanguage.length; j++) {
          if (movies[i]['EventLanguage'] === EventLanguage[j]) {
            filteredArray.push(movies[i]);
            break; //break if movie has any of the language that is required
          }
        }
      }
      //if genre filters  are also applied then filtered array will only get elements which hav both language and event filters in them.
      if (EventGenre.length > 0) {
        let newFilteredArray = [...filteredArray];
        for (let i = 0; i < filteredArray.length; i++) {
          for (let j = 0; j < EventGenre.length; j++) {
            if (!filteredArray[i]['EventGenre'].includes(EventGenre[j])) {
              newFilteredArray.splice(
                newFilteredArray.indexOf(filteredArray[i]),
                1
              );
              break;
            }
          }
        }
        filteredArray = [...newFilteredArray];
      } // this case will only run if only genre filters are applied if both the filters are applied then the above case would run.
    } else {
      for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < EventGenre.length; j++) {
          if (movies[i]['EventGenre'].includes(EventGenre[j])) {
            filteredArray.push(movies[i]); //checking and adding if movie has the required genre using includes function as movie can fit into multiple genres.
            break;
          }
        }
      }
    }
    return filteredArray;
  };

  //function to consolidate all the filter values in one array to show in the applied filters section.
  const consolidatefilter = () => {
    //Has 3 cases first if both the keys have 0 filters ie no filters are applied.
    if (EventLanguage.length <= 0 && EventGenre.length <= 0) {
      return [];
    } //case where both are filters are applied
    else if (EventLanguage.length > 0 && EventGenre.length > 0) {
      return [...EventLanguage, ...EventGenre];
    } // case where only any one of the filters is applied
    else {
      return EventLanguage.length > 0 ? [...EventLanguage] : [...EventGenre];
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Home
        movies={
          EventLanguage.length > 0 || EventGenre.length > 0
            ? handleFilters()
            : data.movies
          //if any of the arrays have values ie filters are applied then handle filters is called to send filtered data to home component.
        }
        filters={
          consolidatefilter() //to consolidate and make it into an array before sending down to child component
        }
      />
    </div>
  );
}

// Using filters slice and data slice from the store.
function mapStateToProps(state) {
  return {
    data: state.data,
    filters: state.filters
  };
}

export default connect(mapStateToProps)(App);
