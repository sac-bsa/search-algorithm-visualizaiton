import React from 'react';

/**
 * Linear displays and tracks a linear search visualization
 * @class
 */
class Linear extends React.Component {
  /**
   * @constructor
   * @param {object} props used only to initialize the React.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      spaceCount: 11,
      currentGuess: 0,
      found: false,
    };
  }

  /**
   * Resets the visualization with the number of boxes specified
   */
  restart() {
    const spaceCount = document.getElementById('nsquares').value;
    this.setState({
      spaceCount: spaceCount,
      currentGuess: 0,
      found: false,
    });
  }

  /**
   * Handles user saying that the current guess is their number
   */
  handleEqual() {
    alert('Eureka, thanks for confirming it was ' +
        this.state.currentGuess.toString() +
        '. We found this in ' +
        (this.state.currentGuess + 1).toString() +
        ' guesses',
    );
    this.setState({
      found: true,
    });
  }

  /**
   * Handles incrementing the linear search and error handling if the value is
   * not found
   */
  handleNotEqual() {
    const currentGuess = this.state.currentGuess + 1;
    if (currentGuess >= this.state.spaceCount) {
      alert('There seems to have been a problem,' +
        'as you have provided information that seems inconsistent.');
      this.restart();
    } else {
      this.setState({
        currentGuess: currentGuess,
      });
    }
  }

  /**
   * renders a single box
   * @param {number} id represents the value of the box
   * @return {jsx} a div that shows a single box
   */
  renderSquare(id) {
    if (id === this.state.currentGuess) {
      if (this.state.found) {
        return <div key={id} className="box found">{id}</div>;
      } else {
        return <div key={id} className="box guess">{id}</div>;
      }
    } else if (id < this.state.currentGuess) {
      return <div key={id} className="box badGuess">{id}</div>;
    } else {
      return <div key={id} className="box potential">{id}</div>;
    }
  }

  /**
   * Renders the linear algorithm visualization
   * @return {jsx} JSX controls and boxes for the visualization
   */
  render() {
    const header = (
      <div className="inputs">
        Size: <input
          type="number"
          defaultValue="11"
          min="1"
          step="1"
          id="nsquares"
          onClick={this.restart.bind(this)}
        />
        <button onClick={this.restart.bind(this)}>Restart</button>
        <br />
        <button onClick={this.handleEqual.bind(this)}>Equal to</button>
        <button onClick={this.handleNotEqual.bind(this)}>Not Equal To</button>
        <br />
      </div>
    );
    const elements = [];
    for (let i = 0; i < this.state.spaceCount; i++) {
      elements.push(this.renderSquare(i));
    }
    return (
      <div className="linear">
        {header}
        <div className="boxes">
          {elements}
        </div>
      </div>
    );
  }
}
export default Linear;
