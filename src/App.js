import React, {Component} from 'react';

import '../src/style.css';

class TrafficLight extends Component {
  constructor(props){
    super(props);
    this.state = {
      timer: 0,
      clicked: false
    }

    this.crossTheStreet = this.crossTheStreet.bind(this);
  }
  
      crossTheStreet(e){
        this.setState({clicked: true})
        
        let time = setInterval(() => {
          this.setState({
            timer: this.state.timer + 1,
        });
        }, 1000);
        setTimeout((e) => {
          clearInterval(time);
          this.setState({
            timer: 0,
            clicked: false

          });
        }, 20000);
      }

  render(){
    return (
    <>
      <div className="container">
        <div className={this.state.timer <= 7 ? "light red-light highlight-red":"light red-light"}></div>
        <div className={(this.state.timer >= 6 && this.state.timer < 10) || this.state.timer >= 16 ? "light yellow-light highlight-yellow" : "light yellow-light"}></div>
        <div className={(this.state.timer >= 10 && this.state.timer <= 16) ? "light green-light highlight-green" : "light green-light"}></div>
        <button disabled={this.state.clicked} onClick={this.crossTheStreet}>Press to cross the street</button>
        <div className="timer">{this.state.timer}</div>
      </div>
    </>
  );
}
}

export default TrafficLight;
