import React from 'react';

class Linear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spaceCount: 11,
      currentGuess: 0,
      found: false
    };
  }

  restart() {
    const spaceCount = document.getElementById("nsquares").value;
    this.setState({
      spaceCount: spaceCount,
      currentGuess: 0,
      found: false
    });
  }

  handleEqual() {
    alert("Eureka, thanks for confirming it was " + this.state.currentGuess.toString() + ". We found this in " + (this.state.currentGuess + 1).toString() + " guesses");
    this.setState({
      found: true
    });
  }

  handleNotEqual() {
   const currentGuess = this.state.currentGuess + 1;
   if (currentGuess >= this.state.spaceCount) {
     alert("There seems to have been a problem, as you have provided information that seems inconsistent.");
     this.restart();
   } else {
     this.setState({
       currentGuess: currentGuess,
     });
   }
  }

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
 
  render() {
    const header = (
      <div className="inputs">
        Size: <input type="number" defaultValue="11" min="1" step="1" id="nsquares" onClick={this.restart.bind(this)} />
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
