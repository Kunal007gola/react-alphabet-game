import React from 'react';
import classNames from 'classnames';

import alphabets from './alphabets.json';
import Field from './Field';

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alphabets: alphabets,
      isSound: true,
      isRandom: false,
      currentPosition: 0,
      currentTick: 0
    };

    this.onPrevBtnClick = this.onPrevBtnClick.bind(this);
    this.onPlaySoundAgain = this.onPlaySoundAgain.bind(this);
    this.onNextBtnClick = this.onNextBtnClick.bind(this);
    this.randomSwitch = this.randomSwitch.bind(this);
    this.soundSwitch = this.soundSwitch.bind(this);
    this.onWordClick = this.onWordClick.bind(this);
    this.onLetterClick = this.onLetterClick.bind(this);
  }

  componentDidMount(){
    let letterSound = document.querySelector('audio[data-key="letter"]');
    try{
      letterSound.currentTime = 0;
      letterSound.play();
    } catch (except){
      console.log(except);
    }
  }

  componentDidUpdate(){
    console.log("component updated");
    if (!this.state.isSound) return;
    this.playSound();
  }

  onPlaySoundAgain() {

    let letterSound = document.querySelector(`audio[data-key="letter"]`);
    let wordSound = document.querySelector(`audio[data-key="word"]`);

    if(this.state.currentTick === 0) {
        letterSound.currentTime = 0;
        letterSound.play();
      } else {
        wordSound.currentTime = 0;
        wordSound.play();
      }
  }

  playSound(){
    let letterSound = document.querySelector(`audio[data-key="letter"]`);
    let wordSound = document.querySelector(`audio[data-key="word"]`);

    if(!this.state.isSound) return;

    if(this.state.currentTick === 0) {
      letterSound.currentTime = 0;
      letterSound.play();
    } else {
      wordSound.currentTime = 0;
      wordSound.play();
    }
    
  }

  generateRandomNumber(min, max, current){
    let number;
    do {
      number = Math.floor(Math.random() * (max-min+1)) + min;
    }while(current === number)
    return number;
  }

  onPrevBtnClick(event){
    let newPosition = this.state.currentPosition === 0 ? 25 : this.state.currentPosition - 1;
    if (this.state.currentTick !== 0){
      this.setState({currentTick: 0});
    } else {
      this.setState({
        currentPosition: newPosition,
        currentTick: 0
      });
    }
  }

  onNextBtnClick(event){
    if (this.state.currentTick < 2){
      this.setState({
        currentTick: this.state.currentTick + 1
      });
      return;
    }
    if (this.state.isRandom){
      let newPosition = this.generateRandomNumber(0,25);
      this.setState({
        currentTick: 0,
        currentPosition: newPosition
      })
    } else{
      // iterate normally
      let newPosition = this.state.currentPosition === 25 && this.state.currentTick === 2 ? 0 : this.state.currentPosition + 1;
      this.setState({
        currentTick: 0,
        currentPosition: newPosition
      });
    }
  }

  randomSwitch(check){
    this.setState({isRandom: check});
  }

  soundSwitch(check){
    this.setState({isSound: check});
  }

  onWordClick(){
    if (!this.state.isSound) return;

    let wordSound = document.querySelector(`audio[data-key="word"]`); 
    wordSound.currentTime = 0;
    wordSound.play();
  }

  onLetterClick(){
    if (!this.state.isSound) return;

    let letterSound = document.querySelector(`audio[data-key="letter"]`);
    letterSound.currentTime = 0;
    letterSound.play();
  }

  render(){
    console.log(this.state.alphabets)
    let currentPos = this.state.currentPosition;
    let showImage = this.state.currentTick !== 0 ? true : false;
    let showWord = this.state.currentTick === 2 ? true : false;
    return(
      <div className="game">
        <div className="game-content">
          <div className="slider-buttons">
            <SlideButton text="Random Letters"
                          onChange={this.randomSwitch}
                          isChecked={this.state.isRandom} />
            <SlideButton text="Sound"
                          onChange={this.soundSwitch}
                          isChecked={this.state.isSound} />
          </div>
          <div>
            <Field letter={this.state.alphabets[currentPos].letter}
              field="1"
              letterSound={this.state.alphabets[currentPos].letterSound}
              onClick={this.onLetterClick} />
          </div>
          <div className="buttons">
            <Buttons class="prev" name="Previous" onClick={this.onPrevBtnClick}/>
            <Buttons class="sound" name="Play Sound Again" onClick={this.onPlaySoundAgain}/>
            <Buttons class="next" name="Next" onClick={this.onNextBtnClick}/>
          </div>
          <div>
            <Field field="2"
              showWord={showWord}
              word={this.state.alphabets[currentPos].word}
              image={this.state.alphabets[currentPos].image}
              wordSound={this.state.alphabets[currentPos].wordSound}
              showImage={showImage}
              onClick={this.onWordClick} />
          </div>
        </div>
      </div>
    );
  }
}

// commenting for coding

class SlideButton extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event){
    this.props.onChange(event.target.checked);
  }

  render(){
    return(
      <span className="">
        <span className="random-label">{this.props.text} </span>
        <label className="switch">
          <input type="checkbox"
            onChange={this.handleOnChange}
            defaultValue = "false"
            checked={this.props.isChecked} />
          <div className="slider round"></div>
        </label>
      </span>
    );
  }
}

// commenting for coding

class Buttons extends React.Component{
  constructor(props){
    super(props);
    this.state = {};

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event){
    this.props.onClick(event);
  }

  render(){
    return(
      <a type="button" onClick={this.handleOnClick}
        className={classNames('button', this.props.class)}>
        {this.props.name}
      </a>
    );
  }
}

export default Game;