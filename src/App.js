import './App.css';
import Header from './Components/Header';
import Circle from './Components/Circle';
import Gameover from './Components/Gameover';
import {circles} from './Components/circles';
import Button from './Components/Button';
import React, { useState, Component } from "react";

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    showGameOver: false
    
  };

  timer = undefined;

   
     endGame = () => {
      console.log("game Ended");
      }

     clickHandler = (i) => {
      console.log("Button is clicked", i);
      this.setState({
        score: this.state.score +10,
      });
    };

    nextCircle = () => {
      let nextActive;

      do {
        nextActive = getRndInt(0,2)
      } while (nextActive === this.state.current);

      this.setState({
        current: nextActive,
      });
      console.log("active circle:", this.state.current);
      this.timer = setTimeout(this.nextCircle,1000);
    }

    startHandler = () => {
      this.nextCircle();
      };

      stopHandler = () => {
        clearTimeout(this.timer);
        this.setState({
          showGameOver: true
        });
      };

      closeHandler = () => {
        window.location.reload();
        this.setState({
          score: 0,
          current: -1,
        })
      }
  

  render() {

    return (
      <div className="App">
        <h1>Speedgame</h1>
        <p>Your score: {this.state.score}</p>
        {circles.map((_,i)=> (
          <Circle 
              key={i} 
              id={i} 
              click={()=> this.clickHandler(i)} 
              active={this.state.current === i}>

          </Circle>
        )
          
          )}
        <Button click={this.startHandler}>START</Button>
        <Button click={this.stopHandler}>END</Button>
          {this.state.showGameOver && <Gameover/>}
      </div>
    );
  }


}

export default App;
