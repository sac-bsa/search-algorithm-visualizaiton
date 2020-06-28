import React from 'react';

/**
 * Renders a Binary search visualization
 * @class
 */
class Binary extends React.Component {
  /**
   * Initializes the boxes with 101 spaces
   * @param {object} props used for initializing the React.Component
   */
  constructor(props) {
    super(props);
    this.state = {
      guessesTaken: [],
      spaceCount: 101,
      lowerBound: 0,
      upperBound: 100,
      currentGuess: 50,
      found: false,
    };
  }

  /**
   * restarts the game with the specified number of spaces
   */
  restart() {
    const spaceCount = document.getElementById('nsquares').value;
    this.setState({
      guessesTaken: [],
      spaceCount: spaceCount,
      lowerBound: 0,
      upperBound: spaceCount - 1,
      currentGuess: Math.floor((spaceCount - 1)/2),
      found: false,
    });
  }

  /**
   * Handles button click for greater than, which results in narrowing the
   * search field or finding the right number
   */
  handleUpper() {
    const guessesTaken = this.state.guessesTaken.slice();
    guessesTaken.push(this.state.currentGuess);
    const lowerBound = this.state.currentGuess + 1;
    const newGuess = Math.floor((lowerBound + this.state.upperBound) / 2);
    if (lowerBound === this.state.upperBound) {
      alert(
          'Eureka, by elimination it must be ' +
          lowerBound.toString() +
          '. It only took ' +
          guessesTaken.length.toString() +
          ' guesses.',
      );
      this.setState({
        currentGuess: lowerBound,
        found: true,
        guessesTaken: guessesTaken,
      });
    } else if (lowerBound > this.state.upperBound) {
      alert('We seem to have a problem. I am going to restart the game.');
      this.restart();
    } else {
      this.setState({
        guessesTaken: guessesTaken,
        lowerBound: lowerBound,
        currentGuess: newGuess,
      });
    }
  }

  /**
   * Handles button click for equal to, which results in declaring finding the
   * right number
   */
  handleEqual() {
    alert(
        'Eureka, thanks for confirming it was ' +
        this.state.currentGuess.toString() +
        '. We found this in ' +
        (this.state.guessesTaken.length + 1).toString() +
        ' guesses',
    );
    this.setState({
      found: true,
    });
  }

  /**
   * Handles button click for less than which will result in changing the state
   * and getting closer to finding the right number
   */
  handleLower() {
    const guessesTaken = this.state.guessesTaken.slice();
    guessesTaken.push(this.state.currentGuess);
    const upperBound = this.state.currentGuess - 1;
    const newGuess = Math.floor((this.state.lowerBound + upperBound) / 2);
    if (this.state.lowerBound === upperBound) {
      alert(
          'Eureka, by my calculations it must be ' +
          upperBound.toString() +
          '. It only took ' +
          guessesTaken.length.toString() +
          ' guesses.',
      );
      this.setState({
        found: true,
        currentGuess: upperBound,
        guessesTaken: guessesTaken,
      });
    } else if (this.state.lowerBound > upperBound ) {
      alert(
          'We seem to have a problem. ' +
          'I am going to restart the game for you',
      );
      this.restart();
    } else {
      this.setState({
        guessesTaken: guessesTaken,
        upperBound: upperBound,
        currentGuess: newGuess,
      });
    }
  }

  /**
   * renders a single box
   * @param {number} id which represents which square it is
   * @return {jsx} JSX formatted div element representing a single square
   */
  renderSquare(id) {
    if (id === this.state.currentGuess) {
      if (this.state.found) {
        return <div key={id} className="box found">{id}</div>;
      } else {
        return <div key={id} className="box guess">{id}</div>;
      }
    } else if (this.state.guessesTaken.includes(id)) {
      return <div key={id} className="box badGuess">{id}</div>;
    } else if (id >= this.state.lowerBound && id <= this.state.upperBound) {
      return <div key={id} className="box potential">{id}</div>;
    } else {
      return <div key={id} className="box impossible">{id}</div>;
    }
  }

  /**
   * Renders the Binary visualization through the inputs and boxes
   * @return {jsx} JSX formed visualization
   */
  render() {
    const header = (
      <div className="inputs">
        Size: <input
          type="number"
          defaultValue="101"
          min="1"
          step="1"
          id="nsquares"
          onClick={this.restart.bind(this)}
        />
        <button onClick={this.restart.bind(this)}>Restart</button><br />
        <button onClick={this.handleLower.bind(this)}>Less Than</button>
        <button onClick={this.handleEqual.bind(this)}>Equal to</button>
        <button onClick={this.handleUpper.bind(this)}>Greater Than</button>
        <br />
      </div>
    );
    const elements = [];
    for (let i = 0; i < this.state.spaceCount; i++) {
      elements.push(this.renderSquare(i));
    }
    return (
      <div className="binary">
        {header}
        <div className="boxes">
          {elements}
        </div>
      </div>
    );
  }
}
export default Binary;
