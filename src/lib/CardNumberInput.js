import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqualObjects from 'shallow-equal/objects';
import { mapToFarsi, mapToLatin, hasStringACharToGoToNext, repeatStr, NUMBER_FORMAT_FARSI, NUMBER_FORMAT_LATIN} from './util';

const CARD_SEPERATOR =  '-';
const SEPERATORES_REGEX = new RegExp(`[ ${CARD_SEPERATOR}]`, 'g');
const MATCH_REGEX = new RegExp(`[0-9]{4}[${CARD_SEPERATOR}][0-9]{4}[${CARD_SEPERATOR}][0-9]{4}[${CARD_SEPERATOR}][0-9]{4}`);
const EMPTY_VALUE = `    ${CARD_SEPERATOR}    ${CARD_SEPERATOR}    ${CARD_SEPERATOR}    `;


class CardNumberInput extends Component {

  static propTypes = {
    /**
     * The ref to pass on the input, if empty it will be created internally
     */
    inputRef: PropTypes.any,
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
     * Disables the card number.
     */
    disabled: PropTypes.bool,
    /**
     * makes the card number readonly.
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
     * Sets the value for the card number input.
     */
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.emptyValue = this.emptyValue.bind(this);

    let ref;
    if(props.inputRef && typeof props.inputRef === 'function'){
      ref = props.inputRef();
    }else if(props.inputRef && typeof props.inputRef === 'object'){
      ref = props.inputRef;
    }

    this.inputRef = ref ? ref : React.createRef();
    // this.rr = React.createRef();

    this.values = this.readValues(props.value);
    this.previousValue = this.values.value;
  }


  /**
   * @param {string} value
   */
  readCardNumberFromValue = (value) => {
    if(!value) return;

    const latinNumberValue = mapToLatin(value);
    const regEx = /[0-9]{4}[^0-9]*[0-9]{4}[^0-9]*[0-9]{4}[^0-9]*[0-9]{4}/;
    const match = latinNumberValue.match(regEx);
    if(match){
      const valueWithNoSeperator = match[0].replace(/[^0-9]*/g, '');
      return `${valueWithNoSeperator.substring(0, 4)}${CARD_SEPERATOR}${valueWithNoSeperator.substring(4, 8)}${CARD_SEPERATOR}${valueWithNoSeperator.substring(8, 12)}${CARD_SEPERATOR}${valueWithNoSeperator.substring(12, 16)}`;
    }

    const regEx4Digits = /[0-9]{4}/;
    const match4Digit = latinNumberValue.match(regEx4Digits);
    if(match4Digit){
      this.updateState(this.updateValue(this.inputRef.current, match4Digit[0], this.props.numberFormat));
      return;
    }

  }
    
  readValues = (value) => {
    const valueToShow = this.mapValue(value, this.props.numberFormat);
    const valueIsValid = this.isValueValidCardNumber(value);

    return {
      value,
      valueToShow,
      valueIsValid,
      selectionStart: undefined,
      selectionEnd: undefined,
    };
  };

  emptyValue() {
    this.updateState(this.resetValues());
  };

  handleFocus = (event) => {
    if(this.isValueEmpty(this.values.value)){
      this.jumpTo(1);
    }
    if(this.props.onFocus){
      this.props.onFocus(event);
    }
  };

  handleBlur = (event) => {
    if(this.props.onBlur){
      this.props.onBlur(event);
    }
  };

  jumpToNext = () => {
    const selectionStart = this.inputRef.current.selectionStart;
    const whereTheCaretIs = this.whereIsCaret(selectionStart);

    if(whereTheCaretIs < 4){
      this.jumpTo(whereTheCaretIs + 1);
      return true;
    }
    return false;
  };

  jumpToPrevious = () => {
    const selectionStart = this.inputRef.current.selectionStart;
    const whereTheCaretIs = this.whereIsCaret(selectionStart);

    if(whereTheCaretIs > 1){
      this.jumpTo(whereTheCaretIs - 1);
      return true;
    }
    return false;
  };

  isValueEmpty = (value) => {
    if(value.replace(SEPERATORES_REGEX, '')==='') return true;
    return false;
  }; 

  /**
   * @param {number} section
   *  */
  jumpTo = (section) => {
    const caretPosition = (section - 1) * 5;
    this.values.selectionStart = caretPosition;
    this.values.selectionEnd = caretPosition;
    this.inputRef.current.setSelectionRange(this.values.selectionStart, this.values.selectionEnd);
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
    }else if(event.keyCode>=96 && event.keyCode<=105){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateValue(event.target, (event.keyCode - 96).toString(), this.props.numberFormat));
    }else if(event.key>='۰' && event.key<='۹'){ //digits
      event.preventDefault();
      // console.log('digit');
      this.updateState(this.updateValue(event.target, event.key, this.props.numberFormat));
    }else if(event.key==='.' || event.key==='/' || event.key==='-' || event.key==='*' || event.key==='#' 
             || 
             event.keyCode===188 || event.keyCode===189 || event.keyCode===190 || event.keyCode===191 
             ){
      event.preventDefault();
      if(event.ctrlKey || event.shiftKey || event.metaKey || event.key==='#'){
        this.jumpToPrevious();
      }else{
        this.jumpToNext();
      }
    }else if(event.keyCode>=36 && event.keyCode<=40){ //arrows
    }else if(event.keyCode===9){ //tab
      if(Math.abs(this.inputRef.current.selectionStart - this.inputRef.current.selectionEnd)===this.inputRef.current.value.length){
        return;
      }
      if(event.ctrlKey || event.shiftKey || event.metaKey){
        if(this.jumpToPrevious()) event.preventDefault();
      }else{
        if(this.jumpToNext()) event.preventDefault();
      }
    }else if(event.keyCode===13){ //return
      this.hideKeyboard();
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===67 || event.keyCode===86)){ //copy/paste
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===82)){ //refresh key
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===73)){ //inspector
    }else if((event.ctrlKey || event.metaKey) && (event.keyCode===65)){ //select all
    }else if(event.keyCode===115){ // F4
      if(this.props.onShowDialog) {
        event.preventDefault();
        this.props.onShowDialog();
      }
    }else if(event.keyCode>=112 && event.keyCode<=123){ // All other F keys
    }else if(event.keyCode===229){ //android bug workaround
      //K1 : I guess that we have to save the caret position as the input will change it, we need it to know where we have to jump to in handleInput function
      this.values.selectionStart = this.inputRef.current.selectionStart;
      this.values.selectionEnd = this.inputRef.current.selectionEnd;
      //  this.rr.current.innerText = `setting ss to ${this.values.selectionStart}  ${this.values.selectionEnd}`;

    }else{
      // console.log('other');
      // console.log('keyCode: ', event.keyCode, 'key: ', event.key, 'ctrlKey: ', event.ctrlKey);
      //  this.rr.current.innerText = `keyCode: ${event.keyCode} key:  ${event.key} ctrlKey: ${event.ctrlKey}`;
      event.preventDefault();
    }
  };

  hideKeyboard = () => {
    this.inputRef.current.blur();
  }

  handlePaste = (event) => {
    event.preventDefault();

    const valueFromClipboard = this.readCardNumberFromValue((event.clipboardData || window.clipboardData).getData('text'));
    if(!valueFromClipboard) return;

    const values = this.readValues(valueFromClipboard);

    if(values.valueIsValid){
      this.updateState(values);
    }
  };

  handleInput = (event) => {
    event.preventDefault();
    if(this.values.valueToShow===event.target.value) return;
    const inputValue = event.target.value;
    // const enteredValue = stripAnyThingButDigits(event.target.value);
    // this.rr.current.innerText = `V : ${inputValue}`;
    
    if(this.inputRef.current.value !== this.values.valueToShow){
      this.inputRef.current.value = this.values.valueToShow;
      this.inputRef.current.setSelectionRange(this.values.selectionStart, this.values.selectionEnd);
    }

    if(hasStringACharToGoToNext(inputValue)){
      this.jumpToNext();
    }

    // this.updateState(this.rollbackValue());
  };

  /**
   * @param {string} value
   */
  mapValue = (value, numberFormat) => {
    if(numberFormat===NUMBER_FORMAT_FARSI){
      const mapped = mapToFarsi(value);
      return mapped;
    }else if(numberFormat===NUMBER_FORMAT_LATIN){
      const mapped = mapToLatin(value);
      return mapped;
    }
    const mapped = mapToFarsi(value);
    return mapped;
  };


  updateState = (newState) => {
    if(!newState) return;

    this.values = newState;

    if(this.values.valueIsValid===undefined){
      this.values.valueIsValid = this.isValueValidCardNumber(this.values.value);
    }

    let fireOnChangeInTheEnd = false;
    //console.log('values on updateState', this.values)
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
    if(fireOnChangeInTheEnd){
      this.fireOnChange();
    }
  };

  updateValue = (element, enteredValue, numberFormat) => {
    const enteredValueMapped = this.mapValue(enteredValue, numberFormat);
    let valueToShow = element.value;
    if(valueToShow===''){
      valueToShow = EMPTY_VALUE;
    }
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;

    valueToShow = valueToShow.substring(0, selectionStart) + enteredValueMapped + valueToShow.substring(selectionEnd);
    selectionStart += enteredValueMapped.length;

    const seperatorBefore = valueToShow.lastIndexOf(CARD_SEPERATOR, selectionStart - 1) + 1;
    let seperatorAfter = valueToShow.indexOf(CARD_SEPERATOR, selectionStart);
    if(seperatorAfter===-1) seperatorAfter = valueToShow.length;
    if(seperatorAfter - seperatorBefore > 4) {
      if(selectionStart - seperatorBefore >= 4){
        valueToShow = valueToShow.substring(0, seperatorBefore) + valueToShow.substring(selectionStart - 4, selectionStart) + valueToShow.substring(seperatorAfter);
        selectionStart = seperatorBefore + 4;
      }else{
        valueToShow = valueToShow.substring(0, seperatorBefore + 4) + valueToShow.substring(seperatorAfter);
      }
    }



    const value = mapToLatin(valueToShow);
    const valueIsValid = this.isValueValidCardNumber(value);

    if(selectionStart < valueToShow.length && value.substring(selectionStart - 4, selectionStart).match(/[0-9]{4}/)){
      selectionStart++;
    }
    selectionEnd = selectionStart;

    const values = {
      value,
      valueToShow,
      valueIsValid,
      selectionStart,
      selectionEnd,
    };

    return values; 
  };

  /**
   * @param {number} selectionStart
   */
  whereIsCaret = (selectionStart) => {
    return Math.floor(selectionStart / 5) + 1;
  };

  /**
   * @param {string} value
   */
  isValueValidCardNumber = (value) => {
    if(!value) return false;
    if(value.match(MATCH_REGEX)) return true;
    return false;
  };

  resetValues = () => {
    const value = '';
    return {
      value,
      valueToShow: this.mapValue(value, this.props.numberFormat),
      valueIsValid: false,
      selectionStart: 0,
      selectionEnd: 0,
    };
  };

  deleteValue = (element, qty) => {
    let valueToShow = element.value;
    let selectionStart = element.selectionStart;
    let selectionEnd = element.selectionEnd;

    if(selectionStart===selectionEnd){
      if(qty < 0) {
        if(selectionStart===0) return;
        if(valueToShow.substring(selectionStart + qty, selectionStart)===CARD_SEPERATOR) {
          const newValues = {...this.values};
          newValues.selectionStart--;
          newValues.selectionEnd--;
          return newValues;
        }
        valueToShow = valueToShow.substring(0, selectionStart + qty) + valueToShow.substring(selectionEnd);
        selectionStart += qty;
      }else{
        if(selectionEnd===valueToShow.length) return;
        if(valueToShow.substring(selectionStart, selectionStart + qty)===CARD_SEPERATOR) return;
        valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd+qty);
      }
      const nextSeperator = valueToShow.indexOf(CARD_SEPERATOR, selectionStart);
      if(nextSeperator===-1){
        valueToShow = valueToShow + ' ';
      }else{
        valueToShow = valueToShow.substring(0, nextSeperator) +repeatStr(' ', Math.abs(qty))+ valueToShow.substring(nextSeperator);
      }
    }else{
      if(valueToShow.substring(selectionStart, selectionEnd).indexOf(CARD_SEPERATOR)>=0){
        valueToShow = '';
        selectionStart = 0;
      }else {
        valueToShow = valueToShow.substring(0, selectionStart) +repeatStr(' ', selectionEnd-selectionStart)+ valueToShow.substring(selectionEnd);
      }
    }

    selectionEnd = selectionStart;

    const value = mapToLatin(valueToShow);
    const valueIsValid = this.isValueValidCardNumber(value);

    const values = {
      value,
      valueToShow,
      valueIsValid,
      selectionStart,
      selectionEnd,
    };

    return values; 
  };

  fireOnChange = () => {
    if(this.props.onChange){
      const value = this.values.value;
      if(this.previousValue !== value){
        this.previousValue = value;
        const target = {
          name: this.props.name,
          value: this.values.value,
          valueIsValid: this.values.valueIsValid,
        };
        this.props.onChange({target});
      }
    }
  };

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.value !== this.values.value || nextProps.numberFormat !== this.props.numberFormat){
      this.updateState(this.readValues(nextProps.value));
    }
    if(!shallowEqualObjects(nextProps.style, this.props.style)){
      return true;
    }
    if(nextProps.className !== this.props.className){
      this.inputRef.current.className = nextProps.className;
    }
    return false;
  }

  render() {
    const {value, onChange, onFocus, onBlur, onInput, onPast, onKeyDown, onShowDialog, pattern, inputMode, type, inputRef, numberFormat, ...rest} = this.props;
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
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...rest}
      />
      );
    //<p ref={this.rr} type={"text"}>empty</p></div>

  }
}


export default CardNumberInput;