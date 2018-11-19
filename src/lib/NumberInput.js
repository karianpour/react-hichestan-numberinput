import React, { Component } from 'react';

export const NUMBER_FORMAT_FARSI = 'FARSI';
export const NUMBER_FORMAT_LATIN = 'LATIN';

class NumberInput extends Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.rr = 0;

    this.values = this.readValuesFromProps(props);
  }

  readValuesFromProps = (props) => {
    const value = props.value || '';
    const valueToShow = this.mapValue(value, props.numberFormat);

    return {
      value,
      valueToShow,
      selectionStart: undefined,
      selectionEnd: undefined,
    };
  };

  handleKeyDown = (event) => {
    // console.log('keyCode: ', event.keyCode, 'key: ', event.key);
    if(event.keyCode===8) { //backspace
      event.preventDefault();
      this.updateState(this.deleteValue(event.target, -1));
    }else if(event.keyCode===46){ //delete
      event.preventDefault();
      this.updateState(this.deleteValue(event.target, 1));
    }else if(event.keyCode>=48 && event.keyCode<=57){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateValue(event.target, (event.keyCode - 48).toString(), this.props.numberFormat));
    }else if(event.keyCode>=36 && event.keyCode<=40){ //arrows
    }else if(event.keyCode===9){ //tab
    }else if(event.ctrlKey && (event.keyCode===67 || event.keyCode===86)){ //copy/paste
    }else if(event.keyCode===229){ //android bug workaround
    }else{
      // console.log('other');
      // console.log('keyCode: ', event.keyCode, 'key: ', event.key, 'ctrlKey: ', event.ctrlKey);
      event.preventDefault();
    }
  };

  handlePaste = (event) => {
    event.preventDefault();

    const enteredValue = stripAnyThingButDigits((event.clipboardData || window.clipboardData).getData('text'));

    this.updateState(this.updateValue(event.target, enteredValue, this.props.numberFormat));
  };

  handleInput = (event) => {
    if(this.values.valueToShow===event.target.value) return;

    const enteredValue = stripAnyThingButDigits(event.target.value);

    this.updateState(this.recheckValue(event.target, enteredValue, this.props.numberFormat));
  };

  mapValue = (value, numberFormat) => {
    if(numberFormat===NUMBER_FORMAT_FARSI){
      return mapToFarsi(value);
    }else if(numberFormat===NUMBER_FORMAT_LATIN){
      return mapToLatin(value);
    }
    return mapToFarsi(value);
  };


  updateState = (newState) => {
    if(!newState) return;

    this.values = newState;
    this.inputRef.current.value = this.values.valueToShow;
    if(this.inputRef.current===document.activeElement){
      console.log('has focus :D');
      this.inputRef.current.setSelectionRange(this.values.selectionStart, this.values.selectionEnd);
    }else{
      console.log('has not focus :(');
    }
    this.fireOnChange();
  };

  updateValue = (element, enteredValue, numberFormat) => {
    const enteredValueMapped = this.mapValue(enteredValue, numberFormat);
    let valueToShow = element.value;
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;

    valueToShow = valueToShow.substring(0, selectionStart) + enteredValueMapped + valueToShow.substring(selectionEnd);

    selectionStart += enteredValueMapped.length;
    selectionEnd = selectionStart;

    const value = mapToLatin(valueToShow);

    return {
      value,
      valueToShow,
      selectionStart,
      selectionEnd,
    };
  };

  recheckValue = (element, enteredValue, numberFormat) => {
    let valueToShow = this.mapValue(enteredValue, numberFormat);
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;

    const value = mapToLatin(valueToShow);

    return {
      value,
      valueToShow,
      selectionStart,
      selectionEnd,
    };
  };

  deleteValue = (element, qty) => {
    let valueToShow = element.value;
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;

    // console.log({selectionStart, selectionEnd})

    if(selectionStart===selectionEnd){
      if(qty < 0) {
        if(selectionStart===0) return;
        valueToShow = valueToShow.substring(0, selectionStart + qty) + valueToShow.substring(selectionEnd);
        selectionStart += qty;
      }else{
        if(selectionEnd===valueToShow.length) return;
        valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd+qty);
      }
    }else{
      valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd);
    }

    selectionEnd = selectionStart;

    const value = mapToLatin(valueToShow);

    return {
      value,
      valueToShow,
      selectionStart,
      selectionEnd,
    };
  };

  fireOnChange = () => {
    if(this.props.onChange){
      this.props.onChange({target: {name: this.props.name, value: this.values.value}});
    }
  };

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.value !== this.values.value || nextProps.numberFormat !== this.props.numberFormat){
      this.updateState(this.readValuesFromProps(nextProps));
    }
    return false;
  }

  render() {

    this.rr += 1;
    // console.log('rendered')

    const {value, onChange, onInput, onPast, onKeyDown, pattern, inputMode, type, ref, numberFormat, ...rest} = this.props;
    const {valueToShow} = this.values;

    return (
      <input
        ref={this.inputRef}
        type={"text"}
        inputMode={"numeric"}
        pattern={"[0-9]*"}
        defaultValue={valueToShow}
        onKeyDown={this.handleKeyDown}
        onPaste={this.handlePaste}
        onInput={this.handleInput}
        {...rest}
      />
      );
  }
}
export default NumberInput;


export function mapToFarsi(str) {
  if(!str) return str;
  return str.toString().replace(/[1234567890]/gi, e => String.fromCharCode(e.charCodeAt(0) + 1728))
}

export function mapToLatin(str) {
  if(!str) return str;
  return str.toString().replace(/[۱۲۳۴۵۶۷۸۹۰]/gi, e => String.fromCharCode(e.charCodeAt(0) - 1728))
}

export function stripAnyThingButDigits(str) {
  if(!str) return str;
  return str.toString().replace(/[^1234567890۱۲۳۴۵۶۷۸۹۰]/gi, '');
}
