import React from 'react';
import Binary from './Binary.js';
import Linear from './Linear.js';
import './App.css';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isBinary: true};
  }

  update() {
    const choice = document.getElementById("search_choice");
    this.setState({
      isBinary: (choice.value === "Binary Search") ? true : false,
    });
  }

  
  render() {
    const contents = this.state.isBinary? <Binary /> : <Linear />;
    return (
      <div className="App">
        <div className="inputs">
          Mode: <select id="search_choice" onClick={this.update.bind(this)}>
            <option value="Binary Search">Binary Search</option>
            <option value="Linear Search">Linear Search</option>
          </select>
        </div>
        <br />
      {contents}  
      </div>
    );
  }
}

export default App;
