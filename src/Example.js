import React, { Component } from 'react';
import { NumberInput } from "./lib";
import {NUMBER_FORMAT_LATIN} from './lib/NumberInput';

class Example extends Component {
  state = {
    Number1: '',
    Number2: '123',
  };

  handleChange = (event) => {
    const newState = {};
    const t = event.target;

    newState[t.name] = t.value;
    this.setState(newState, ()=>{
      console.log('after', this.state)
    });
  };

  handleValueChange = (event) => {
    const newState = {};
    const t = event.target;

    newState[t.name.substr(0, 7)] = t.value;
    this.setState(newState, ()=>{
      console.log('after', this.state)
    });
  };

  render(){
    return (
      <React.Fragment>
        <div>
          <br/>ورژن ۱ ساخت ۲
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
            <NumberInput name="Number1" value={this.state.Number1} onChange={this.handleChange} placeholder="type/paste a number" />
          </label>
        </div>
        <br/>
        <div>
          <label>
            نمونه لاتین
            <br/>
            <NumberInput name="Number2" value={this.state.Number2} numberFormat={NUMBER_FORMAT_LATIN} onChange={this.handleChange} placeholder="type/paste a number" />
          </label>
        </div>
        <br/>
        <br/>
        <label>خروجی
          <br/>
          <input type="text" name="Number2_value" style={{width: 250}} value={this.state.Number2} onChange={this.handleValueChange} placeholder="این فیلد خروجی است" />
        </label>
      </React.Fragment>
    );
  }
}

export default Example;
