import React from 'react';
import Binary from './Binary.js';
import Linear from './Linear.js';
import './App.css';

/**
 * App contains the state for which search algorithm is used and renders the
 * algorithm appropriately
 * @class
 */
class App extends React.Component {
  /**
   * Initiates the App class with Binary Search
   * @constructor
   * @param {object} props is only used as part of creating a React.Component
   */
  constructor(props) {
    super(props);
    this.state = {isBinary: true};
  }

  /**
   * update changes the search algorithm depending on which is selected
   */
  update() {
    const choice = document.getElementById('search_choice');
    this.setState({
      isBinary: (choice.value === 'Binary Search') ? true : false,
    });
  }

  /**
   * renders the App, its algorithm selector and the algorithm it self
   * @return {jsx} rendering of what the App should look like
   */
  render() {
    const contents = this.state.isBinary? <Binary /> : <Linear />;
    return (
      <div className='App'>
        <div className='inputs'>
          Mode: <select id='search_choice' onClick={this.update.bind(this)}>
            <option value='Binary Search'>Binary Search</option>
            <option value='Linear Search'>Linear Search</option>
          </select>
        </div>
        {contents}
      </div>
    );
  }
}

export default App;
