import _objectWithoutProperties from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "/home/kayvan/projects/react-hichestan-numberinput/node_modules/@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import shallowEqualObjects from 'shallow-equal/objects';
import { mapToFarsi, mapToLatin, stripAnyThingButDigits, NUMBER_FORMAT_FARSI, NUMBER_FORMAT_LATIN } from './util';

var NumberInput =
/*#__PURE__*/
function (_Component) {
  _inherits(NumberInput, _Component);

  function NumberInput(_props) {
    var _this;

    _classCallCheck(this, NumberInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberInput).call(this, _props));

    _this.readValuesFromProps = function (props) {
      var value = props.value || '';

      var valueToShow = _this.mapValue(value, props.numberFormat);

      return {
        value: value,
        valueToShow: valueToShow,
        selectionStart: undefined,
        selectionEnd: undefined
      };
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
      } else if (event.keyCode >= 35 && event.keyCode <= 40) {//arrows
      } else if (event.keyCode === 9) {//tab
      } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 67 || event.keyCode === 86)) {//copy/paste
      } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 82) {//refresh key
      } else if (event.keyCode === 116) {// F5 refresh key
      } else if (event.keyCode === 229) {//android bug workaround
      } else {
        // console.log('other');
        // console.log('keyCode: ', event.keyCode, 'key: ', event.key, 'ctrlKey: ', event.ctrlKey);
        // this.rr.current.innerText = `keyCode: ${event.keyCode} key:  ${event.key} ctrlKey: ${event.ctrlKey}`;
        event.preventDefault();
      }
    };

    _this.handlePaste = function (event) {
      event.preventDefault();
      var enteredValue = stripAnyThingButDigits((event.clipboardData || window.clipboardData).getData('text'));

      _this.updateState(_this.updateValue(event.target, enteredValue, _this.props.numberFormat));
    };

    _this.handleInput = function (event) {
      if (_this.values.valueToShow === event.target.value) return;
      var enteredValue = stripAnyThingButDigits(event.target.value);

      _this.updateState(_this.recheckValue(event.target, enteredValue, _this.props.numberFormat));
    };

    _this.mapValue = function (value, numberFormat) {
      if (numberFormat === NUMBER_FORMAT_FARSI) {
        return mapToFarsi(value);
      } else if (numberFormat === NUMBER_FORMAT_LATIN) {
        return mapToLatin(value);
      }

      return mapToFarsi(value);
    };

    _this.updateState = function (newState) {
      if (!newState) return;
      _this.values = newState;
      _this.inputRef.current.value = _this.values.valueToShow;

      if (_this.inputRef.current === document.activeElement) {
        // console.log('has focus :D');
        _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
      } else {// console.log('has not focus :(');
      }

      _this.fireOnChange();
    };

    _this.updateValue = function (element, enteredValue, numberFormat) {
      var enteredValueMapped = _this.mapValue(enteredValue, numberFormat);

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

    _this.recheckValue = function (element, enteredValue, numberFormat) {
      var valueToShow = _this.mapValue(enteredValue, numberFormat);

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

    _this.deleteValue = function (element, qty) {
      var valueToShow = element.value;
      var selectionStart = element.selectionStart;
      var selectionEnd = element.selectionEnd; // console.log({selectionStart, selectionEnd})

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

    _this.fireOnChange = function () {
      if (_this.props.onChange) {
        _this.props.onChange({
          target: {
            name: _this.props.name,
            value: _this.values.value
          }
        });
      }
    };

    _this.inputRef = _props.ref ? _props.ref : React.createRef(); // this.rr = React.createRef();

    _this.values = _this.readValuesFromProps(_props);
    return _this;
  }

  _createClass(NumberInput, [{
    key: "shouldComponentUpdate",
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
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          onChange = _this$props.onChange,
          onInput = _this$props.onInput,
          onPast = _this$props.onPast,
          onKeyDown = _this$props.onKeyDown,
          pattern = _this$props.pattern,
          inputMode = _this$props.inputMode,
          type = _this$props.type,
          ref = _this$props.ref,
          numberFormat = _this$props.numberFormat,
          rest = _objectWithoutProperties(_this$props, ["value", "onChange", "onInput", "onPast", "onKeyDown", "pattern", "inputMode", "type", "ref", "numberFormat"]);

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
        onInput: this.handleInput
      }, rest)); //<p ref={this.rr} type={"text"}>empty</p></div>
    }
  }]);

  return NumberInput;
}(Component);

export default NumberInput;