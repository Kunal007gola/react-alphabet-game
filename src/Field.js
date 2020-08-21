import React from 'react';

import classNames from 'classnames';

class Field extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }


  createCentreField(){
   return (<div className="" onClick={this.props.onClick}>
            {this.props.letter}
            <audio src={this.props.letterSound}
                   data-key="letter" />

            </div>
    ); 
  }

  createBottomLeftField(){
    return(
      <div className="left-field" onClick={this.props.onClick}>
        <div className={classNames('placeholder-span', {hide: this.props.showImage})}>Click Next to view Image</div>
        <img className={classNames('letter-image', {hide: !this.props.showImage})}
        alt={this.props.word}
        src={this.props.image} />
        <audio src={this.props.wordSound}
           data-key="word" />
      </div>
    );
  }

  createBottomRightField(){
    return(
      <div className="right-field" onClick={this.props.onClick}>
        <div className={classNames('placeholder-span', {hide: this.props.showWord})}>Click Next to view Spelling</div>
        <div className={classNames('word', {hide: !this.props.showWord})}>
          {this.props.word.toUpperCase()}
        </div>
      </div>
    );
  }

  render(){
    let Element = this.props.field === "1" ? this.createCentreField() : '';
    let leftElement = this.props.field === "2" ? this.createBottomLeftField() : '';
    let rightElement = this.props.field === "2" ? this.createBottomRightField() : '';

    return(
      <div className="fields">
        <div className="field-block">
          {Element}
          {leftElement}
          {rightElement}
        </div>
      </div>
    );
  }
}

export default Field;