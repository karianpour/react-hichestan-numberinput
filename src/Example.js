import React, { Component } from 'react';
import { NumberInput } from "./lib";
import {NUMBER_FORMAT_LATIN} from './lib/NumberInput';

class Example extends Component {
  state = {
    value: '',
    Number1: undefined,
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

  render(){
    return (
      <React.Fragment>
        <div>
          <br/>
          <br/>
          <br/>
          <label>خروجی عدد لاتین
            <br/>
            <input type="text" style={{width: 250}} value={this.state.Number1} placeholder="از اینجا کلید تب را چند بار بزنید" />
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
          <input type="text" style={{width: 250}} value={this.state.Number2} placeholder="این فیلد خروجی است" />
        </label>
      </React.Fragment>
    );
  }
}

export default Example;
