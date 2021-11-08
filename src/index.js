import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import configureStore from './store';
import { Provider } from 'react-redux';

/*configure store function to create store*/
const store = configureStore();

/*Have wrapped App component with provider to use store data everywhere*/
const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
