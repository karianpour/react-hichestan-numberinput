import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqualObjects from 'shallow-equal/objects';

import { mapToFarsi, mapToLatin, stripAnyThingButDigits, NUMBER_FORMAT_FARSI, NUMBER_FORMAT_LATIN} from './util';

class NumberInput extends Component {

  static propTypes = {
    /**
     * The ref to pass on the input, if empty it will be created internally
     */
    inputRef: PropTypes.any,
    getInputRef: PropTypes.any,
    /**
     * The name that will be set while firing the onChange event in the target object
     */
    name: PropTypes.string,
    /**
     * Callback function that is fired when the cart number value changes.
     */
    onChange: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Disables the number input.
     */
    disabled: PropTypes.bool,
    /**
     * makes the number input readonly.
     */
    readOnly: PropTypes.bool,
    /**
     * accepted number digit count.
     */
    maxLength: PropTypes.number,
    /**
     * Callback function that is fired when a click event occurs on the input.
     */
    onClick: PropTypes.func,
    /**
     * Callback function that is fired when the input gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Sets the value for the number input.
     */
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    let ref = props.inputRef || props.getInputRef;
    if(ref && typeof ref === 'function'){
      ref = ref();
    }
    this.inputRef = ref ? ref : React.createRef();
    // this.rr = React.createRef();

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
    if(this.props.disabled || this.props.readOnly) {
      event.preventDefault();
    }else if(event.keyCode===8) { //backspace
      event.preventDefault();
      this.updateState(this.deleteValue(event.target, -1));
    }else if(event.keyCode===46){ //delete
      event.preventDefault();
      this.updateState(this.deleteValue(event.target, 1));
    }else if(event.keyCode>=48 && event.keyCode<=57){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateValue(event.target, (event.keyCode - 48).toString(), this.props.numberFormat));
    }else if(event.keyCode>=96 && event.keyCode<=105){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateValue(event.target, (event.keyCode - 96).toString(), this.props.numberFormat));
    }else if(event.key>='۰' && event.key<='۹'){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateValue(event.target, event.key, this.props.numberFormat));
    }else if(event.keyCode>=35 && event.keyCode<=40){ //arrows
    }else if(event.keyCode===9){ //tab
    }else if(event.keyCode===13){ //return
      this.hideKeyboard();
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===67 || event.keyCode===86)){ //copy/paste
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===82)){ //refresh key
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===82)){ //refresh key
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===73)){ //inspector
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===65)){ //select all
    }else if(event.keyCode>=112 && event.keyCode<=123){ // All other F keys
    }else if(event.keyCode===229){ //android bug workaround
    }else{
      // console.log('other');
      // console.log('keyCode: ', event.keyCode, 'key: ', event.key, 'ctrlKey: ', event.ctrlKey);
      // this.rr.current.innerText = `keyCode: ${event.keyCode} key:  ${event.key} ctrlKey: ${event.ctrlKey}`;
      event.preventDefault();
    }
  };

  hideKeyboard = () => {
    this.inputRef.current.blur();
  }

  handlePaste = (event) => {
    event.preventDefault();
    if(this.props.disabled || this.props.readOnly) return;

    const enteredValue = stripAnyThingButDigits((event.clipboardData || window.clipboardData).getData('text'));

    this.updateState(this.updateValue(event.target, enteredValue, this.props.numberFormat));
  };

  handleInput = (event) => {
    if(this.props.disabled || this.props.readOnly) return;
    if(this.values.valueToShow===event.target.value) return;

    const enteredValue = stripAnyThingButDigits(event.target.value);

    this.updateState(this.recheckValue(event.target, enteredValue, this.props.numberFormat), true);
  };

  mapValue = (value, numberFormat) => {
    if(numberFormat===NUMBER_FORMAT_FARSI){
      return mapToFarsi(value);
    }else if(numberFormat===NUMBER_FORMAT_LATIN){
      return mapToLatin(value);
    }
    return mapToFarsi(value);
  };


  updateState = (newState, forceFireChange, noFireOnChange) => {
    if(!newState) return;

    this.values = newState;
    let fireOnChangeInTheEnd = false;
    if(this.inputRef.current.value !== this.values.valueToShow){
      fireOnChangeInTheEnd = true;
      this.inputRef.current.value = this.values.valueToShow;
    }
    if(this.inputRef.current===document.activeElement){
      // console.log('has focus :D');
      this.inputRef.current.setSelectionRange(this.values.selectionStart, this.values.selectionEnd);
    }else{
      // console.log('has not focus :(');
    }
    if(fireOnChangeInTheEnd || forceFireChange){
      if(!noFireOnChange){
        this.fireOnChange();
      }
    }
  };

  updateValue = (element, enteredValue, numberFormat) => {
    const enteredValueMapped = this.mapValue(enteredValue, numberFormat);
    let valueToShow = element.value;
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;

    if(this.props.maxLength && valueToShow.length + enteredValue.length > this.props.maxLength){
      return;
    }

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
      this.updateState(this.readValuesFromProps(nextProps), false, true);
    }
    if(!shallowEqualObjects(nextProps.style, this.props.style)){
      return true;
    }
    if(nextProps.className !== this.props.className){
      this.inputRef.current.className = nextProps.className;
    }
    if(nextProps.disabled !== this.props.disabled){
      this.inputRef.current.disabled = nextProps.disabled;
    }
    if(nextProps.readOnly !== this.props.readOnly){
      this.inputRef.current.readOnly = nextProps.readOnly;
    }
    return false;
  }

  render() {
    const {value, onChange, onInput, onPast, onKeyDown, pattern, inputMode, type, ref, inputRef, getInputRef, numberFormat, defaultValue, ...rest} = this.props;
    const {valueToShow} = this.values;

    // const localInputMode = this.props.type === 'tel' ? 'tel' : 'numeric'; // as we use type=tel, then we do not need it any more
    // const localPattern = '[0-9]*'; // it has problem with the form checking, as we insert persian digit, it is not acceptable for the browser

    return (
      <input
        ref={this.inputRef}
        type={"tel"} // I tried to use text and using inputMode, but it does not work on Safari
        // inputMode={localInputMode}
        // xInputMode={localnputMode} // in firefox OS it is x-inputmode, I do not know how to handle it
        dir={"ltr"}
        // pattern={localPattern}
        defaultValue={valueToShow}
        onKeyDown={this.handleKeyDown}
        onPaste={this.handlePaste}
        onInput={this.handleInput}
        {...rest}
      />
      );
    //<p ref={this.rr} type={"text"}>empty</p></div>

  }
}
export default NumberInput;
