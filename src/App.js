import React, {Component} from 'react';
import Message from './Message';
import '../src/style.scss';

class TrafficLight extends Component {
  constructor(props){
    super(props);
    this.state = {
      timer: 0,
      clicked: false,
      messageIsVisible: false
    }

    this.crossTheStreet = this.crossTheStreet.bind(this);
  }
  
    crossTheStreet(){
        this.setState({
          clicked: true,
          messageIsVisible: true
        })
        
        let time = setInterval(() => {
          this.setState({
            timer: this.state.timer + 1,
        });
        }, 1000);
        setTimeout(() => {
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
        <div className={this.state.timer <= 7 || this.state.timer == 20 ? "light red-light highlight-red":"light red-light"}></div>
        <div className={(this.state.timer >= 6 && this.state.timer < 10) || this.state.timer >= 15 && this.state.timer <= 19 ? "light yellow-light highlight-yellow" : "light yellow-light"}></div>
        <div className={(this.state.timer >= 10 && this.state.timer <= 16) ? "light green-light highlight-green" : "light green-light"}></div>
        <button id="btn" disabled={this.state.clicked} onClick={this.crossTheStreet}>Press to cross the street</button>
        <div className="timer">{this.state.timer}</div>
      </div>
      
        <Message
        time={this.state.timer}
        clicked={this.state.clicked}
        note={this.state.timer < 10 || this.state.timer > 16 ? "Please do not cross!" : "Please cross!"}/>
    </>
  );
}}

export default TrafficLight;
