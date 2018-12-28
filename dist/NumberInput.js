var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqualObjects from 'shallow-equal/objects';

import { mapToFarsi, mapToLatin, stripAnyThingButDigits, NUMBER_FORMAT_FARSI, NUMBER_FORMAT_LATIN } from './util';

var NumberInput = function (_Component) {
  _inherits(NumberInput, _Component);

  function NumberInput(props) {
    _classCallCheck(this, NumberInput);

    var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

    _initialiseProps.call(_this);

    _this.inputRef = props.ref ? props.ref : React.createRef();
    // this.rr = React.createRef();

    _this.values = _this.readValuesFromProps(props);
    return _this;
  }

  _createClass(NumberInput, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.value !== this.values.value || nextProps.numberFormat !== this.props.numberFormat) {
        this.updateState(this.readValuesFromProps(nextProps));
      }
      if (!shallowEqualObjects(nextProps.style, this.props.style)) {
        return true;
      }
      if (nextProps.className !== this.props.className) {
        this.inputRef.current.className = nextProps.className;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          onChange = _props.onChange,
          onInput = _props.onInput,
          onPast = _props.onPast,
          onKeyDown = _props.onKeyDown,
          pattern = _props.pattern,
          inputMode = _props.inputMode,
          type = _props.type,
          ref = _props.ref,
          numberFormat = _props.numberFormat,
          rest = _objectWithoutProperties(_props, ['value', 'onChange', 'onInput', 'onPast', 'onKeyDown', 'pattern', 'inputMode', 'type', 'ref', 'numberFormat']);

      var valueToShow = this.values.valueToShow;

      // const localInputMode = this.props.type === 'tel' ? 'tel' : 'numeric'; // as we use type=tel, then we do not need it any more
      // const localPattern = '[0-9]*'; // it has problem with the form checking, as we insert persian digit, it is not acceptable for the browser

      return React.createElement('input', Object.assign({
        ref: this.inputRef,
        type: "tel" // I tried to use text and using inputMode, but it does not work on Safari
        // inputMode={localInputMode}
        // xInputMode={localnputMode} // in firefox OS it is x-inputmode, I do not know how to handle it
        , dir: "ltr"
        // pattern={localPattern}
        , defaultValue: valueToShow,
        onKeyDown: this.handleKeyDown,
        onPaste: this.handlePaste,
        onInput: this.handleInput
      }, rest));
      //<p ref={this.rr} type={"text"}>empty</p></div>
    }
  }]);

  return NumberInput;
}(Component);

NumberInput.propTypes = {
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
   * Disables the number input.
   */
  disabled: PropTypes.bool,
  /**
   * makes the number input readonly.
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
   * Sets the value for the number input.
   */
  value: PropTypes.string
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.readValuesFromProps = function (props) {
    var value = props.value || '';
    var valueToShow = _this2.mapValue(value, props.numberFormat);

    return {
      value: value,
      valueToShow: valueToShow,
      selectionStart: undefined,
      selectionEnd: undefined
    };
  };

  this.handleKeyDown = function (event) {
    // console.log('keyCode: ', event.keyCode, 'key: ', event.key);
    if (event.keyCode === 8) {
      //backspace
      event.preventDefault();
      _this2.updateState(_this2.deleteValue(event.target, -1));
    } else if (event.keyCode === 46) {
      //delete
      event.preventDefault();
      _this2.updateState(_this2.deleteValue(event.target, 1));
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      //digits
      event.preventDefault();
      // console.log('digit');
      _this2.updateState(_this2.updateValue(event.target, (event.keyCode - 48).toString(), _this2.props.numberFormat));
    } else if (event.keyCode >= 96 && event.keyCode <= 105) {
      //digits
      event.preventDefault();
      // console.log('digit');
      _this2.updateState(_this2.updateValue(event.target, (event.keyCode - 96).toString(), _this2.props.numberFormat));
    } else if (event.key >= '۰' && event.key <= '۹') {
      //digits
      event.preventDefault();
      // console.log('digit');
      _this2.updateState(_this2.updateValue(event.target, event.key, _this2.props.numberFormat));
    } else if (event.keyCode >= 35 && event.keyCode <= 40) {//arrows
    } else if (event.keyCode === 9) {//tab
    } else if (event.keyCode === 13) {
      //return
      _this2.hideKeyboard();
    } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 67 || event.keyCode === 86)) {//copy/paste
    } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 82) {//refresh key
    } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 82) {//refresh key
    } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 73) {//inspector
    } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 65) {//select all
    } else if (event.keyCode >= 112 && event.keyCode <= 123) {// All other F keys
    } else if (event.keyCode === 229) {//android bug workaround
    } else {
      // console.log('other');
      // console.log('keyCode: ', event.keyCode, 'key: ', event.key, 'ctrlKey: ', event.ctrlKey);
      // this.rr.current.innerText = `keyCode: ${event.keyCode} key:  ${event.key} ctrlKey: ${event.ctrlKey}`;
      event.preventDefault();
    }
  };

  this.hideKeyboard = function () {
    _this2.inputRef.current.blur();
  };

  this.handlePaste = function (event) {
    event.preventDefault();

    var enteredValue = stripAnyThingButDigits((event.clipboardData || window.clipboardData).getData('text'));

    _this2.updateState(_this2.updateValue(event.target, enteredValue, _this2.props.numberFormat));
  };

  this.handleInput = function (event) {
    if (_this2.values.valueToShow === event.target.value) return;

    var enteredValue = stripAnyThingButDigits(event.target.value);

    _this2.updateState(_this2.recheckValue(event.target, enteredValue, _this2.props.numberFormat));
  };

  this.mapValue = function (value, numberFormat) {
    if (numberFormat === NUMBER_FORMAT_FARSI) {
      return mapToFarsi(value);
    } else if (numberFormat === NUMBER_FORMAT_LATIN) {
      return mapToLatin(value);
    }
    return mapToFarsi(value);
  };

  this.updateState = function (newState) {
    if (!newState) return;

    _this2.values = newState;
    var fireOnChangeInTheEnd = false;
    if (_this2.inputRef.current.value !== _this2.values.valueToShow) {
      fireOnChangeInTheEnd = true;
      _this2.inputRef.current.value = _this2.values.valueToShow;
    }
    if (_this2.inputRef.current === document.activeElement) {
      // console.log('has focus :D');
      _this2.inputRef.current.setSelectionRange(_this2.values.selectionStart, _this2.values.selectionEnd);
    } else {
      // console.log('has not focus :(');
    }
    if (fireOnChangeInTheEnd) {
      _this2.fireOnChange();
    }
  };

  this.updateValue = function (element, enteredValue, numberFormat) {
    var enteredValueMapped = _this2.mapValue(enteredValue, numberFormat);
    var valueToShow = element.value;
    var selectionStart = element.selectionStart;
    var selectionEnd = element.selectionEnd;

    valueToShow = valueToShow.substring(0, selectionStart) + enteredValueMapped + valueToShow.substring(selectionEnd);

    selectionStart += enteredValueMapped.length;
    selectionEnd = selectionStart;

    var value = mapToLatin(valueToShow);

    return {
      value: value,
      valueToShow: valueToShow,
      selectionStart: selectionStart,
      selectionEnd: selectionEnd
    };
  };

  this.recheckValue = function (element, enteredValue, numberFormat) {
    var valueToShow = _this2.mapValue(enteredValue, numberFormat);
    var selectionStart = element.selectionStart;
    var selectionEnd = element.selectionEnd;

    var value = mapToLatin(valueToShow);

    return {
      value: value,
      valueToShow: valueToShow,
      selectionStart: selectionStart,
      selectionEnd: selectionEnd
    };
  };

  this.deleteValue = function (element, qty) {
    var valueToShow = element.value;
    var selectionStart = element.selectionStart;
    var selectionEnd = element.selectionEnd;

    // console.log({selectionStart, selectionEnd})

    if (selectionStart === selectionEnd) {
      if (qty < 0) {
        if (selectionStart === 0) return;
        valueToShow = valueToShow.substring(0, selectionStart + qty) + valueToShow.substring(selectionEnd);
        selectionStart += qty;
      } else {
        if (selectionEnd === valueToShow.length) return;
        valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd + qty);
      }
    } else {
      valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd);
    }

    selectionEnd = selectionStart;

    var value = mapToLatin(valueToShow);

    return {
      value: value,
      valueToShow: valueToShow,
      selectionStart: selectionStart,
      selectionEnd: selectionEnd
    };
  };

  this.fireOnChange = function () {
    if (_this2.props.onChange) {
      _this2.props.onChange({ target: { name: _this2.props.name, value: _this2.values.value } });
    }
  };
};

export default NumberInput;