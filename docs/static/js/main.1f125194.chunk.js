(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(19)},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),u=a(10),l=a(1),o=a(2),s=a(4),i=a(3),p=a(5),c=a(7),d=a(6),v=a.n(d),m="FARSI",h="LATIN";function f(e){return e?e.toString().replace(/[1234567890]/gi,function(e){return String.fromCharCode(e.charCodeAt(0)+1728)}):e}function g(e){return e?e.toString().replace(/[\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9\u06f0]/gi,function(e){return String.fromCharCode(e.charCodeAt(0)-1728)}):e}function y(e){return e?e.toString().replace(/[^1234567890\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9\u06f0]/gi,""):e}function b(e,t){for(var a="",n=0;n<t;n++)a+=e;return a}var S=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).readValuesFromProps=function(e){var t=e.value||"";return{value:t,valueToShow:a.mapValue(t,e.numberFormat),selectionStart:void 0,selectionEnd:void 0}},a.handleKeyDown=function(e){8===e.keyCode?(e.preventDefault(),a.updateState(a.deleteValue(e.target,-1))):46===e.keyCode?(e.preventDefault(),a.updateState(a.deleteValue(e.target,1))):e.keyCode>=48&&e.keyCode<=57?(e.preventDefault(),a.updateState(a.updateValue(e.target,(e.keyCode-48).toString(),a.props.numberFormat))):e.keyCode>=96&&e.keyCode<=105?(e.preventDefault(),a.updateState(a.updateValue(e.target,(e.keyCode-96).toString(),a.props.numberFormat))):e.key>="\u06f0"&&e.key<="\u06f9"?(e.preventDefault(),a.updateState(a.updateValue(e.target,e.key,a.props.numberFormat))):e.keyCode>=35&&e.keyCode<=40||9===e.keyCode||(13===e.keyCode?a.hideKeyboard():(!e.ctrlKey&&!e.metaKey||67!==e.keyCode&&86!==e.keyCode)&&((e.ctrlKey||e.metaKey)&&82===e.keyCode||(e.ctrlKey||e.metaKey)&&82===e.keyCode||(e.ctrlKey||e.metaKey)&&73===e.keyCode||(e.ctrlKey||e.metaKey)&&65===e.keyCode||e.keyCode>=112&&e.keyCode<=123||229===e.keyCode||e.preventDefault()))},a.hideKeyboard=function(){a.inputRef.current.blur()},a.handlePaste=function(e){e.preventDefault();var t=y((e.clipboardData||window.clipboardData).getData("text"));a.updateState(a.updateValue(e.target,t,a.props.numberFormat))},a.handleInput=function(e){if(a.values.valueToShow!==e.target.value){var t=y(e.target.value);a.updateState(a.recheckValue(e.target,t,a.props.numberFormat),!0)}},a.mapValue=function(e,t){return t===m?f(e):t===h?g(e):f(e)},a.updateState=function(e,t){if(e){a.values=e;var n=!1;a.inputRef.current.value!==a.values.valueToShow&&(n=!0,a.inputRef.current.value=a.values.valueToShow),a.inputRef.current===document.activeElement&&a.inputRef.current.setSelectionRange(a.values.selectionStart,a.values.selectionEnd),(n||t)&&a.fireOnChange()}},a.updateValue=function(e,t,n){var r=a.mapValue(t,n),u=e.value,l=e.selectionStart,o=e.selectionEnd;if(!(a.props.maxLength&&u.length+t.length>a.props.maxLength))return u=u.substring(0,l)+r+u.substring(o),o=l+=r.length,{value:g(u),valueToShow:u,selectionStart:l,selectionEnd:o}},a.recheckValue=function(e,t,n){var r=a.mapValue(t,n),u=e.selectionStart,l=e.selectionEnd;return{value:g(r),valueToShow:r,selectionStart:u,selectionEnd:l}},a.deleteValue=function(e,t){var a=e.value,n=e.selectionStart,r=e.selectionEnd;if(n===r)if(t<0){if(0===n)return;a=a.substring(0,n+t)+a.substring(r),n+=t}else{if(r===a.length)return;a=a.substring(0,n)+a.substring(r+t)}else a=a.substring(0,n)+a.substring(r);return r=n,{value:g(a),valueToShow:a,selectionStart:n,selectionEnd:r}},a.fireOnChange=function(){a.props.onChange&&a.props.onChange({target:{name:a.props.name,value:a.values.value}})};var n=e.inputRef||e.getInputRef;return n&&"function"===typeof n&&(n=n()),a.inputRef=n||r.a.createRef(),a.values=a.readValuesFromProps(e),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return e.value===this.values.value&&e.numberFormat===this.props.numberFormat||this.updateState(this.readValuesFromProps(e)),!v()(e.style,this.props.style)||(e.className!==this.props.className&&(this.inputRef.current.className=e.className),!1)}},{key:"render",value:function(){var e=this.props,t=(e.value,e.onChange,e.onInput,e.onPast,e.onKeyDown,e.pattern,e.inputMode,e.type,e.ref,e.inputRef,e.getInputRef,e.numberFormat,e.defaultValue,Object(c.a)(e,["value","onChange","onInput","onPast","onKeyDown","pattern","inputMode","type","ref","inputRef","getInputRef","numberFormat","defaultValue"])),a=this.values.valueToShow;return r.a.createElement("input",Object.assign({ref:this.inputRef,type:"tel",dir:"ltr",defaultValue:a,onKeyDown:this.handleKeyDown,onPaste:this.handlePaste,onInput:this.handleInput},t))}}]),t}(n.Component),C=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).defaultThousandSeparator=function(){return","},a.defaultDecimalSeparator=function(){return"."},a.readValuesFromProps=function(e){if(e.value){var t=e.value?e.asString?e.value:Number(e.value):void 0;return a.updateValue("",0,0,t,e.numberFormat,e.asString)}return{value:void 0,valueToShow:"",selectionStart:void 0,selectionEnd:void 0}},a.handleKeyDown=function(e){8===e.keyCode?(e.preventDefault(),a.updateState(a.deleteValue(e.target,-1,a.props.asString))):46===e.keyCode?(e.preventDefault(),a.updateState(a.deleteValue(e.target,1,a.props.asString))):e.keyCode>=48&&e.keyCode<=57?(e.preventDefault(),a.updateState(a.updateElementValue(e.target,(e.keyCode-48).toString(),a.props.numberFormat,a.props.asString))):e.keyCode>=96&&e.keyCode<=105?(e.preventDefault(),a.updateState(a.updateElementValue(e.target,(e.keyCode-96).toString(),a.props.numberFormat,a.props.asString))):e.key>="\u06f0"&&e.key<="\u06f9"?(e.preventDefault(),a.updateState(a.updateElementValue(e.target,e.key,a.props.numberFormat,a.props.asString))):"."===e.key||190===e.keyCode?(e.preventDefault(),a.updateState(a.updateElementValue(e.target,".",a.props.numberFormat,a.props.asString))):"-"===e.key||189===e.keyCode?(e.preventDefault(),a.updateState(a.negate())):e.keyCode>=35&&e.keyCode<=40||9===e.keyCode||(13===e.keyCode?a.hideKeyboard():(!e.ctrlKey&&!e.metaKey||67!==e.keyCode&&86!==e.keyCode)&&((e.ctrlKey||e.metaKey)&&82===e.keyCode||(e.ctrlKey||e.metaKey)&&82===e.keyCode||(e.ctrlKey||e.metaKey)&&73===e.keyCode||(e.ctrlKey||e.metaKey)&&65===e.keyCode||e.keyCode>=112&&e.keyCode<=123||229===e.keyCode||e.preventDefault()))},a.hideKeyboard=function(){a.inputRef.current.blur()},a.handlePaste=function(e){e.preventDefault();var t=a.stripAnyThingButNumber((e.clipboardData||window.clipboardData).getData("text"));""!==a.values.valueToShow&&(t=t.replace(/[-]/g,"")),a.updateState(a.updateElementValue(e.target,t,a.props.numberFormat,a.props.asString))},a.handleInput=function(e){if(a.values.valueToShow!==e.target.value){var t=a.stripAnyThingButNumber(e.target.value),n=t.indexOf("-");if(t.indexOf("-",n+1)>=0||n>0)a.updateState(a.negate());else{var r=e.target.selectionStart,u=e.target.selectionEnd,l=a.updateValue("",r,u,t,a.props.numberFormat,a.props.asString);a.updateState(l,!0)}}},a.mapValue=function(e,t){return t===m?f(e):t===h?g(e):f(e)},a.mapDecimalSeparator=function(e){return e.replace(a.decimalSeparatorRegex,a.decimalSeparator)},a.updateState=function(e,t){if(e){a.values=e;var n=!1;a.inputRef.current.value!==a.values.valueToShow&&(n=!0,a.inputRef.current.value=a.values.valueToShow),a.inputRef.current===document.activeElement&&a.inputRef.current.setSelectionRange(a.values.selectionStart,a.values.selectionEnd),(n||t)&&a.fireOnChange()}},a.negate=function(){var e=a.values,t=e.value,n=e.valueToShow,r=e.valueIsValid,u=e.selectionStart,l=e.selectionEnd;if(t>0)t=-t,n="-"+n,u++,l++;else{if(!(t<0))return;t=-t,n=n.substring(1),u--,l--}return{value:t,valueToShow:n,valueIsValid:r,selectionStart:u,selectionEnd:l}},a.updateElementValue=function(e,t,n,r){var u=e.value,l=e.selectionStart,o=e.selectionEnd;return a.updateValue(u,l,o,t,n,r)},a.updateValue=function(e,t,n,r,u,l){var o=a.mapDecimalSeparator(a.mapValue(r,u)),s=e,i=s.substring(0,t),p=s.substring(n);t-=a.countThousandSeparator(i),s=(i=a.stripThousandSeparator(i))+o+(p=a.stripThousandSeparator(p)),t+=o.length;var c=a.addThousandSeparator(s,t);s=c.valueToShowWithSeparator,n=t=c.selectionStart;var d,v=a.stripThousandSeparator(g(s));if(l){var m=Number(v);d="number"===typeof m||void 0===m||null===m}else d="number"===typeof(v=Number(v))||void 0===v||null===v;return{value:v,valueToShow:s,valueIsValid:d,selectionStart:t,selectionEnd:n}},a.deleteValue=function(e,t,n){var r=e.value,u=e.selectionStart,l=e.selectionEnd;if(u===l)if(t<0){if(0===u)return;var o=r.substring(0,u+t),s=r.substring(l);u-=a.countThousandSeparator(o),r=(o=a.stripThousandSeparator(o))+(s=a.stripThousandSeparator(s)),u+=t}else{if(l===r.length)return;var i=r.substring(0,u),p=r.substring(l+t);u-=a.countThousandSeparator(i),r=(i=a.stripThousandSeparator(i))+(p=a.stripThousandSeparator(p))}else{var c=r.substring(0,u),d=r.substring(l);u-=a.countThousandSeparator(c),r=(c=a.stripThousandSeparator(c))+(d=a.stripThousandSeparator(d))}var v=a.addThousandSeparator(r,u);r=v.valueToShowWithSeparator,l=u=v.selectionStart;var m,h=a.stripThousandSeparator(g(r));if(n){var f=Number(h);m="number"===typeof f||void 0===f||null===f}else m="number"===typeof(h=Number(h))||void 0===h||null===h;return{value:h,valueToShow:r,valueIsValid:m,selectionStart:u,selectionEnd:l}},a.addThousandSeparator=function(e,t){for(var n="",r=!1,u=-1===e.indexOf(a.decimalSeparator),l=0,o=e.length-1;o>=0;o--){var s=e.charAt(o);s===a.decimalSeparator?r?o<=t&&t--:(r=!0,n=s+n,u=!0,l=0):(u&&3===l&&"-"!==s&&(n=a.thousandSeparator+n,l=0,o<t-1&&t++),n=s+n,l++)}return{valueToShowWithSeparator:n,selectionStart:t}},a.countThousandSeparator=function(e){return(e.match(a.thousandSeparatorRegex)||[]).length},a.stripThousandSeparator=function(e){return e.replace(a.thousandSeparatorRegex,"")},a.stripAnyThingButNumber=function(e){return e?e.toString().replace(a.numberRegex,""):e},a.fireOnChange=function(){a.props.onChange&&a.props.onChange({target:{name:a.props.name,value:a.values.value}})};var n=e.inputRef||e.getInputRef;return n&&"function"===typeof n&&(n=n()),a.inputRef=n||r.a.createRef(),a.thousandSeparator=e.thousandSeparator||a.defaultThousandSeparator(),a.decimalSeparator=e.decimalSeparator||a.defaultDecimalSeparator(),a.thousandSeparatorRegex=new RegExp("[".concat(a.thousandSeparator,"]"),"g"),a.decimalSeparatorRegex=new RegExp("[.".concat(a.decimalSeparator,"]"),"g"),a.numberRegex=new RegExp("[^-1234567890\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9\u06f0.".concat(a.decimalSeparator,"]"),"gi"),a.values=a.readValuesFromProps(e),a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return e.value===this.values.value&&e.numberFormat===this.props.numberFormat||this.updateState(this.readValuesFromProps(e)),!v()(e.style,this.props.style)||(e.className!==this.props.className&&(this.inputRef.current.className=e.className),!1)}},{key:"render",value:function(){var e=this.props,t=(e.value,e.onChange,e.onInput,e.onPast,e.onKeyDown,e.pattern,e.inputMode,e.type,e.ref,e.inputRef,e.getInputRef,e.numberFormat,e.defaultValue,e.asString,Object(c.a)(e,["value","onChange","onInput","onPast","onKeyDown","pattern","inputMode","type","ref","inputRef","getInputRef","numberFormat","defaultValue","asString"])),a=this.values.valueToShow;return r.a.createElement("input",Object.assign({ref:this.inputRef,type:"tel",dir:"ltr",defaultValue:a,onKeyDown:this.handleKeyDown,onPaste:this.handlePaste,onInput:this.handleInput},t))}}]),t}(n.Component),E=a(11),k=a(8),V="-",w=new RegExp("[ ".concat(V,"]"),"g"),R=new RegExp("[0-9]{4}[".concat(V,"][0-9]{4}[").concat(V,"][0-9]{4}[").concat(V,"][0-9]{4}")),T="    ".concat(V,"    ").concat(V,"    ").concat(V,"    "),D=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).readCardNumberFromValue=function(e){if(e){var t=g(e),n=t.match(/[0-9]{4}[^0-9]*[0-9]{4}[^0-9]*[0-9]{4}[^0-9]*[0-9]{4}/);if(n){var r=n[0].replace(/[^0-9]*/g,"");return"".concat(r.substring(0,4)).concat(V).concat(r.substring(4,8)).concat(V).concat(r.substring(8,12)).concat(V).concat(r.substring(12,16))}var u=t.match(/[0-9]{4}/);u&&a.updateState(a.updateValue(a.inputRef.current,u[0],a.props.numberFormat))}},a.readValues=function(e){return{value:e,valueToShow:a.mapValue(e,a.props.numberFormat),valueIsValid:a.isValueValidCardNumber(e),selectionStart:void 0,selectionEnd:void 0}},a.handleFocus=function(e){a.isValueEmpty(a.values.value)&&a.jumpTo(1),a.props.onFocus&&a.props.onFocus(e)},a.handleBlur=function(e){a.props.onBlur&&a.props.onBlur(e)},a.jumpToNext=function(){var e=a.inputRef.current.selectionStart,t=a.whereIsCaret(e);return t<4&&(a.jumpTo(t+1),!0)},a.jumpToPrevious=function(){var e=a.inputRef.current.selectionStart,t=a.whereIsCaret(e);return t>1&&(a.jumpTo(t-1),!0)},a.isValueEmpty=function(e){return""===e.replace(w,"")},a.jumpTo=function(e){var t=5*(e-1);a.values.selectionStart=t,a.values.selectionEnd=t,a.inputRef.current.setSelectionRange(a.values.selectionStart,a.values.selectionEnd)},a.handleKeyDown=function(e){if(8===e.keyCode)e.preventDefault(),a.updateState(a.deleteValue(e.target,-1));else if(46===e.keyCode)e.preventDefault(),a.updateState(a.deleteValue(e.target,1));else if(e.keyCode>=48&&e.keyCode<=57)e.preventDefault(),a.updateState(a.updateValue(e.target,(e.keyCode-48).toString(),a.props.numberFormat));else if(e.keyCode>=96&&e.keyCode<=105)e.preventDefault(),a.updateState(a.updateValue(e.target,(e.keyCode-96).toString(),a.props.numberFormat));else if(e.key>="\u06f0"&&e.key<="\u06f9")e.preventDefault(),a.updateState(a.updateValue(e.target,e.key,a.props.numberFormat));else if("."===e.key||"/"===e.key||"-"===e.key||"*"===e.key||"#"===e.key||188===e.keyCode||189===e.keyCode||190===e.keyCode||191===e.keyCode)e.preventDefault(),e.ctrlKey||e.shiftKey||e.metaKey||"#"===e.key?a.jumpToPrevious():a.jumpToNext();else if(e.keyCode>=36&&e.keyCode<=40);else if(9===e.keyCode){if(Math.abs(a.inputRef.current.selectionStart-a.inputRef.current.selectionEnd)===a.inputRef.current.value.length)return;e.ctrlKey||e.shiftKey||e.metaKey?a.jumpToPrevious()&&e.preventDefault():a.jumpToNext()&&e.preventDefault()}else 13===e.keyCode?a.hideKeyboard():(!e.ctrlKey&&!e.metaKey||67!==e.keyCode&&86!==e.keyCode)&&((e.ctrlKey||e.metaKey)&&82===e.keyCode||(e.ctrlKey||e.metaKey)&&73===e.keyCode||(e.ctrlKey||e.metaKey)&&65===e.keyCode||(115===e.keyCode?a.props.onShowDialog&&(e.preventDefault(),a.props.onShowDialog()):e.keyCode>=112&&e.keyCode<=123||(229===e.keyCode?(a.values.selectionStart=a.inputRef.current.selectionStart,a.values.selectionEnd=a.inputRef.current.selectionEnd):e.preventDefault())))},a.hideKeyboard=function(){a.inputRef.current.blur()},a.handlePaste=function(e){e.preventDefault();var t=a.readCardNumberFromValue((e.clipboardData||window.clipboardData).getData("text"));if(t){var n=a.readValues(t);n.valueIsValid&&a.updateState(n)}},a.handleInput=function(e){if(e.preventDefault(),a.values.valueToShow!==e.target.value){var t,n=e.target.value;a.inputRef.current.value!==a.values.valueToShow&&(a.inputRef.current.value=a.values.valueToShow,a.inputRef.current.setSelectionRange(a.values.selectionStart,a.values.selectionEnd)),((t=n).indexOf(".")>=0||t.indexOf(",")>=0||t.indexOf("-")>=0||t.indexOf(";")>=0||t.indexOf("*")>=0||t.indexOf("#")>=0||t.indexOf(" ")>=0||t.indexOf("\u060c")>=0)&&a.jumpToNext()}},a.mapValue=function(e,t){return t===m?f(e):t===h?g(e):f(e)},a.updateState=function(e){if(e){a.values=e,void 0===a.values.valueIsValid&&(a.values.valueIsValid=a.isValueValidCardNumber(a.values.value));var t=!1;a.inputRef.current.value!==a.values.valueToShow&&(t=!0,a.inputRef.current.value=a.values.valueToShow),a.inputRef.current===document.activeElement&&a.inputRef.current.setSelectionRange(a.values.selectionStart,a.values.selectionEnd),t&&a.fireOnChange()}},a.updateValue=function(e,t,n){var r=a.mapValue(t,n),u=e.value;""===u&&(u=T);var l=e.selectionStart,o=e.selectionEnd;u=u.substring(0,l)+r+u.substring(o),l+=r.length;var s=u.lastIndexOf(V,l-1)+1,i=u.indexOf(V,l);-1===i&&(i=u.length),i-s>4&&(l-s>=4?(u=u.substring(0,s)+u.substring(l-4,l)+u.substring(i),l=s+4):u=u.substring(0,s+4)+u.substring(i));var p=g(u),c=a.isValueValidCardNumber(p);return l<u.length&&p.substring(l-4,l).match(/[0-9]{4}/)&&l++,{value:p,valueToShow:u,valueIsValid:c,selectionStart:l,selectionEnd:o=l}},a.whereIsCaret=function(e){return Math.floor(e/5)+1},a.isValueValidCardNumber=function(e){return!!e&&!!e.match(R)},a.resetValues=function(){return{value:"",valueToShow:a.mapValue("",a.props.numberFormat),valueIsValid:!1,selectionStart:0,selectionEnd:0}},a.deleteValue=function(e,t){var n=e.value,r=e.selectionStart,u=e.selectionEnd;if(r===u){if(t<0){if(0===r)return;if(n.substring(r+t,r)===V){var l=Object(E.a)({},a.values);return l.selectionStart--,l.selectionEnd--,l}n=n.substring(0,r+t)+n.substring(u),r+=t}else{if(u===n.length)return;if(n.substring(r,r+t)===V)return;n=n.substring(0,r)+n.substring(u+t)}var o=n.indexOf(V,r);-1===o?n+=" ":n=n.substring(0,o)+b(" ",Math.abs(t))+n.substring(o)}else n.substring(r,u).indexOf(V)>=0?(n="",r=0):n=n.substring(0,r)+b(" ",u-r)+n.substring(u);u=r;var s=g(n);return{value:s,valueToShow:n,valueIsValid:a.isValueValidCardNumber(s),selectionStart:r,selectionEnd:u}},a.fireOnChange=function(){if(a.props.onChange){var e=a.values.value;if(a.previousValue!==e){a.previousValue=e;var t={name:a.props.name,value:a.values.value,valueIsValid:a.values.valueIsValid};a.props.onChange({target:t})}}},a.emptyValue=a.emptyValue.bind(Object(k.a)(a));var n=e.inputRef||e.getInputRef;return n&&"function"===typeof n&&(n=n()),a.inputRef=n||r.a.createRef(),a.values=a.readValues(e.value),a.previousValue=a.values.value,a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"emptyValue",value:function(){this.updateState(this.resetValues())}},{key:"shouldComponentUpdate",value:function(e,t){return e.value===this.values.value&&e.numberFormat===this.props.numberFormat||this.updateState(this.readValues(e.value)),!v()(e.style,this.props.style)||(e.className!==this.props.className&&(this.inputRef.current.className=e.className),!1)}},{key:"render",value:function(){var e=this.props,t=(e.value,e.onChange,e.onFocus,e.onBlur,e.onInput,e.onPast,e.onKeyDown,e.onShowDialog,e.pattern,e.inputMode,e.type,e.inputRef,e.getInputRef,e.numberFormat,e.defaultValue,Object(c.a)(e,["value","onChange","onFocus","onBlur","onInput","onPast","onKeyDown","onShowDialog","pattern","inputMode","type","inputRef","getInputRef","numberFormat","defaultValue"])),a=this.values.valueToShow;return r.a.createElement("input",Object.assign({ref:this.inputRef,type:"tel",dir:"ltr",defaultValue:a,onKeyDown:this.handleKeyDown,onPaste:this.handlePaste,onInput:this.handleInput,onFocus:this.handleFocus,onBlur:this.handleBlur},t))}}]),t}(n.Component),K=(a(18),function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),u=0;u<n;u++)r[u]=arguments[u];return(a=Object(s.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).state={Number1:"",Number2:"123",Number3:"0",color:!1,bgColor:!1,Tel1:"0912",value1:""},a.handleChange=function(e){var t={},n=e.target;t[n.name]=n.value,a.setState(t,function(){console.log("state",a.state)})},a.handleValueChange=function(e){var t={},n=e.target;t[n.name.substr(0,7)]=n.value,a.setState(t,function(){console.log("state",a.state)})},a.toggleColor=function(){a.setState({color:!a.state.color})},a.toggleBgColor=function(){a.setState({bgColor:!a.state.bgColor})},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.interval=setInterval(this.toggleBgColor,6e3),this.interval=setInterval(this.toggleColor,3e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){var e=this.state.color?"red":"",t=this.state.bgColor?{backgroundColor:"aqua"}:{};return r.a.createElement(r.a.Fragment,null,r.a.createElement("form",{autoComplete:"on"},r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("label",null,"\u062e\u0631\u0648\u062c\u06cc \u0639\u062f\u062f \u0644\u0627\u062a\u06cc\u0646",r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"Number1_value",style:{width:250},value:this.state.Number1,onChange:this.handleValueChange,placeholder:"\u0627\u0632 \u0627\u06cc\u0646\u062c\u0627 \u06a9\u0644\u06cc\u062f \u062a\u0628 \u0631\u0627 \u0686\u0646\u062f \u0628\u0627\u0631 \u0628\u0632\u0646\u06cc\u062f"})),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("label",null,"\u0646\u0645\u0648\u0646\u0647 \u0641\u0627\u0631\u0633\u06cc",r.a.createElement("br",null),r.a.createElement(S,{name:"Number1",className:e,style:t,value:this.state.Number1,onChange:this.handleChange,placeholder:"type/paste a number"}))),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("label",null,"\u0646\u0645\u0648\u0646\u0647 \u0644\u0627\u062a\u06cc\u0646",r.a.createElement("br",null),r.a.createElement(S,{name:"Number2",className:e,style:t,value:this.state.Number2,numberFormat:h,onChange:this.handleChange,placeholder:"type/paste a number"}))),r.a.createElement("label",null,"\u062e\u0631\u0648\u062c\u06cc",r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"Number2_value",style:{width:250},value:this.state.Number2,onChange:this.handleValueChange,placeholder:"\u0627\u06cc\u0646 \u0641\u06cc\u0644\u062f \u062e\u0631\u0648\u062c\u06cc \u0627\u0633\u062a"})),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("label",null,"\u0639\u062f\u062f \u0627\u0639\u0634\u0627\u0631\u06cc",r.a.createElement("br",null),r.a.createElement(C,{name:"Number3",className:e,style:t,value:this.state.Number3,asString:!0,numberFormat:m,onChange:this.handleChange,placeholder:"type/paste a number"}))),r.a.createElement("label",null,"\u062e\u0631\u0648\u062c\u06cc",r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"Number3_value",style:{width:250},value:this.state.Number3,onChange:this.handleValueChange,placeholder:"\u0627\u06cc\u0646 \u0641\u06cc\u0644\u062f \u062e\u0631\u0648\u062c\u06cc \u0627\u0633\u062a"})),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("label",null,"\u0646\u0645\u0648\u0646\u0647 \u062a\u0644\u0641\u0646 \u0641\u0627\u0631\u0633\u06cc",r.a.createElement("br",null),r.a.createElement(S,{type:"tel",name:"Tel1",className:e,style:t,value:this.state.Tel1,onChange:this.handleChange,maxLength:12,placeholder:"type/paste a number"}))),r.a.createElement("br",null),r.a.createElement("label",null,"\u0648\u0631\u0648\u062f\u06cc \u0634\u0645\u0627\u0631\u0647 \u06a9\u0627\u0631\u062a",r.a.createElement("br",null),r.a.createElement(D,{value:this.state.value1,name:"value1",className:e,style:t,onChange:this.handleChange,placeholder:"\u0634\u0645\u0627\u0631\u0647 \u06a9\u0627\u0631\u062a"}),r.a.createElement("br",null),"\u062e\u0631\u0648\u062c\u06cc",r.a.createElement("br",null),r.a.createElement("input",{type:"text",name:"value1",dir:"ltr",value:this.state.value1,onChange:this.handleChange})),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",{onClick:this.toggleColor},"toggle className"),r.a.createElement("button",{onClick:this.toggleBgColor},"toggle style"),r.a.createElement("input",{type:"submit"})))}}]),t}(n.Component));Object(u.render)(r.a.createElement(function(){return r.a.createElement("div",{dir:"rtl",style:{width:640,margin:"15px auto"}},r.a.createElement("h1",null,"\u06a9\u0645\u067e\u0646\u0646\u062a \u0639\u062f\u062f"),r.a.createElement("br",null),"\u0648\u0631\u0698\u0646 \u06f1 \u0633\u0627\u062e\u062a \u06f0",r.a.createElement("ul",null,r.a.createElement("li",null,"\u0646\u0645\u0627\u06cc\u0634 \u0639\u062f\u062f \u0641\u0627\u0631\u0633\u06cc \u06cc\u0627 \u0644\u0627\u062a\u06cc\u0646"),r.a.createElement("li",null,"\u0630\u062e\u06cc\u0631\u0647 \u0639\u062f\u062f \u0644\u0627\u062a\u06cc\u0646\u060c \u0628\u0627\u0639\u062b \u0645\u06cc\u0634\u0648\u062f \u06a9\u0647 \u062f\u0627\u062f\u0647 \u0635\u062d\u06cc\u062d \u0628\u0647 \u0633\u0631\u0648\u0631 \u062f\u0627\u062f\u0647 \u0634\u0648\u062f"),r.a.createElement("li",null,"\u0646\u0645\u0627\u06cc\u0634 \u063a\u06cc\u0631 \u0639\u062f\u062f \u062f\u0631 \u0635\u0648\u0631\u062a\u06cc \u06a9\u0647 \u062f\u0627\u062f\u0647 \u0627\u0632 \u0628\u06cc\u0631\u0648\u0646 \u0628\u0647 \u0622\u0646 \u0648\u0627\u0631\u062f \u0634\u0648\u062f."),r.a.createElement("li",null,"\u0646\u0645\u0627\u06cc\u0634 \u06a9\u06cc\u0628\u0648\u0631\u062f \u0639\u062f\u062f\u06cc \u062f\u0631 \u0645\u0628\u0627\u06cc\u0644 (\u063a\u06cc\u0631 \u0627\u0632 \u0645\u0631\u0648\u0631\u06af\u0631 \u0633\u0627\u0645\u0633\u0648\u0646\u06af) ")),r.a.createElement(K,null))},null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.1f125194.chunk.js.map