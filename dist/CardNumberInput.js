import _objectWithoutProperties from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/assertThisInitialized";
import React, { Component } from 'react';
import shallowEqualObjects from 'shallow-equal/objects';
import { mapToFarsi, mapToLatin, hasStringACharToGoToNext, NUMBER_FORMAT_FARSI, NUMBER_FORMAT_LATIN } from './util';
var CARD_SEPERATOR = '-';
var SEPERATORES_REGEX = new RegExp("[ ".concat(CARD_SEPERATOR, "]"), 'g');
var MATCH_REGEX = new RegExp("[0-9]{4}[".concat(CARD_SEPERATOR, "][0-9]{4}[").concat(CARD_SEPERATOR, "][0-9]{4}[").concat(CARD_SEPERATOR, "][0-9]{4}"));
var EMPTY_VALUE = "    ".concat(CARD_SEPERATOR, "    ").concat(CARD_SEPERATOR, "    ").concat(CARD_SEPERATOR, "    ");
/**
 * @param {string} str
 * @param {number} n
 */

function repeatStr(str, n) {
  var r = '';

  for (var i = 0; i < n; i++) {
    r += str;
  }

  return r;
}

var CardNumberInput =
/*#__PURE__*/
function (_Component) {
  _inherits(CardNumberInput, _Component);

  function CardNumberInput(props) {
    var _this;

    _classCallCheck(this, CardNumberInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CardNumberInput).call(this, props));

    _this.readCardNumberFromValue = function (value) {
      if (!value) return;
      var latinNumberValue = mapToLatin(value);
      var regEx = /[0-9]{4}[^0-9]*[0-9]{4}[^0-9]*[0-9]{4}[^0-9]*[0-9]{4}/;
      var match = latinNumberValue.match(regEx);

      if (match) {
        var valueWithNoSeperator = match[0].replace(/[^0-9]*/g, '');
        return "".concat(valueWithNoSeperator.substring(0, 4)).concat(CARD_SEPERATOR).concat(valueWithNoSeperator.substring(4, 8)).concat(CARD_SEPERATOR).concat(valueWithNoSeperator.substring(8, 12)).concat(CARD_SEPERATOR).concat(valueWithNoSeperator.substring(12, 16));
      }

      var regEx4Digits = /[0-9]{4}/;
      var match4Digit = latinNumberValue.match(regEx4Digits);

      if (match4Digit) {
        _this.updateState(_this.updateValue(_this.inputRef.current, match4Digit[0], _this.props.numberFormat));

        return;
      }
    };

    _this.readValues = function (value) {
      var valueToShow = _this.mapValue(value, _this.props.numberFormat);

      var valueIsValid = _this.isValueValidCardNumber(value);

      return {
        value: value,
        valueToShow: valueToShow,
        valueIsValid: valueIsValid,
        selectionStart: undefined,
        selectionEnd: undefined
      };
    };

    _this.handleFocus = function (event) {
      if (_this.isValueEmpty(_this.values.value)) {
        _this.jumpTo(1);
      }

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    };

    _this.handleBlur = function (event) {
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    };

    _this.jumpToNext = function () {
      var selectionStart = _this.inputRef.current.selectionStart;

      var whereTheCaretIs = _this.whereIsCaret(selectionStart);

      if (whereTheCaretIs < 4) {
        _this.jumpTo(whereTheCaretIs + 1);

        return true;
      }

      return false;
    };

    _this.jumpToPrevious = function () {
      var selectionStart = _this.inputRef.current.selectionStart;

      var whereTheCaretIs = _this.whereIsCaret(selectionStart);

      if (whereTheCaretIs > 1) {
        _this.jumpTo(whereTheCaretIs - 1);

        return true;
      }

      return false;
    };

    _this.isValueEmpty = function (value) {
      if (value.replace(SEPERATORES_REGEX, '') === '') return true;
      return false;
    };

    _this.jumpTo = function (section) {
      var caretPosition = (section - 1) * 5;
      _this.values.selectionStart = caretPosition;
      _this.values.selectionEnd = caretPosition;

      _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
    };

    _this.handleKeyDown = function (event) {
      // console.log('keyCode: ', event.keyCode, 'key: ', event.key);
      if (event.keyCode === 8) {
        //backspace
        event.preventDefault();

        _this.updateState(_this.deleteValue(event.target, -1));
      } else if (event.keyCode === 46) {
        //delete
        event.preventDefault();

        _this.updateState(_this.deleteValue(event.target, 1));
      } else if (event.keyCode >= 48 && event.keyCode <= 57) {
        //digits
        event.preventDefault(); // console.log('digit');

        _this.updateState(_this.updateValue(event.target, (event.keyCode - 48).toString(), _this.props.numberFormat));
      } else if (event.keyCode >= 96 && event.keyCode <= 105) {
        //digits
        event.preventDefault(); // console.log('digit');

        _this.updateState(_this.updateValue(event.target, (event.keyCode - 96).toString(), _this.props.numberFormat));
      } else if (event.key >= '۰' && event.key <= '۹') {
        //digits
        event.preventDefault(); // console.log('digit');

        _this.updateState(_this.updateValue(event.target, event.key, _this.props.numberFormat));
      } else if (event.key === '.' || event.key === '/' || event.key === '-' || event.key === '*' || event.key === '#' || event.keyCode === 188 || event.keyCode === 189 || event.keyCode === 190 || event.keyCode === 191) {
        event.preventDefault();

        if (event.ctrlKey || event.shiftKey || event.metaKey || event.key === '#') {
          _this.jumpToPrevious();
        } else {
          _this.jumpToNext();
        }
      } else if (event.keyCode >= 36 && event.keyCode <= 40) {//arrows
      } else if (event.keyCode === 9) {
        //tab
        if (Math.abs(_this.inputRef.current.selectionStart - _this.inputRef.current.selectionEnd) === _this.inputRef.current.value.length) {
          return;
        }

        if (event.ctrlKey || event.shiftKey || event.metaKey) {
          if (_this.jumpToPrevious()) event.preventDefault();
        } else {
          if (_this.jumpToNext()) event.preventDefault();
        }
      } else if (event.keyCode === 13) {
        //return
        _this.hideKeyboard();
      } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 67 || event.keyCode === 86)) {//copy/paste
      } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 82) {//refresh key
      } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 73) {//inspector
      } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 65) {//select all
      } else if (event.keyCode === 115) {
        // F4
        if (_this.props.onShowDialog) {
          event.preventDefault();

          _this.props.onShowDialog();
        }
      } else if (event.keyCode >= 112 && event.keyCode <= 123) {// All other F keys
      } else if (event.keyCode === 229) {
        //android bug workaround
        //K1 : I guess that we have to save the caret position as the input will change it, we need it to know where we have to jump to in handleInput function
        _this.values.selectionStart = _this.inputRef.current.selectionStart;
        _this.values.selectionEnd = _this.inputRef.current.selectionEnd; //  this.rr.current.innerText = `setting ss to ${this.values.selectionStart}  ${this.values.selectionEnd}`;
      } else {
        // console.log('other');
        // console.log('keyCode: ', event.keyCode, 'key: ', event.key, 'ctrlKey: ', event.ctrlKey);
        //  this.rr.current.innerText = `keyCode: ${event.keyCode} key:  ${event.key} ctrlKey: ${event.ctrlKey}`;
        event.preventDefault();
      }
    };

    _this.hideKeyboard = function () {
      _this.inputRef.current.blur();
    };

    _this.handlePaste = function (event) {
      event.preventDefault();

      var valueFromClipboard = _this.readCardNumberFromValue((event.clipboardData || window.clipboardData).getData('text'));

      if (!valueFromClipboard) return;

      var values = _this.readValues(valueFromClipboard);

      if (values.valueIsValid) {
        _this.updateState(values);
      }
    };

    _this.handleInput = function (event) {
      event.preventDefault();
      if (_this.values.valueToShow === event.target.value) return;
      var inputValue = event.target.value; // const enteredValue = stripAnyThingButDigits(event.target.value);
      // this.rr.current.innerText = `V : ${inputValue}`;

      if (_this.inputRef.current.value !== _this.values.valueToShow) {
        _this.inputRef.current.value = _this.values.valueToShow;

        _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
      }

      if (hasStringACharToGoToNext(inputValue)) {
        _this.jumpToNext();
      } // this.updateState(this.rollbackValue());

    };

    _this.mapValue = function (value, numberFormat) {
      if (numberFormat === NUMBER_FORMAT_FARSI) {
        var _mapped = mapToFarsi(value);

        return _mapped;
      } else if (numberFormat === NUMBER_FORMAT_LATIN) {
        var _mapped2 = mapToLatin(value);

        return _mapped2;
      }

      var mapped = mapToFarsi(value);
      return mapped;
    };

    _this.updateState = function (newState) {
      if (!newState) return;
      _this.values = newState;

      if (_this.values.valueIsValid === undefined) {
        _this.values.valueIsValid = _this.isValueValidCardNumber(_this.values.value);
      }

      var fireOnChangeInTheEnd = false; //console.log('values on updateState', this.values)

      if (_this.inputRef.current.value !== _this.values.valueToShow) {
        fireOnChangeInTheEnd = true;
        _this.inputRef.current.value = _this.values.valueToShow;
      }

      if (_this.inputRef.current === document.activeElement) {
        // console.log('has focus :D');
        _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
      } else {// console.log('has not focus :(');
      }

      if (fireOnChangeInTheEnd) {
        _this.fireOnChange();
      }
    };

    _this.updateValue = function (element, enteredValue, numberFormat) {
      var enteredValueMapped = _this.mapValue(enteredValue, numberFormat);

      var valueToShow = element.value;

      if (valueToShow === '') {
        valueToShow = EMPTY_VALUE;
      }

      var selectionStart = element.selectionStart;
      var selectionEnd = element.selectionEnd;
      valueToShow = valueToShow.substring(0, selectionStart) + enteredValueMapped + valueToShow.substring(selectionEnd);
      selectionStart += enteredValueMapped.length;
      var seperatorBefore = valueToShow.lastIndexOf(CARD_SEPERATOR, selectionStart - 1) + 1;
      var seperatorAfter = valueToShow.indexOf(CARD_SEPERATOR, selectionStart);
      if (seperatorAfter === -1) seperatorAfter = valueToShow.length;

      if (seperatorAfter - seperatorBefore > 4) {
        if (selectionStart - seperatorBefore >= 4) {
          valueToShow = valueToShow.substring(0, seperatorBefore) + valueToShow.substring(selectionStart - 4, selectionStart) + valueToShow.substring(seperatorAfter);
          selectionStart = seperatorBefore + 4;
        } else {
          valueToShow = valueToShow.substring(0, seperatorBefore + 4) + valueToShow.substring(seperatorAfter);
        }
      }

      var value = mapToLatin(valueToShow);

      var valueIsValid = _this.isValueValidCardNumber(value);

      if (selectionStart < valueToShow.length && value.substring(selectionStart - 4, selectionStart).match(/[0-9]{4}/)) {
        selectionStart++;
      }

      selectionEnd = selectionStart;
      var values = {
        value: value,
        valueToShow: valueToShow,
        valueIsValid: valueIsValid,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      };
      return values;
    };

    _this.whereIsCaret = function (selectionStart) {
      return Math.floor(selectionStart / 5) + 1;
    };

    _this.isValueValidCardNumber = function (value) {
      if (!value) return false;
      if (value.match(MATCH_REGEX)) return true;
      return false;
    };

    _this.resetValues = function () {
      var value = '';
      return {
        value: value,
        valueToShow: _this.mapValue(value, _this.props.numberFormat),
        valueIsValid: false,
        selectionStart: 0,
        selectionEnd: 0
      };
    };

    _this.deleteValue = function (element, qty) {
      var valueToShow = element.value;
      var selectionStart = element.selectionStart;
      var selectionEnd = element.selectionEnd;

      if (selectionStart === selectionEnd) {
        if (qty < 0) {
          if (selectionStart === 0) return;

          if (valueToShow.substring(selectionStart + qty, selectionStart) === CARD_SEPERATOR) {
            var newValues = _objectSpread({}, _this.values);

            newValues.selectionStart--;
            newValues.selectionEnd--;
            return newValues;
          }

          valueToShow = valueToShow.substring(0, selectionStart + qty) + valueToShow.substring(selectionEnd);
          selectionStart += qty;
        } else {
          if (selectionEnd === valueToShow.length) return;
          if (valueToShow.substring(selectionStart, selectionStart + qty) === CARD_SEPERATOR) return;
          valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd + qty);
        }

        var nextSeperator = valueToShow.indexOf(CARD_SEPERATOR, selectionStart);

        if (nextSeperator === -1) {
          valueToShow = valueToShow + ' ';
        } else {
          valueToShow = valueToShow.substring(0, nextSeperator) + repeatStr(' ', Math.abs(qty)) + valueToShow.substring(nextSeperator);
        }
      } else {
        if (valueToShow.substring(selectionStart, selectionEnd).indexOf(CARD_SEPERATOR) >= 0) {
          valueToShow = '';
          selectionStart = 0;
        } else {
          valueToShow = valueToShow.substring(0, selectionStart) + repeatStr(' ', selectionEnd - selectionStart) + valueToShow.substring(selectionEnd);
        }
      }

      selectionEnd = selectionStart;
      var value = mapToLatin(valueToShow);

      var valueIsValid = _this.isValueValidCardNumber(value);

      var values = {
        value: value,
        valueToShow: valueToShow,
        valueIsValid: valueIsValid,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      };
      return values;
    };

    _this.fireOnChange = function () {
      if (_this.props.onChange) {
        var value = _this.values.value;

        if (_this.previousValue !== value) {
          _this.previousValue = value;
          var target = {
            name: _this.props.name,
            value: _this.values.value,
            valueIsValid: _this.values.valueIsValid
          };

          _this.props.onChange({
            target: target
          });
        }
      }
    };

    _this.emptyValue = _this.emptyValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    var ref;

    if (props.inputRef && typeof props.inputRef === 'function') {
      ref = props.inputRef();
    } else if (props.inputRef && typeof props.inputRef === 'object') {
      ref = props.inputRef;
    }

    _this.inputRef = ref ? ref : React.createRef(); // this.rr = React.createRef();

    _this.values = _this.readValues(props.value);
    _this.previousValue = _this.values.value;
    return _this;
  }
  /**
   * @param {string} value
   */


  _createClass(CardNumberInput, [{
    key: "emptyValue",
    value: function emptyValue() {
      this.updateState(this.resetValues());
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.value !== this.values.value || nextProps.numberFormat !== this.props.numberFormat) {
        this.updateState(this.readValues(nextProps.value));
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
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          onChange = _this$props.onChange,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          onInput = _this$props.onInput,
          onPast = _this$props.onPast,
          onKeyDown = _this$props.onKeyDown,
          onShowDialog = _this$props.onShowDialog,
          pattern = _this$props.pattern,
          inputMode = _this$props.inputMode,
          type = _this$props.type,
          inputRef = _this$props.inputRef,
          numberFormat = _this$props.numberFormat,
          rest = _objectWithoutProperties(_this$props, ["value", "onChange", "onFocus", "onBlur", "onInput", "onPast", "onKeyDown", "onShowDialog", "pattern", "inputMode", "type", "inputRef", "numberFormat"]);

      var valueToShow = this.values.valueToShow; // const localInputMode = this.props.type === 'tel' ? 'tel' : 'numeric'; // as we use type=tel, then we do not need it any more
      // const localPattern = '[0-9]*'; // it has problem with the form checking, as we insert persian digit, it is not acceptable for the browser

      return React.createElement("input", Object.assign({
        ref: this.inputRef,
        type: "tel" // I tried to use text and using inputMode, but it does not work on Safari
        // inputMode={localInputMode}
        // xInputMode={localnputMode} // in firefox OS it is x-inputmode, I do not know how to handle it
        ,
        dir: "ltr" // pattern={localPattern}
        ,
        defaultValue: valueToShow,
        onKeyDown: this.handleKeyDown,
        onPaste: this.handlePaste,
        onInput: this.handleInput,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }, rest)); //<p ref={this.rr} type={"text"}>empty</p></div>
    }
  }]);

  return CardNumberInput;
}(Component);

export default CardNumberInput;