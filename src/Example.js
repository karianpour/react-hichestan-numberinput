import React, { Component } from 'react';
import { NumberInput, DecimalInput, CardNumberInput, NUMBER_FORMAT_FARSI } from "./lib";
import {NUMBER_FORMAT_LATIN} from './lib';
import './Example.css';

class Example extends Component {
  state = {
    Number1: '123',
    Number2: '',
    Number3: 1200.246,
    color: false,
    bgColor: false,
    disabled: false,
    readOnly: false,
    Tel1: '0912',
    value1: '',
  };

  componentDidMount(){
    // this.interval = setInterval(this.toggleBgColor, 6000);
    // this.interval = setInterval(this.toggleColor, 3000);
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

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    })
  };

  toggleReadOnly = () => {
    this.setState({
      readOnly: !this.state.readOnly,
    })
  };

  render(){
    const className = this.state.color ? "red" : "";
    const style = this.state.bgColor ? {backgroundColor: 'aqua'} : {};
    const {disabled, readOnly} = this.state;


    return (
      <React.Fragment>
        <form autoComplete="on">
        <div>
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
            <NumberInput name="Number1" disabled={disabled} readOnly={readOnly} className={className} style={style} value={this.state.Number1} onChange={this.handleChange} placeholder="type/paste a number" />
          </label>
        </div>
        <br/>
        <div>
          <label>
            نمونه لاتین
            <br/>
            <NumberInput name="Number2" disabled={disabled} readOnly={readOnly} className={className} style={style} value={this.state.Number2} numberFormat={NUMBER_FORMAT_LATIN} onChange={this.handleChange} placeholder="type/paste a number" />
          </label>
        </div>
        <label>خروجی
          <br/>
          <input type="text" name="Number2_value" style={{width: 250}} value={this.state.Number2} onChange={this.handleValueChange} placeholder="این فیلد خروجی است" />
        </label>
        <br/>
        <br/>
        <br/>
        <div>
          <label>
            عدد اعشاری
            <br/>
            <DecimalInput name="Number3" disabled={disabled} readOnly={readOnly} className={className} style={style} value={this.state.Number3} asString={false} maxDigits={5} maxDecimal={2} numberFormat={NUMBER_FORMAT_FARSI} onChange={this.handleChange} placeholder="type/paste a number" />
          </label>
        </div>
        <label>خروجی
          <br/>
          <input type="text" name="Number3_value" style={{width: 250}} value={this.state.Number3} onChange={this.handleValueChange} placeholder="این فیلد خروجی است" />
        </label>
        <br/>
        <br/>
        <div>
          <label>
            نمونه تلفن فارسی
            <br/>
            <NumberInput type="tel" name="Tel1" disabled={disabled} readOnly={readOnly} className={className} style={style} value={this.state.Tel1} onChange={this.handleChange} maxLength={12} placeholder="type/paste a number" />
          </label>
        </div>
        <br/>
        <label>ورودی شماره کارت
            <br/>
            <CardNumberInput
              value={this.state.value1}
              disabled={disabled}
              readOnly={readOnly}
              name={'value1'}
              className={className} 
              style={style} 
              onChange={this.handleChange}
              placeholder="شماره کارت" />
            <br/>
            خروجی
            <br/>
            <input type="text" name="value1" dir={'ltr'} value={this.state.value1} onChange={this.handleChange}/>
          </label>
          <br/>
        <br/>
        <button type="button" onClick={this.toggleColor}>toggle className</button>
        <button type="button" onClick={this.toggleBgColor}>toggle style</button>
        <button type="button" onClick={this.toggleDisabled}>{disabled?'enable':'disable'}</button>
        <button type="button" onClick={this.toggleReadOnly}>{readOnly?'writable':'read only'}</button>
        <input type="submit"/>
        </form>
      </React.Fragment>
    );
  }
}

export default Example;
