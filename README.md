# React component for number input

A persian number input.

The component is compatible with react 16.
The component is controlled, so the component code is imperative. We need that to manipulate the input data entry behavior.


## Demo

Here you can experience a live [demo](https://karianpour.github.io/react-hichestan-numberinput/)

### Features
- Show farsi digits
- The value is latin digit (suitable for backend data storage)
- Number keypad on mobile devices (Samsung browser is not supported)
- Copy and paste by keyboard on Mac/Linux, it is not tested on Windows but it should work.
- Accept non digit value, it is not a bug, it is a feature, if the value sent from the back end has non digit data we have to show it to avid miss-understanding
- Forward any style (or any other attributes) given to the component to the inner input element.
- Forward the style and className changes after the first render to the inner input element.
- Showing tel keypad if type='tel'
- maxLength property to control maxumun acceptable number of digits
- typeScript friendly (type are not complete yet but it works)

## Installation

Use `npm i react-hichestan-numberinput` in order to install the module.

## Usage
see the example

## Material-ui

If you happened to use it with material-ui v3, this is the way I used it :
```
import TextField from '@material-ui/core/TextField';
import { NumberInput } from 'react-hichestan-numberinput';

    <TextField
      InputProps={{
        inputComponent: NumberInput,
        inputProps: {maxLength: 12},
      }}
```

### number formats
'FARSI' / 'LATIN'



### Contribution
Feel free to fork and add some feature. If you have time to do improvement on the U/I that will be appreciated.
If some one for any reason wants to sand the date and time format in any other format than ISO 8601, we need to inject a date and time formatter into the component.

To start, make a clone and run:
```bash
npm install
npm start
```
and browse [http://localhost:3000](http://localhost:3000)

For publishing
```bash
./build-examples.sh
npm run build
npm publish
```


### Acknowledgement
The project is bootstrapped by create-component-lib.

### License

<sub>MIT License</sub>  
<sub>Copyright (c) 2017 Kayvan Arianpour (<karianpour@gmail.com>)</sub>  
<sub>Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</sub>

<sub>The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.</sub>

<sub>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</sub>
