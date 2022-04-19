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
    showGameOver: false,
    pace: 1500,
    rounds: 0,
    gameOn: false,
    
  };

  timer = undefined;

     clickHandler = (i) => {

      if (this.state.current !== i) {
        this.stopHandler();

        return;
      }

      console.log("Button is clicked", i);
      this.setState({
        score: this.state.score + 10,
        rounds: this.state.rounds - 1,
      });
    };

    nextCircle = () => {
      if (this.state.rounds >= 1){
        this.stopHandler();
        return;
      }

      let nextActive;

      do {
        nextActive = getRndInt(0,2)
      } while (nextActive === this.state.current);

      this.setState({
        current: nextActive,
        pace: this.state.pace * 0.95,
        rounds: this.state.rounds + 1,
      });
      console.log('rounds', this.state.rounds);
      console.log("active circle:", this.state.current);
      this.timer = setTimeout(this.nextCircle,this.state.pace);
    }

    startHandler = () => {
      this.nextCircle();
      this.setState({
          gameOn: true
      });
    };

      stopHandler = () => {
        clearTimeout(this.timer);
        this.setState({
          showGameOver: true, gameOn: false
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
      <div>
        <h1>Speedgame</h1>
        <p>Your score: {this.state.score}</p>
        <div className="circles">
          {circles.map((_,i)=> 
            (
              <Circle 
                  key={i} 
                  id={i} 
                  click={()=> this.clickHandler(i)} 
                  active={this.state.current === i}
                  disabled={this.state.gameOn}
              />
            )
            
          )}
        </div>

        <div>
          <Button click={this.startHandler}>START</Button>
          <Button click={this.stopHandler}>END</Button>
        </div>
          {this.state.showGameOver && (
          <Gameover click={this.closeHandler} score={this.state.score}
          
          
          />
          )}
      </div>
    );
  }


}

export default App;
