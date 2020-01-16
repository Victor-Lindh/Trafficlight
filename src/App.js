import React, {Component} from 'react';
import Message from './Message';
import '../src/style.scss';

class TrafficLight extends Component {
  constructor(props){
    super(props);
    this.state = {
      timer: 0,
      clicked: false,
      messageIsVisible: false,
      cars: []
    }

    this.crossTheStreet = this.crossTheStreet.bind(this);
    this.carsPopulating = this.carsPopulating.bind(this);

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
            clicked: false,
            cars: []
          });
        }, 20000);
      }

 UNSAFE_componentWillUpdate(){
   this.carsPopulating();

}
    async carsPopulating () {

        let call = await this.state.timer === 3;
        if(call){
        
         this.setState({cars: ['Car 1', 'Car 2', 'Car 3']});
        }
      }
  render(){
    return (
    <>
      <div className="container">
        <div className={(this.state.timer <= 7 || this.state.timer > 19) ? "light red-light highlight-red" : "light red-light"}></div>
        <div className={(this.state.timer >= 6 && this.state.timer < 10) || (this.state.timer >= 15 && this.state.timer <= 19) ? "light yellow-light highlight-yellow" : "light yellow-light"}></div>
        <div className={(this.state.timer >= 10 && this.state.timer <= 17) ? "light green-light highlight-green" : "light green-light"}></div>
        <button id="btn" disabled={this.state.clicked} onClick={this.crossTheStreet}>Press to cross the street</button>
        <div className="timer">{this.state.timer}</div>
      </div>
        <Message
          time={this.state.timer}
          clicked={this.state.clicked}
          note={(this.state.timer < 10 || this.state.timer > 19) ? "Please do not cross!" : "Please cross!"}
        />
        <div
          style={{
            listStyleType: `none`,
            position: `absolute`, 
            top: `50px`, 
            right: `200px`, 
            color: `yellow`, 
            fontSize: `24px`,
            
            }}>
          <div>{
              (this.state.cars.length > 0 && this.state.timer >= 9 || this.state.timer >= 19) ? this.state.cars.map((car, index) => 
              <li key={index}>{car} stopped...</li>)
              : 'Cars driving...'
          }</div>
        </div>
    </>
  );
}}
export default TrafficLight;