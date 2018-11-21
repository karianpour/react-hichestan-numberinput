import React, { Component } from 'react';
import { NumberInput } from "./lib";
import {NUMBER_FORMAT_LATIN} from './lib/NumberInput';
import './Example.css';

class Example extends Component {
  state = {
    Number1: '',
    Number2: '123',
    color: false,
    bgColor: false,
    Tel1: '0912',
  };

  componentDidMount(){
    this.interval = setInterval(this.toggleBgColor, 6000);
    this.interval = setInterval(this.toggleColor, 3000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  handleChange = (event) => {
    const newState = {};
    const t = event.target;

    newState[t.name] = t.value;
    this.setState(newState, ()=>{
      console.log('state', this.state)
    });
  };

  handleValueChange = (event) => {
    const newState = {};
    const t = event.target;

    newState[t.name.substr(0, 7)] = t.value;
    this.setState(newState, ()=>{
      console.log('state', this.state)
    });
  };

  toggleColor = () => {
    this.setState({
      color: !this.state.color,
    })
  };

  toggleBgColor = () => {
    this.setState({
      bgColor: !this.state.bgColor,
    })
  };

  render(){
    const className = this.state.color ? "red" : "";
    const style = this.state.bgColor ? {backgroundColor: 'aqua'} : {};


    return (
      <React.Fragment>
        <div>
          <br/>ورژن ۱ ساخت ۴
          <br/>
          <br/>
          <label>خروجی عدد لاتین
            <br/>
            <input type="text" name="Number1_value" style={{width: 250}} value={this.state.Number1} onChange={this.handleValueChange}  placeholder="از اینجا کلید تب را چند بار بزنید" />
          </label>
          <br/>
          <br/>
          <label>
            نمونه فارسی
            <br/>
            <NumberInput name="Number1" className={className} style={style} value={this.state.Number1} onChange={this.handleChange} placeholder="type/paste a number" />
          </label>
        </div>
        <br/>
        <div>
          <label>
            نمونه لاتین
            <br/>
            <NumberInput name="Number2" className={className} style={style} value={this.state.Number2} numberFormat={NUMBER_FORMAT_LATIN} onChange={this.handleChange} placeholder="type/paste a number" />
          </label>
        </div>
        <br/>
        <br/>
        <label>خروجی
          <br/>
          <input type="text" name="Number2_value" style={{width: 250}} value={this.state.Number2} onChange={this.handleValueChange} placeholder="این فیلد خروجی است" />
        </label>
        <br/>
        <div>
          <label>
            نمونه تلفن فارسی
            <br/>
            <NumberInput type="tel" name="Tel1" className={className} style={style} value={this.state.Tel1} onChange={this.handleChange} placeholder="type/paste a number" />
          </label>
        </div>
        <br/>
        <br/>
        <button onClick={this.toggleColor}>toggle className</button>
        <button onClick={this.toggleBgColor}>toggle style</button>
      </React.Fragment>
    );
  }
}

export default Example;
