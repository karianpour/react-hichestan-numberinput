import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqualObjects from 'shallow-equal/objects';

import { mapToFarsi, mapToLatin, NUMBER_FORMAT_FARSI, NUMBER_FORMAT_LATIN} from './util';

class DecimalInput extends Component {

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
     * Disables the decimal input.
     */
    disabled: PropTypes.bool,
    /**
     * makes the decimal input readonly.
     */
    readOnly: PropTypes.bool,
    /**
     * Callback function that is fired when a click event occurs on the input.
     */
    onClick: PropTypes.func,
    /**
     * Callback function that is fired when the input gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Sets the value for the decimal input.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
     * Sets the thousand separator
     */
    thousandSeparator: PropTypes.string,
    /**
     * Sets the decimal separator
     */
    decimalSeparator: PropTypes.string,
    /**
     * makes the value string, it is useful for big decimals.
     */
    asString: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    let ref = props.inputRef || props.getInputRef;
    if(ref && typeof ref === 'function'){
      ref = ref();
    }
    this.inputRef = ref ? ref : React.createRef();
    // this.rr = React.createRef();

    this.thousandSeparator = props.thousandSeparator || this.defaultThousandSeparator();
    this.decimalSeparator = props.decimalSeparator || this.defaultDecimalSeparator();
    this.thousandSeparatorRegex = new RegExp(`[${this.thousandSeparator}]`, 'g');
    this.decimalSeparatorRegex = new RegExp(`[.${this.decimalSeparator}]`, 'g');
    this.numberRegex = new RegExp(`[^-1234567890۱۲۳۴۵۶۷۸۹۰.${this.decimalSeparator}]`, 'gi');
    this.values = this.readValuesFromProps(props);
  }

  defaultThousandSeparator = () => {
    return ',';
  };

  defaultDecimalSeparator = () => {
    return '.';
  };

  readValuesFromProps = (props) => {
    if(props.value){
      const value = props.value ? props.asString ? props.value : Number(props.value) : undefined;
      return this.updateValue('', 0, 0, value, props.numberFormat, props.asString);
    }

    return {
      value: undefined,
      valueToShow: '',
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
      this.updateState(this.deleteValue(event.target, -1, this.props.asString));
    }else if(event.keyCode===46){ //delete
      event.preventDefault();
      this.updateState(this.deleteValue(event.target, 1, this.props.asString));
    }else if(event.keyCode>=48 && event.keyCode<=57){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateElementValue(event.target, (event.keyCode - 48).toString(), this.props.numberFormat, this.props.asString));
    }else if(event.keyCode>=96 && event.keyCode<=105){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateElementValue(event.target, (event.keyCode - 96).toString(), this.props.numberFormat, this.props.asString));
    }else if(event.key>='۰' && event.key<='۹'){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateElementValue(event.target, event.key, this.props.numberFormat, this.props.asString));
    }else if(event.key==='.' || event.keyCode===190){ //point
      event.preventDefault();
      this.updateState(this.updateElementValue(event.target, '.', this.props.numberFormat, this.props.asString));
    }else if(event.key==='-' || event.keyCode===189){ // -
      event.preventDefault();
      this.updateState(this.negate());
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

    let enteredValue = this.stripAnyThingButNumber((event.clipboardData || window.clipboardData).getData('text'));
    if(this.values.valueToShow!==''){
      enteredValue = enteredValue.replace(/[-]/g, '');
    }

    this.updateState(this.updateElementValue(event.target, enteredValue, this.props.numberFormat, this.props.asString));
  };

  handleInput = (event) => {
    if(this.values.valueToShow===event.target.value) return;
    if(this.props.disabled || this.props.readOnly) return;

    const enteredValue = this.stripAnyThingButNumber(event.target.value);

    const firstHyphenIndex = enteredValue.indexOf('-');
    const secondHyphenIndex = enteredValue.indexOf('-', firstHyphenIndex + 1);
    if(secondHyphenIndex >= 0 || firstHyphenIndex > 0){
      this.updateState(this.negate());
    }else{
      const selectionStart = event.target.selectionStart;
      const selectionEnd = event.target.selectionEnd;
      const newState = this.updateValue('', selectionStart, selectionEnd, enteredValue, this.props.numberFormat, this.props.asString);
      this.updateState(newState, true);
    }
  };

  mapValue = (value, numberFormat) => {
    if(numberFormat===NUMBER_FORMAT_FARSI){
      return mapToFarsi(value);
    }else if(numberFormat===NUMBER_FORMAT_LATIN){
      return mapToLatin(value);
    }
    return mapToFarsi(value);
  };

  mapDecimalSeparator = (value) => {
    return value.replace(this.decimalSeparatorRegex, this.decimalSeparator);
  };


  updateState = (newState, forceFireChange) => {
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
      this.fireOnChange();
    }
  };

  negate = () => {
    let {value,
    valueToShow,
    valueIsValid,
    selectionStart,
    selectionEnd} = this.values;

    if(value > 0) {
      value = -value;
      valueToShow = '-'+valueToShow;
      selectionStart++;
      selectionEnd++;
    }else if(value < 0) {
      value = -value;
      valueToShow = valueToShow.substring(1);
      selectionStart--;
      selectionEnd--;
    }else{
      return;
    }

    return {
      value,
      valueToShow,
      valueIsValid,
      selectionStart,
      selectionEnd,
    };
  };

  updateElementValue = (element, enteredValue, numberFormat, asString) => {
    let currentValue = element.value;
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;
    return this.updateValue(currentValue, selectionStart, selectionEnd, enteredValue, numberFormat, asString);
  }

  updateValue = (currentValue, selectionStart, selectionEnd, enteredValue, numberFormat, asString) => {
    const enteredValueMapped = this.mapDecimalSeparator(this.mapValue(enteredValue, numberFormat));
    let valueToShow = currentValue;

    let valueBeforeCursor = valueToShow.substring(0, selectionStart);
    let valueAfterCursor = valueToShow.substring(selectionEnd);

    selectionStart -= this.countThousandSeparator(valueBeforeCursor);
    valueBeforeCursor = this.stripThousandSeparator(valueBeforeCursor);
    valueAfterCursor = this.stripThousandSeparator(valueAfterCursor);

    valueToShow = valueBeforeCursor + enteredValueMapped + valueAfterCursor;
    selectionStart += enteredValueMapped.length;

    const separated = this.addThousandSeparator(valueToShow, selectionStart);
    valueToShow = separated.valueToShowWithSeparator;
    selectionStart = separated.selectionStart;
    selectionEnd = selectionStart;

    let value = this.stripThousandSeparator(mapToLatin(valueToShow));
    let valueIsValid;
    if(asString) {
      const checkValue = Number(value);
      valueIsValid = (typeof checkValue === 'number' || checkValue === undefined || checkValue === null);
    }else{
      value = Number(value);
      valueIsValid = (typeof value === 'number' || value === undefined || value === null);
    }

    return {
      value,
      valueToShow,
      valueIsValid,
      selectionStart,
      selectionEnd,
    };
  };

  deleteValue = (element, qty, asString) => {
    let valueToShow = element.value;
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;

    // console.log({selectionStart, selectionEnd})

    if(selectionStart===selectionEnd){
      if(qty < 0) {
        if(selectionStart===0) return;
        let valueBeforeCursor = valueToShow.substring(0, selectionStart + qty);
        let valueAfterCursor = valueToShow.substring(selectionEnd);
    
        selectionStart -= this.countThousandSeparator(valueBeforeCursor);
        valueBeforeCursor = this.stripThousandSeparator(valueBeforeCursor);
        valueAfterCursor = this.stripThousandSeparator(valueAfterCursor);
    
        valueToShow = valueBeforeCursor + valueAfterCursor;
        selectionStart += qty;
      }else{
        if(selectionEnd===valueToShow.length) return;
        let valueBeforeCursor = valueToShow.substring(0, selectionStart);
        let valueAfterCursor = valueToShow.substring(selectionEnd+qty);
    
        selectionStart -= this.countThousandSeparator(valueBeforeCursor);
        valueBeforeCursor = this.stripThousandSeparator(valueBeforeCursor);
        valueAfterCursor = this.stripThousandSeparator(valueAfterCursor);
    
        valueToShow = valueBeforeCursor + valueAfterCursor;
      }
    }else{
      let valueBeforeCursor = valueToShow.substring(0, selectionStart);
      let valueAfterCursor = valueToShow.substring(selectionEnd);
  
      selectionStart -= this.countThousandSeparator(valueBeforeCursor);
      valueBeforeCursor = this.stripThousandSeparator(valueBeforeCursor);
      valueAfterCursor = this.stripThousandSeparator(valueAfterCursor);
  
      valueToShow = valueBeforeCursor + valueAfterCursor;
    }

    const separated = this.addThousandSeparator(valueToShow, selectionStart);
    valueToShow = separated.valueToShowWithSeparator;
    selectionStart = separated.selectionStart;
    selectionEnd = selectionStart;

    let value = this.stripThousandSeparator(mapToLatin(valueToShow));
    let valueIsValid;
    if(asString) {
      const checkValue = Number(value);
      valueIsValid = (typeof checkValue === 'number' || checkValue === undefined || checkValue === null);
    }else{
      value = Number(value);
      valueIsValid = (typeof value === 'number' || value === undefined || value === null);
    }


    return {
      value,
      valueToShow,
      valueIsValid,
      selectionStart,
      selectionEnd,
    };
  };


  addThousandSeparator = (valueToShow, selectionStart) => {
    let valueToShowWithSeparator = '';
    let alreadFoundDecimalSeparator = false;
    let alreadyPassedDecimalSeparator = valueToShow.indexOf(this.decimalSeparator) === -1;
    let groupCount = 0;
    for (let i = valueToShow.length-1; i>=0; i--){
      const c = valueToShow.charAt(i);
      if(c===this.decimalSeparator){
        if(!alreadFoundDecimalSeparator){
          alreadFoundDecimalSeparator = true;
          valueToShowWithSeparator = c + valueToShowWithSeparator;
          alreadyPassedDecimalSeparator = true;
          groupCount = 0;
        }else{
          if(i <= selectionStart){
            selectionStart--;
          }
        }
      }else{
        if(alreadyPassedDecimalSeparator && groupCount===3 && c!=='-'){
          valueToShowWithSeparator = this.thousandSeparator + valueToShowWithSeparator;
          groupCount = 0;
          if(i<selectionStart-1){
            selectionStart++;
          }
        }
        valueToShowWithSeparator = c + valueToShowWithSeparator;
        groupCount++;
      }
    }
    return {valueToShowWithSeparator, selectionStart};
  };

  countThousandSeparator = (value) => {
    return (value.match(this.thousandSeparatorRegex) || []).length;
  };

  stripThousandSeparator = (value) => {
    return value.replace(this.thousandSeparatorRegex, '');
  };

  stripAnyThingButNumber = (str) => {
    if(!str) return str;
    return str.toString().replace(this.numberRegex, '');
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
    const {value, onChange, onInput, onPast, onKeyDown, pattern, inputMode, type, ref, inputRef, getInputRef, numberFormat, defaultValue, asString, ...rest} = this.props;
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
export default DecimalInput;
